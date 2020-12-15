import {EnvironmentCredentials} from "aws-sdk";
import {DocumentClient} from "aws-sdk/clients/dynamodb";

export const dynamoDB = new DocumentClient({
    endpointDiscoveryEnabled: false,
    credentials: new EnvironmentCredentials('AWS'),
    endpoint: 'http://dynamodb.ca-central-1.amazonaws.com',
})

