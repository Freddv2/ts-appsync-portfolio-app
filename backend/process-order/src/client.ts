import {EnvironmentCredentials} from "aws-sdk";
import {DocumentClient} from "aws-sdk/clients/dynamodb";
import {AWSAppSyncClient} from "aws-appsync"
import 'isomorphic-fetch'
import "es6-promise/auto"

export const dynamoDB = new DocumentClient({
    endpointDiscoveryEnabled: false,
    credentials: new EnvironmentCredentials('AWS'),
    endpoint: 'http://dynamodb.ca-central-1.amazonaws.com',
})

export const appSync = new AWSAppSyncClient({
    url: 'https://gntkxpuor5dpdmrzemg6nfp424.appsync-api.ca-central-1.amazonaws.com/graphql',
    region: 'ca-central-1',
    auth: {
        type: 'API_KEY',
        apiKey: 'da2-m4rfks7yyjbxln7o2fnntgzyby'
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

