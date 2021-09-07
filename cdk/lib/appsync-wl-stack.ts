import {KeyCondition, MappingTemplate} from "@aws-cdk/aws-appsync";
import {StartingPosition} from "@aws-cdk/aws-lambda";
import {DynamoEventSource} from "@aws-cdk/aws-lambda-event-sources";
import * as cdk from '@aws-cdk/core';
import {AppSyncAPI} from "./appsync-api";
import {DynamoDB} from "./dynamodb";
import {Lambdas} from "./lambdas";

export class AppSyncWorkingLunchStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new AppSyncAPI(this, 'AppSyncAPI').api
    const db = new DynamoDB(this, 'DynamoDB')
    const lambdas = new Lambdas(this, 'Lambdas', {
      api: api
    })

    //Process Order is triggered when a transaction created. Actually, the stream output all modification to the table and we'll have to keep only the 'INSERT'
    lambdas.processOrder.addEventSource(new DynamoEventSource(db.transactionTable, {
      startingPosition: StartingPosition.TRIM_HORIZON,
      retryAttempts: 0 // Disable retry. Infinite by default..=/
    }))

    //Define Datasource Mapping/Resolver
    const portfolioDS = api.addDynamoDbDataSource('PortfolioTableDS', db.portfolioTable)
    const stockDS = api.addDynamoDbDataSource('StockTableDS', db.stockTable)
    const transactionDS = api.addDynamoDbDataSource('TransactionTableDS', db.transactionTable)
    const placeOrderDS = api.addLambdaDataSource('PlaceOrderDS', lambdas.placeOrder)
    const publishOrderExecutedDS = api.addNoneDataSource('PublishOrderExecutedDS') // No DS. This mutation we'll only be used to notify subscription
    const resetDS = api.addLambdaDataSource('ResetDS', lambdas.reset)

    //Retrieve a single portfolio by portfolio ID
    portfolioDS.createResolver({
      typeName: 'Query',
      fieldName: 'getPortfolio',
      requestMappingTemplate: MappingTemplate.dynamoDbQuery(KeyCondition.eq('id', 'id')),
      responseMappingTemplate: MappingTemplate.fromString(`
      #if( $ctx.result.items.isEmpty())
        {}
      #else
        $util.toJson($ctx.result.items.get(0))
      #end
      `)
    })

    //Field resolver on Portfolio.stocks
    //Retrieve a list of stocks by portfolio ID. Using $ctx.source.id to retrieve portfolio ID query param
    stockDS.createResolver({
      typeName: 'Portfolio',
      fieldName: 'stocks',
      requestMappingTemplate: MappingTemplate.fromString(`
      {"version" : "2017-02-28", "operation" : "Query", "query" : {
            "expression" : "#portfolioId = :id",
            "expressionNames" : {
                "#portfolioId" : "portfolioId"
            },
            "expressionValues" : {
                ":id" : $util.dynamodb.toDynamoDBJson($ctx.source.id)
            }
        }
      }
    `),
      responseMappingTemplate: MappingTemplate.dynamoDbResultList()
    })
    // Portfolio.transactions
    //Retrieve a list of transactions by portfolio ID. Using $ctx.source.id to retrieve portfolio ID query param
    transactionDS.createResolver({
      typeName: 'Portfolio',
      fieldName: 'transactions',
      requestMappingTemplate: MappingTemplate.fromString(`
      {"version" : "2017-02-28", "operation" : "Query", "query" : {
            "expression" : "#portfolioId = :id",
            "expressionNames" : {
                "#portfolioId" : "portfolioId"
            },
            "expressionValues" : {
                ":id" : $util.dynamodb.toDynamoDBJson($ctx.source.id)
            }
        }
      }
    `),
      responseMappingTemplate: MappingTemplate.dynamoDbResultList()
    })

    //Direct Lambda resolver
    placeOrderDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'placeOrder'
    })
    //Direct Lambda resolver
    resetDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'reset'
    })

    // Local resolver with a parameter to result passthrough
    publishOrderExecutedDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'publishOrderExecuted',
      requestMappingTemplate: MappingTemplate.fromString(`
      {
       "version": "2017-02-28", 
       "payload": $util.toJson($ctx.arguments.transaction)
       }`
      ),
      responseMappingTemplate: MappingTemplate.fromString(`$util.toJson($ctx.result)`)
    })

    //Process order lambda will do mutation to notify subscribers of order processed
    api.grantMutation(lambdas.processOrder)

    db.transactionTable.grantFullAccess(lambdas.placeOrder)
    db.transactionTable.grantFullAccess(lambdas.processOrder)
    db.stockTable.grantFullAccess(lambdas.processOrder)
    db.stockTable.grantFullAccess(lambdas.reset)
    db.transactionTable.grantFullAccess(lambdas.reset)

  }
}
