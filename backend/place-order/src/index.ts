import 'source-map-support/register'
import KSUID from "ksuid"
import {appSync, dynamoDB} from "./client"
import 'isomorphic-fetch'
import "es6-promise/auto"
import {AppSyncEvent, processOrderMut, Status, Transaction} from "./entity"
import gql from 'graphql-tag'

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

    const mutation = gql(processOrderMut)
    const appSyncHydrated = await appSync.hydrated();
    appSyncHydrated.mutate({
        mutation,
        variables: id.string,
    })

    return transaction
}
