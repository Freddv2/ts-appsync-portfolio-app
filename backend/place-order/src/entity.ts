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
    operation: Operation
    price: number
}

export interface Transaction {
    id: string
    stock: string
    shares: number
    operation: Operation
    askPrice: number
    finalPrice?: number
    totalValue?: number
    status: Status
}

export enum Operation {
    BUY, SELL
}

export enum Status {
    PENDING, COMPLETED
}

export const processOrderMut = /* GraphQL */ `
  mutation ProcessOrder($transactionId: String!) {
    processOrder(transactionId: $transactionId) {
      id
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
