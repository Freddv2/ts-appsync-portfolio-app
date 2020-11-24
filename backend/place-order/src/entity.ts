interface AppSyncEvent {
    info: {
        fieldName: string // graphql function name
    },
    arguments: {
        input: PlaceOrderInput // graphql function parameter
    }
}

interface PlaceOrderInput {
    portfolioId: string
    stock: string
    shares: number
    operation: Operation
    price: number
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
