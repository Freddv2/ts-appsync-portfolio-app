import {DocumentClient} from "aws-sdk/clients/dynamodb";
import {EnvironmentCredentials} from "aws-sdk";
import AWSAppSyncClient from "aws-appsync";
import 'isomorphic-fetch'
import "es6-promise/auto"

export const dynamoDB = new DocumentClient({
    endpointDiscoveryEnabled: false,
    credentials: new EnvironmentCredentials('AWS'),
    endpoint: 'http://dynamodb.ca-central-1.amazonaws.com',
})

export const appSync = new AWSAppSyncClient({
    url: 'https://by574664g5gk3p572s4laysjgm.appsync-api.ca-central-1.amazonaws.com/graphql',
    region: 'ca-central-1',
    auth: {
        type: 'API_KEY',
        apiKey: 'da2-l4mudizo5vbvnpmg4lk7ujnsea'
    },
    disableOffline: true,
}, {
    defaultOptions: {
        query: {
            fetchPolicy: 'network-only',
            errorPolicy: 'all',
        },
    }
})

