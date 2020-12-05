import {Operation, publishOrderExecutedMut, Status, Transaction} from "../src/entity";
import {appSync} from "../src/client";
import gql from "graphql-tag";

test('should invoke mutation', async () => {
    const transaction: Transaction = {
        action: Operation.BUY,
        totalValue: 100,
        stock: 'TSLA',
        portfolioId: '1',
        shares: 1,
        finalPrice: 2,
        askPrice: 1,
        date: '2020-12-05',
        status: Status.PENDING,
        transactionId: '1'
    }
    const res = await publishOrderExecuted(transaction);
    console.log(`${JSON.stringify(res)}`)
})

async function publishOrderExecuted(transaction: Transaction) {
    const appSyncClient = await appSync.hydrated();
    const mutation = gql(publishOrderExecutedMut)
    console.log(`${JSON.stringify(mutation)}`)
    try {
        const res = await appSyncClient.mutate({
            mutation,
            variables: {transaction}
        });
        console.log('Mutation completed successfully')
        return res
    } catch (e) {
        console.log(`An error occurred calling mutation ${JSON.stringify(e)}`)
    }
}
