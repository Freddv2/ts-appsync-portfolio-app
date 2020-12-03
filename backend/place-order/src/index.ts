import 'source-map-support/register'
import KSUID from "ksuid"
import {dynamoDB} from "./client"
import {AppSyncEvent, Status, Transaction} from "./entity"

export const handler = async (event: AppSyncEvent): Promise<Transaction> => {
    const order = event.arguments.input
    const id = await KSUID.random()
    const date = new Date().toISOString().replace('T', ' ').substr(0, 19)
    const transaction: Transaction = {
        portfolioId: order.portfolioId,
        transactionId: id.string,
        date: date,
        stock: order.stock,
        shares: order.shares,
        action: order.action,
        askPrice: order.price,
        status: Status.PENDING
    }
    await dynamoDB.put({TableName: 'TRANSACTION', Item: transaction}).promise()

    return transaction
}
