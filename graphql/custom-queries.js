export const getStocks = /* GraphQL */ `
  query GetPortfolio($id: ID!) {
    getPortfolio(id: $id) {
      id
      stocks {
        stock
        shares
        buyPrice
        buyCost
        marketPrice
        totalValue
      }
    }
  }
`;
export const getTransactions = /* GraphQL */ `
  query GetPortfolio($id: ID!) {
    getPortfolio(id: $id) {
      id
      transactions {
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
  }
`;
