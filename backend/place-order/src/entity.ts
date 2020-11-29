export interface AppSyncEvent {
    info: {
        fieldName: string // graphql function name
    },
    arguments: {
        input: PlaceOrderInput // graphql function parameter
    }
}

export interface PlaceOrderInput {
    stock: string
    shares: number
    operation: Operation
    price: number
}

export interface Transaction {
    id: string
    date: string
    stock: string
    shares: number
    operation: Operation
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

export const processOrder = /* GraphQL */ `
  mutation ProcessOrder($transactionId: String!) {
    processOrder(transactionId: $transactionId) {
      id
      date
      stock
      shares
      operation
      askPrice
      finalPrice
      totalValue
      status
    }
  }
`;
