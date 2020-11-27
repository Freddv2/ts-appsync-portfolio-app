import {Construct} from "@aws-cdk/core";
import {Code, Function, Runtime} from "@aws-cdk/aws-lambda"

export class Lambdas extends Construct {
    readonly placeOrder: Function
    readonly processOrder: Function

    constructor(scope: Construct, id: string) {
        super(scope, id)

        this.placeOrder = new Function(this, 'PlaceOrderLambda', {
            runtime: Runtime.NODEJS_12_X,
            handler: 'bundle.handler',
            code: Code.fromAsset('../backend/place-order/bundle')
        })
        // this.processOrder = new Function(this, 'ProcessOrderLambda', {
        //     runtime: Runtime.NODEJS_12_X,
        //     handler: 'bundle.handler',
        //     code: Code.fromAsset('../backend/place-order/bundle')
        // })
    }
}
