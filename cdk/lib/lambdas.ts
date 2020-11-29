import {Construct, Duration} from "@aws-cdk/core";
import {Code, Function, Runtime} from "@aws-cdk/aws-lambda"

export class Lambdas extends Construct {
    readonly placeOrder: Function
    readonly processOrder: Function
    readonly reset: Function
    constructor(scope: Construct, id: string) {
        super(scope, id)

        this.placeOrder = new Function(this, 'PlaceOrderLambda', {
            runtime: Runtime.NODEJS_12_X,
            handler: 'bundle.handler',
            memorySize: 1024,
            timeout: Duration.seconds(15),
            code: Code.fromAsset('../backend/place-order/bundle'),
            environment: {
                NODE_OPTIONS: '--enable-source-maps'
            }
        })
        // this.processOrder = new Function(this, 'ProcessOrderLambda', {
        //     runtime: Runtime.NODEJS_12_X,
        //     handler: 'bundle.handler',
        //     code: Code.fromAsset('../backend/place-order/bundle')
        // })

        this.reset = new Function(this, 'ResetLambda', {
            runtime: Runtime.NODEJS_12_X,
            handler: 'bundle.handler',
            memorySize: 1024,
            timeout: Duration.seconds(15),
            code: Code.fromAsset('../backend/reset/bundle'),
            environment: {
                NODE_OPTIONS: '--enable-source-maps'
            }
        })
    }
}
