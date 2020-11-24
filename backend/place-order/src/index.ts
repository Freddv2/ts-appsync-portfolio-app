import {DocumentClient} from "aws-sdk/clients/dynamodb";
import {EnvironmentCredentials} from "aws-sdk";
import KSUID from "ksuid";

const ddb = new DocumentClient({
    endpointDiscoveryEnabled: false,
    credentials: new EnvironmentCredentials('AWS'),
    endpoint: 'http://dynamodb.ca-central-1.amazonaws.com',
})

export const handler = async (event: AppSyncEvent): Promise<Transaction> => {
    const order = event.arguments.input
    const id = await KSUID.random()
    const transaction: Transaction = {
        id: id.string,
        stock: order.stock,
        shares: order.shares,
        operation: order.operation,
        askPrice: order.price,
        status: Status.PENDING
    }
    await ddb.put({TableName: 'TRANSACTION', Item: transaction}).promise()

    return transaction
}
