import {EnvironmentCredentials} from "aws-sdk";
import {DocumentClient} from "aws-sdk/clients/dynamodb";

export const dynamoDB = new DocumentClient({
    endpointDiscoveryEnabled: false,
    credentials: new EnvironmentCredentials('AWS'),
    endpoint: 'http://dynamodb.ca-central-1.amazonaws.com',
})

/**
 * These configs comes from the cdk appsync deployment output
 *
 */
export const appSyncConfig = {
    url: 'https://rsa3clwtlrdxffxakhodogmfr4.appsync-api.ca-central-1.amazonaws.com/graphql',
    apiKey: 'da2-dr3ho4p63jecbihvfpvpuc5m5i'
}
