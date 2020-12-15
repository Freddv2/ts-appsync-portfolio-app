export interface AppSyncEvent {
    info: {
        fieldName: string // graphql function name
    },
    arguments: {
        input: PlaceOrderInput // graphql function parameter
    }
}

//TODO a better way to always stay in sync & reduce code duplication, would be to use GraphQL Typescript Codegen to generate entities. I did not have the time to expirement with that
export interface PlaceOrderInput {
    portfolioId: string
    stock: string
    shares: number
    action: Operation
    price: number
}

export interface Transaction {
    portfolioId: string
    id: string
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
