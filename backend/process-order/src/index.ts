import {dynamoDB} from "./client";

export const handler = async (event: AppSyncEvent): Promise<Transaction> => {
    const result = await dynamoDB.get({
        TableName: 'TRANSACTION',
        Key: {'transactionId': {S: event.arguments.transactionId}}
    }).promise()
    return result.Item as Transaction
}
