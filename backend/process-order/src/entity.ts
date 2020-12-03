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
    transactionId: string
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

export const publishOrderExecutedMut = /* GraphQL */ `
  mutation PublishOrderExecuted($transaction: TransactionCompletedInput!) {
    publishOrderExecuted(transaction: $transaction) {
      portfolioId
      transactionId
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
