/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStocks = /* GraphQL */ `
  query GetStocks {
    getStocks {
      portfolioId
      stock
      shares
      buyPrice
      buyCost
      marketPrice
      totalValue
    }
  }
`;
export const getTransactions = /* GraphQL */ `
  query GetTransactions {
    getTransactions {
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
