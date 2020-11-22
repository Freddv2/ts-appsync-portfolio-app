import * as cdk from '@aws-cdk/core';
import {AppSyncAPI} from "./appsync-api";
import {DynamoDB} from "./dynamodb";
import {MappingTemplate} from "@aws-cdk/aws-appsync";

export class AppSyncWorkingLunchStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new AppSyncAPI(this, 'AppSyncAPI').api
    const db = new DynamoDB(this, 'DynamoDB')

    const portfolioDS = api.addDynamoDbDataSource('portfolioTableDS', db.portfolioTable)
    const transactionDS = api.addDynamoDbDataSource('transactionTableDS', db.transactionTable)

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
  }
}
