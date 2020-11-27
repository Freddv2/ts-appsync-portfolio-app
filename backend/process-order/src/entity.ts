interface AppSyncEvent {
    info: {
        fieldName: string // graphql function name
    },
    arguments: {
        transactionId: string // graphql function parameter
    }
}

interface Transaction {
    id: string
    stock: string
    shares: number
    operation: Operation
    askPrice: number
    finalPrice?: number
    totalValue?: number
    status: Status
}

enum Operation {
    BUY, SELL
}

enum Status {
    PENDING, COMPLETED
}
