<template>
  <v-card>
    <v-card-title>
      Portfolio
    </v-card-title>
    <v-card-text>
      <v-simple-table>
        <template #default>
          <thead>
            <tr>
              <th class="text-left">
                Stock
              </th>
              <th class="text-left">
                Shares
              </th>
              <th class="text-left">
                Buy Price
              </th>
              <th class="text-left">
                Market Price
              </th>
              <th class="text-left">
                Cost
              </th>
              <th class="text-left">
                Total Value
              </th>
              <th class="text-left">
                Gain
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in stocks"
              :key="item.stock"
            >
              <td>{{ item.stock }}</td>
              <td>{{ item.shares }}</td>
              <td>{{ item.buyPrice }}</td>
              <td>{{ item.marketPrice }}</td>
              <td>{{ item.buyCost }}</td>
              <td>{{ item.totalValue }}</td>
              <td>{{ (item.totalValue - item.buyCost) / item.buyCost * 100 + '%' }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
    <v-card-actions>
      <v-col class="text-right">
        <v-btn
          :disabled="loading"
          :loading="loading"
          color="secondary"
          @click="reset"
        >
          Reset
        </v-btn>
      </v-col>
    </v-card-actions>
  </v-card>
</template>

<script>
import { API } from '@aws-amplify/api'
import * as queries from '../../../graphql/queries'
import * as mutations from '../../../graphql/mutations'
import { graphqlOperation } from '@aws-amplify/api-graphql'
import * as subscriptions from '../../../graphql/subscriptions'

export default {
  name: 'Portfolio',
  data () {
    return {
      stocks: [],
      loader: null,
      loading: false
    }
  },
  created () {
    this.subscribeToOrderExecuted()
  },
  async mounted () {
    const res = await API.graphql({
      query: queries.getPortfolio,
      variables: {
        id: '1'
      }
    })
    this.stocks = res.data.getPortfolio.stocks
  },
  methods: {
    async reset () {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      await API.graphql({
        query: mutations.reset,
        variables: {
          table: 'STOCK'
        }
      })
      this.stocks = []
      this.loader = null
      this.loading = false
    },
    subscribeToOrderExecuted () {
      API.graphql(graphqlOperation(subscriptions.onOrderExecuted))
        .subscribe({
          next: (event) => {
            console.log(event)
            const completedTransaction = event?.value?.data?.onOrderExecuted
            if (completedTransaction) {
              let stock = this.stocks.find(s => s.stock === completedTransaction.stock)
              if (completedTransaction.action === 'BUY') {
                this.processBoughtStock(stock, completedTransaction)
              } else {
                this.processSoldStock(stock, completedTransaction)
              }
            } else {
              console.error(`Event result is undefined`)
            }
          }
        })
    },
    processBoughtStock (stock, completedTransaction) {
      if (stock) {
        stock.shares += completedTransaction.shares
        stock.buyPrice = (stock.buyPrice + completedTransaction.finalPrice) / 2
        stock.marketPrice = (stock.marketPrice + completedTransaction.finalPrice) / 2
        stock.totalValue += completedTransaction.totalValue
      } else {
        this.stocks.push({
          portfolioId: '1',
          stock: completedTransaction.stock,
          shares: completedTransaction.shares,
          buyPrice: completedTransaction.finalPrice,
          buyCost: completedTransaction.totalValue,
          marketPrice: completedTransaction.finalPrice,
          totalValue: completedTransaction.totalValue,
        })
      }
    },
    processSoldStock (stock, completedTransaction) {
      if (stock.shares === completedTransaction.shares) {
        this.stocks = this.stocks.filter(el => el.stock !== stock.stock)
      } else {
        stock.shares -= completedTransaction.shares
        stock.totalValue -= completedTransaction.totalValue
        stock.buyCost -= completedTransaction.totalValue
      }
    }
  }
}
</script>
