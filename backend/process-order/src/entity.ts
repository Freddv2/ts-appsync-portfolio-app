//TODO Generate entities from the graphql schema :)
export interface Stock {
    portfolioId: string
    stock: string
    shares: number
    buyPrice: number
    buyCost: number
    marketPrice: number
    totalValue: number
}

export interface Transaction {
    portfolioId: string
    id: string
    date: string
    stock: string
    shares: number
    action: Operation
    askPrice: number
    finalPrice: number
    totalValue: number
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

//Taken from amplify code gen (graphql/mutation.js)
export const publishOrderExecutedMut = /* GraphQL */ `
  mutation PublishOrderExecuted($transaction: TransactionCompletedInput!) {
    publishOrderExecuted(transaction: $transaction) {
      id
      date
      stock
      shares
      action
      askPrice
      finalPrice
      totalValue
      status
    }
  }
`
