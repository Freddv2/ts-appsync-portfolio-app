import {DocumentClient} from "aws-sdk/clients/dynamodb";
import {EnvironmentCredentials} from "aws-sdk";
import AWSAppSyncClient from "aws-appsync";

export const dynamoDB = new DocumentClient({
    endpointDiscoveryEnabled: false,
    credentials: new EnvironmentCredentials('AWS'),
    endpoint: 'http://dynamodb.ca-central-1.amazonaws.com',
})

export const graphQL = new AWSAppSyncClient({
    url: 'APPSYNC_ENDPOINT_URL',
    region: 'ca-central-1',
    auth: {
        type: 'API_KEY',
        apiKey: 'da2-aofzxtxmmfe7phrvh4xccv5hs4'
    },
    disableOffline: true
})

