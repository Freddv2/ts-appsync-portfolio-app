import {DynamoDB, EnvironmentCredentials} from "aws-sdk";

export const dynamoDB = new DynamoDB({
    endpointDiscoveryEnabled: false,
    credentials: new EnvironmentCredentials('AWS'),
    endpoint: 'http://dynamodb.ca-central-1.amazonaws.com'
})
