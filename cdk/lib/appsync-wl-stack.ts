import * as cdk from '@aws-cdk/core';
import {AppSyncAPI} from "./appsync-api";
import {DynamoDB} from "./dynamodb";
import {MappingTemplate} from "@aws-cdk/aws-appsync";
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
      startingPosition: StartingPosition.TRIM_HORIZON
    }))

    const stockDS = api.addDynamoDbDataSource('PortfolioTableDS', db.stockTable)
    const transactionDS = api.addDynamoDbDataSource('TransactionTableDS', db.transactionTable)
    const placeOrderDS = api.addLambdaDataSource('PlaceOrderDS', lambdas.placeOrder)
    const publishOrderExecutedDS = api.addNoneDataSource('PublishOrderExecutedDS') // No DS. This mutation we'll only be used to notify subscription
    const resetDS = api.addLambdaDataSource('ResetDS', lambdas.reset)

    stockDS.createResolver({
      typeName: 'Query',
      fieldName: 'getStocks',
      requestMappingTemplate: MappingTemplate.dynamoDbScanTable(),
      responseMappingTemplate: MappingTemplate.dynamoDbResultList()
    })

    transactionDS.createResolver({
      typeName: 'Query',
      fieldName: 'getTransactions',
      requestMappingTemplate: MappingTemplate.dynamoDbScanTable(),
      responseMappingTemplate: MappingTemplate.dynamoDbResultList()
    })

    placeOrderDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'placeOrder'
    })
    publishOrderExecutedDS.createResolver({
      typeName: 'Mutation',
      fieldName: 'publishOrderExecuted',
      requestMappingTemplate: MappingTemplate.lambdaRequest(),
      responseMappingTemplate: MappingTemplate.lambdaResult()
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
