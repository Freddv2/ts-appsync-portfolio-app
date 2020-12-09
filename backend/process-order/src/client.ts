import {EnvironmentCredentials} from "aws-sdk";
import {DocumentClient} from "aws-sdk/clients/dynamodb";
import 'isomorphic-fetch'
import "es6-promise/auto"

export const dynamoDB = new DocumentClient({
    endpointDiscoveryEnabled: false,
    credentials: new EnvironmentCredentials('AWS'),
    endpoint: 'http://dynamodb.ca-central-1.amazonaws.com',
})

export const appSyncConfig = {
    url: 'https://khaoqjzbujftdeifvfepjmgocm.appsync-api.ca-central-1.amazonaws.com/graphql',
    apiKey: 'da2-3gzwv4kkl5dhzbjjv52lbjnzvq'
}
