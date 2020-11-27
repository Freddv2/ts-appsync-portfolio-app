import {DocumentClient} from "aws-sdk/clients/dynamodb";
import {EnvironmentCredentials} from "aws-sdk";
import AWSAppSyncClient from "aws-appsync";

export const dynamoDB = new DocumentClient({
    endpointDiscoveryEnabled: false,
    credentials: new EnvironmentCredentials('AWS'),
    endpoint: 'http://dynamodb.ca-central-1.amazonaws.com',
})

export const graphQL = new AWSAppSyncClient({
    url: 'https://s6hn6j7lzjcwzdrsdpyhgds4au.appsync-api.ca-central-1.amazonaws.com/graphql',
    region: 'ca-central-1',
    auth: {
        type: 'API_KEY',
        apiKey: ' da2-uyrt4p3f6facja7j5sgjypm2ja'
    },
    disableOffline: true
})

