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
    url: 'https://gntkxpuor5dpdmrzemg6nfp424.appsync-api.ca-central-1.amazonaws.com/graphql',
    apiKey: 'da2-m4rfks7yyjbxln7o2fnntgzyby'
}
