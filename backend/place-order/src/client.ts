import {DocumentClient} from "aws-sdk/clients/dynamodb";
import {EnvironmentCredentials} from "aws-sdk";

export const dynamoDB = new DocumentClient({
    endpointDiscoveryEnabled: false,
    credentials: new EnvironmentCredentials('AWS'),
    endpoint: 'http://dynamodb.ca-central-1.amazonaws.com',
})

/*export const graphQL = new AWSAppSyncClient({
    url: 'https://by574664g5gk3p572s4laysjgm.appsync-api.ca-central-1.amazonaws.com/graphql',
    region: 'ca-central-1',
    auth: {
        type: 'API_KEY',
        apiKey: 'da2-l4mudizo5vbvnpmg4lk7ujnsea'
    },
    disableOffline: true
)*/

