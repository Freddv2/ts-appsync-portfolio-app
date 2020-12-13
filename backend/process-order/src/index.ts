import 'source-map-support/register'
import {publishOrderExecutedMut, Status, Stock, Transaction} from './entity'
import {appSyncConfig, dynamoDB} from "./client"
import {DynamoDBStreamEvent} from "aws-lambda"
import {Converter} from "aws-sdk/clients/dynamodb"
import gql from 'graphql-tag'
import axios from "axios"
import {print} from "graphql"

export const handler = async (event: DynamoDBStreamEvent): Promise<void> => {
    console.log(`${JSON.stringify(event)}`)
    for (const record of event.Records) {
        if (record.eventName === 'INSERT') {
            const item = record.dynamodb?.NewImage
            if (item) {
                const transaction = Converter.unmarshall(item) as Transaction;
                await sleepRandomly()
                const completedTransaction = await processOrder(transaction)
                await publishOrderExecuted(completedTransaction)
            }
        }
    }
}

function sleepRandomly() {
    const sleepTime = Math.floor(Math.random() * 3000) + 2000 // Sleep for 2 sec + 0 to 3 seconds
    return new Promise(resolve => setTimeout(resolve, sleepTime))
}

async function processOrder(transaction: Transaction) {
    const completedTransaction = await completeTransaction(transaction);
    await updatePortfolio(completedTransaction)
    return completedTransaction
}

async function completeTransaction(transaction: Transaction) {
    const randomPriceAdjustment = calculateBetween0to10PercentOfAskPrice(transaction.askPrice)
    transaction.finalPrice = transaction.action === 'BUY' ? transaction.askPrice - randomPriceAdjustment : transaction.askPrice + randomPriceAdjustment
    transaction.totalValue = transaction.finalPrice * transaction.shares
    transaction.status = Status.COMPLETED

    await dynamoDB.put({TableName: 'TRANSACTION', Item: transaction}).promise()

    return transaction
}

async function updatePortfolio(transaction: Transaction) {
    if (transaction.action === 'BUY') {
        await addToPortfolio(transaction)
    } else {
        await removeFromPortfolio(transaction)
    }
}

async function addToPortfolio(transaction: Transaction) {
    let stock = await findStock(transaction.portfolioId, transaction.stock)
    if (stock) {
        stock.shares += transaction.shares
        stock.buyPrice = Math.round((stock.buyPrice + transaction.finalPrice) / 2)
        stock.marketPrice = Math.round((stock.marketPrice + transaction.finalPrice) / 2)
        stock.totalValue += transaction.totalValue
    } else {
        stock = {
            portfolioId: transaction.portfolioId,
            stock: transaction.stock,
            shares: transaction.shares,
            buyPrice: transaction.finalPrice,
            buyCost: transaction.totalValue,
            marketPrice: transaction.finalPrice,
            totalValue: transaction.totalValue
        }
    }
    await dynamoDB.put({TableName: 'STOCK', Item: stock}).promise()
}

async function removeFromPortfolio(transaction: Transaction) {
    const stock = await findStock(transaction.portfolioId, transaction.stock)
    if (stock) {
        if (stock.shares === transaction.shares) {
            await dynamoDB.delete({
                TableName: 'STOCK',
                Key: {
                    'portfolioId': stock.portfolioId,
                    'stock': stock.stock
                }
            }).promise()
        } else {
            stock.shares -= transaction.shares
            stock.totalValue -= transaction.totalValue
            stock.buyCost -= transaction.totalValue
            await dynamoDB.put({
                TableName: 'STOCK',
                Item: stock
            }).promise()
        }
    }
}

async function findStock(portfolioId: string, stock: string) {
    const res = await dynamoDB.get({
        TableName: 'STOCK',
        Key: {
            'portfolioId': portfolioId,
            'stock': stock
        }
    }).promise()
    return res.Item as Stock | undefined
}

function calculateBetween0to10PercentOfAskPrice(askPrice: number) {
    const tenPercent = askPrice * 0.1
    return Math.floor(Math.random() * tenPercent)
}

export async function publishOrderExecuted(transaction: Transaction): Promise<void> {
    try {
        await axios.post(appSyncConfig.url, {
            query: print(gql(publishOrderExecutedMut)),
            variables: {transaction},
        }, {
            headers: {
                'x-api-key': appSyncConfig.apiKey
            }
        });
        console.info(`The order publish was successful. Transaction ${JSON.stringify(transaction)}`)
    } catch (e) {
        console.error(`An error occurred calling mutation ${JSON.stringify(e)}`)
    }
}
