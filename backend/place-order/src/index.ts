import KSUID from "ksuid"
import {dynamoDB, graphQL} from "./client"
import gql from 'graphql-tag'
import 'cross-fetch/polyfill' //Required by the appsync client to emulate browser functionality
import * as mutations from '../../../graphql/mutations'

export const handler = async (event: AppSyncEvent): Promise<Transaction> => {
    const order = event.arguments.input
    const transactionId = await KSUID.random()
    const transaction: Transaction = {
        id: transactionId.string,
        stock: order.stock,
        shares: order.shares,
        operation: order.operation,
        askPrice: order.price,
        status: Status.PENDING
    }
    await dynamoDB.put({TableName: 'TRANSACTION', Item: transaction}).promise()

    const mutation = gql(mutations.processOrder)

    graphQL.mutate({
        mutation,
        variables: transactionId.string,
        fetchPolicy: "network-only"
    })

    return transaction
}
