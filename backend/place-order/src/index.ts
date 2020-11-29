import 'source-map-support/register'
import KSUID from "ksuid"
import {dynamoDB} from "./client"
import 'cross-fetch/polyfill' //Required by the appsync client to emulate browser functionality
import {AppSyncEvent, Status, Transaction} from "./entity"


export const handler = async (event: AppSyncEvent): Promise<Transaction> => {
    const order = event.arguments.input
    const id = await KSUID.random()
    const date = new Date().toISOString().replace('T', ' ').substr(0, 19)
    const transaction: Transaction = {
        id: id.string,
        date: date,
        stock: order.stock,
        shares: order.shares,
        operation: order.operation,
        askPrice: order.price,
        status: Status.PENDING
    }
    await dynamoDB.put({TableName: 'TRANSACTION', Item: transaction}).promise()

    // const mutation = gql(processOrderMut)
    //
    // graphQL.mutate({
    //     mutation,
    //     variables: transactionId.string,
    //     fetchPolicy: "network-only"
    // })

    return transaction
}
