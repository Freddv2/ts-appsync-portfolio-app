import {GraphqlApi} from "@aws-cdk/aws-appsync";
import {Code, Function, Runtime} from "@aws-cdk/aws-lambda"
import {Construct, Duration} from "@aws-cdk/core";

export interface LambdasProps {
    readonly api: GraphqlApi
}

export class Lambdas extends Construct {
    readonly placeOrder: Function
    readonly processOrder: Function
    readonly reset: Function

    constructor(scope: Construct, id: string, props: LambdasProps) {
        super(scope, id)

        this.placeOrder = new Function(this, 'PlaceOrderLambda', {
            runtime: Runtime.NODEJS_12_X,
            handler: 'bundle.handler',
            memorySize: 1024,
            timeout: Duration.seconds(10),
            code: Code.fromAsset('../backend/place-order/bundle'),
            environment: {
                NODE_OPTIONS: '--enable-source-maps'
            }
        })
        this.processOrder = new Function(this, 'ProcessOrderLambda', {
            runtime: Runtime.NODEJS_12_X,
            handler: 'bundle.handler',
            memorySize: 1024,
            timeout: Duration.seconds(10),
            code: Code.fromAsset('../backend/process-order/bundle'),
            environment: {
                NODE_OPTIONS: '--enable-source-maps',
                APPSYNC_URL: props.api.graphqlUrl,
                APPSYNC_KEY: props.api.apiKey ? props.api.apiKey : ''
            }
        })

        this.reset = new Function(this, 'ResetLambda', {
            runtime: Runtime.NODEJS_12_X,
            handler: 'bundle.handler',
            memorySize: 1024,
            timeout: Duration.seconds(10),
            code: Code.fromAsset('../backend/reset/bundle'),
            environment: {
                NODE_OPTIONS: '--enable-source-maps'
            }
        })
    }
}
