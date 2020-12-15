import KSUID from "ksuid"
import 'source-map-support/register'
import {dynamoDB} from "./client"
import {AppSyncEvent, Status, Transaction} from "./entity"

export const handler = async (event: AppSyncEvent): Promise<Transaction> => {
    const order = event.arguments.input
    const id = await KSUID.random() // KSUID is a time sortable uuid. This allow the transactions to have a unique ID and to be sorted by creation date
    const date = new Date().toISOString().replace('T', ' ').substr(0, 19) // Get the current time & remove the timezone section
    const transaction: Transaction = {
        portfolioId: order.portfolioId,
        id: id.string,
        date: date,
        stock: order.stock,
        shares: order.shares,
        action: order.action,
        askPrice: order.price,
        status: Status.PENDING
    }

    //Create a new transaction in PENDING status. The transaction will be picked up by the process-order lambda via a DynamoDB Stream
    await dynamoDB.put({TableName: 'TRANSACTION', Item: transaction}).promise()

    return transaction
}
