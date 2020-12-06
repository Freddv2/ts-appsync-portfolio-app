import {Operation, Status, Transaction} from "../src/entity";
import {publishOrderExecuted} from "../src/index";

test('should invoke mutation', () => {
    const transaction: Transaction = {
        date: "2020-12-05",
        action: Operation.BUY,
        totalValue: 100,
        stock: 'TSLA',
        portfolioId: '1',
        shares: 1,
        finalPrice: 2,
        askPrice: 1,
        status: Status.COMPLETED,
        transactionId: "1",
    }
    publishOrderExecuted(transaction)
})
