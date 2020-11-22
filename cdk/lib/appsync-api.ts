import {AuthorizationType, GraphqlApi, Schema} from '@aws-cdk/aws-appsync'
import {CfnOutput, Construct} from "@aws-cdk/core";

export class AppSyncAPI extends Construct {

    readonly api: GraphqlApi

    constructor(scope: Construct, id: string) {
        super(scope, id)

        // Creates the AppSync API
        this.api = new GraphqlApi(this, 'GraphQLAPI', {
            name: 'appsync-api',
            schema: Schema.fromAsset('../app/schema.graphql'),
            authorizationConfig: {
                defaultAuthorization: {
                    authorizationType: AuthorizationType.API_KEY,
                },
            },
            xrayEnabled: true,
        });

        // Prints out the AppSync GraphQL endpoint to the terminal
        new CfnOutput(this, "GraphQLAPIURL", {
            value: this.api.graphqlUrl
        });

        // Prints out the AppSync GraphQL API key to the terminal
        new CfnOutput(this, "GraphQLAPIKey", {
            value: this.api.apiKey || ''
        });
    }
}