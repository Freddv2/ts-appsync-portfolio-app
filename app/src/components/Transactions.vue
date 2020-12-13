<template>
  <v-card>
    <v-card-title>
      Transactions
    </v-card-title>
    <v-card-text>
      <v-simple-table>
        <template #default>
          <thead>
            <tr>
              <th class="text-left">
                Date
              </th>
              <th class="text-left">
                Stock
              </th>
              <th class="text-left">
                Operation
              </th>
              <th class="text-left">
                Shares
              </th>
              <th class="text-left">
                Ask Price
              </th>
              <th class="text-left">
                Final Price
              </th>
              <th class="text-left">
                Total Value
              </th>
              <th class="text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item,index) in transactions"
              :key="item.transaction"
            >
              <td>{{ item.date }}</td>
              <td>
                <v-chip
                  color="grey"
                  small
                  text-color="white"
                >
                  {{ item.stock }}
                </v-chip>
              </td>
              <td>
                <v-chip
                  color="blue"
                  small
                  text-color="white"
                >
                  {{ item.action }}
                </v-chip>
              </td>
              <td>{{ item.shares }}</td>
              <td>{{ item.askPrice }}</td>
              <td>{{ item.finalPrice }}</td>
              <td>{{ item.totalValue }}</td>
              <td>
                <v-chip
                  :color="statusColor[index]"
                  small
                  text-color="white"
                >
                  {{ item.status }}
                </v-chip>
              </td>
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
import * as queries from '../../../graphql/custom-queries'
import * as mutations from '../../../graphql/mutations'
import * as subscriptions from '../../../graphql/subscriptions'
import { graphqlOperation } from '@aws-amplify/api-graphql'

export default {
  name: 'Transactions',
  data () {
    return {
      transactions: [],
      loader: null,
      loading: false
    }
  },
  computed: {
    statusColor () {
      return this.transactions.map(t => {
        return t.status === 'COMPLETED' ? 'green' : 'orange'
      })
    }
  },
  async created () {
    this.subscribeToOrderExecuted()
    const res = await API.graphql({
      query: queries.getTransactions,
      variables: {
        id: '1'
      }
    })
    this.transactions = res.data.getPortfolio.transactions
    //Listener on Place Order
    this.$root.$on('new-transaction', (transaction) => {
      console.log(transaction)
      this.transactions.push(transaction)
    })
  },
  methods: {
    async reset () {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]
      await API.graphql({
        query: mutations.reset,
        variables: {
          table: 'TRANSACTION'
        }
      })
      this.transactions = []
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
              const transaction = this.transactions.find(t => t.id === completedTransaction.id)
              transaction.status = completedTransaction.status
              transaction.finalPrice = completedTransaction.finalPrice
              transaction.totalValue = completedTransaction.totalValue
            } else {
              console.error(`Event result is undefined`)
            }
          }
        })
    }
  }
}
</script>
