import * as cdk from '@aws-cdk/core';
import {AppSyncAPI} from "./appsync-api";
import {DynamoDB} from "./dynamodb";
import {MappingTemplate} from "@aws-cdk/aws-appsync";
import {Lambdas} from "./lambdas";

export class AppSyncWorkingLunchStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new AppSyncAPI(this, 'AppSyncAPI').api
    const db = new DynamoDB(this, 'DynamoDB')
    const lambdas = new Lambdas(this, 'Lambdas')

    const portfolioDS = api.addDynamoDbDataSource('PortfolioTableDS', db.portfolioTable)
    const transactionDS = api.addDynamoDbDataSource('TransactionTableDS', db.transactionTable)
    const placeOrderDS = api.addLambdaDataSource('PlaceOrderDS', lambdas.placeOrder)
    //const processOrderDS = api.addLambdaDataSource('PlaceOrderDS', lambdas.processOrder)

    portfolioDS.createResolver({
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
    // processOrderDS.createResolver({
    //   typeName: 'Mutation',
    //   fieldName: 'processOrder'
    // })
  }
}
