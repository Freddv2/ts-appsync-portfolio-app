export interface AppSyncEvent {
    info: {
        fieldName: string // graphql function name
    },
    arguments: {
        input: PlaceOrderInput // graphql function parameter
    }
}

export interface PlaceOrderInput {
    portfolioId: string
    stock: string
    shares: number
    action: Operation
    price: number
}

export interface Transaction {
    portfolioId: string
    transactionId: string
    date: string
    stock: string
    shares: number
    action: Operation
    askPrice: number
    status: Status
}

export enum Operation {
    BUY = "BUY",
    SELL = "SELL"
}

export enum Status {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED"
}
