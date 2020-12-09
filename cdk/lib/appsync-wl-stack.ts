import * as cdk from '@aws-cdk/core';
import {AppSyncAPI} from "./appsync-api";
import {DynamoDB} from "./dynamodb";
import {KeyCondition, MappingTemplate} from "@aws-cdk/aws-appsync";
import {Lambdas} from "./lambdas";
import {DynamoEventSource} from "@aws-cdk/aws-lambda-event-sources";
import {StartingPosition} from "@aws-cdk/aws-lambda";

export class AppSyncWorkingLunchStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new AppSyncAPI(this, 'AppSyncAPI').api
    const db = new DynamoDB(this, 'DynamoDB')
    const lambdas = new Lambdas(this, 'Lambdas')

    //Process Order is triggered when a transaction created. Actually, the stream output all modification to the table and we'll have to keep only the 'INSERT'
    lambdas.processOrder.addEventSource(new DynamoEventSource(db.transactionTable, {
      startingPosition: StartingPosition.TRIM_HORIZON,
      retryAttempts: 0 // Disable retry. Infinite by default..=/
    }))

    const portfolioDS = api.addDynamoDbDataSource('PortfolioTableDS', db.portfolioTable)
    const stockDS = api.addDynamoDbDataSource('StockTableDS', db.stockTable)
    const transactionDS = api.addDynamoDbDataSource('TransactionTableDS', db.transactionTable)
    const placeOrderDS = api.addLambdaDataSource('PlaceOrderDS', lambdas.placeOrder)
    const publishOrderExecutedDS = api.addNoneDataSource('PublishOrderExecutedDS') // No DS. This mutation we'll only be used to notify subscription
    const resetDS = api.addLambdaDataSource('ResetDS', lambdas.reset)

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

    placeOrderDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'placeOrder'
    })

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

    resetDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'reset'
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
