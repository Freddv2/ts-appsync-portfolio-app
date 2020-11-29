import 'source-map-support/register'
import {dynamoDB} from "./client"
import {AppSyncEvent, Table} from './entity'


export const handler = async (event: AppSyncEvent): Promise<Boolean> => {
    const table = event.arguments.input
    if (table === 'TRANSACTION') {
        await deleteTable(table)
        await createTransactionTable()
    } else if (table === 'PORTFOLIO') {
        await deleteTable(table)
        await createPortfolioTable()
    }
    return true
}

async function createTransactionTable() {
    return dynamoDB.createTable({
        TableName: 'TRANSACTION',
        KeySchema: [
            {'AttributeName': 'id', KeyType: 'HASH'},
            {'AttributeName': 'date', KeyType: 'RANGE'},
        ],
        AttributeDefinitions: [
            {'AttributeName': 'id', AttributeType: 'S'},
            {'AttributeName': 'date', AttributeType: 'S'},
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        }
    }).promise()
}

async function createPortfolioTable() {
    return dynamoDB.createTable({
        TableName: 'TRANSACTION',
        KeySchema: [
            {'AttributeName': 'portfolioId', KeyType: 'HASH'},
            {'AttributeName': 'stock', KeyType: 'RANGE'},
        ],
        AttributeDefinitions: [
            {'AttributeName': 'portfolioId', AttributeType: 'S'},
            {'AttributeName': 'stock', AttributeType: 'S'},
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        }
    }).promise()
}

async function deleteTable(table: Table) {
    return dynamoDB.deleteTable({
        TableName: table
    }).promise()
}
