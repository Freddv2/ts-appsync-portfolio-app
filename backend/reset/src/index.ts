import 'source-map-support/register'
import {dynamoDB} from "./client"
import {AppSyncEvent, Table} from './entity'


export const handler = async (event: AppSyncEvent): Promise<boolean> => {
    const table = event.arguments.table
    if (table === 'TRANSACTION') {
        await truncateTable(table, 'portfolioId', 'id')
    } else if (table === 'STOCK') {
        await truncateTable(table, 'portfolioId', 'stock')
    } else {
        console.error(`Bad table name : ${table}`)
    }
    return true
}

/**
 * Delete all items in a table. Not deleting & recreating the table because
 * it breaks the permission defined in cdk
 * @param table
 * @param pkName
 * @param skName
 */
async function truncateTable(table: Table, pkName: string, skName: string) {
    const res = await dynamoDB.scan({
        TableName: table,
        AttributesToGet: [pkName, skName]
    }).promise();
    const deleteRequestsProm = res.Items?.map(async key => {
        await dynamoDB.delete({
            TableName: table,
            Key: {
                [pkName]: key[pkName], // The square brace allow to use a variable as the key name
                [skName]: key[skName],
            }
        }).promise();
    });
    //If there was at least 1 item in the table, we wait for the promises to resolve
    if (deleteRequestsProm)
        await Promise.all(deleteRequestsProm)
}

