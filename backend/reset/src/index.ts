import 'source-map-support/register'
import {dynamoDB} from "./client"
import {AppSyncEvent, Table} from './entity'


export const handler = async (event: AppSyncEvent): Promise<boolean> => {
    const table = event.arguments.table
    if (table === 'TRANSACTION') {
        await truncateTable(table, 'portfolioId', 'transactionId')
    } else if (table === 'STOCK') {
        await truncateTable(table, 'portfolioId', 'stock')
    } else {
        console.error(`Bad table name : ${table}`)
    }
    return true
}

async function truncateTable(table: Table, pkName: string, skName: string) {
    const res = await dynamoDB.scan({
        TableName: table,
        AttributesToGet: [pkName, skName]
    }).promise();
    const deleteRequestsProm = res.Items?.map(async key => {
        await dynamoDB.delete({
            TableName: table,
            Key: {
                [pkName]: key[pkName],
                [skName]: key[skName],
            }
        }).promise();
    });
    if (deleteRequestsProm)
        await Promise.all(deleteRequestsProm)
}

