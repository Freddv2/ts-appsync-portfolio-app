<template>
  <v-card>
    <v-card-title>
      Transactions
    </v-card-title>
    <v-card-text>
      <v-simple-table>
        <template v-slot:default>
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
              v-for="item in transactions"
              :key="item.transaction"
            >
              <td>{{ item.date }}</td>
              <td>{{ item.stock }}</td>
              <td>{{ item.operation }}</td>
              <td>{{ item.shares }}</td>
              <td>{{ item.askPrice }}</td>
              <td>{{ item.finalPrice }}</td>
              <td>{{ item.totalValue }}</td>
              <td>{{ item.status }}</td>
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

export default {
  name: 'Transactions',
  data () {
    return {
      transactions: [],
      loader: null,
      loading: false
    }
  },
  methods: {
    async reset () {
      const l = this.loader
      this[l] = !this[l]
      await API.graphql({
        query: mutations.reset,
        variables: {
          table: 'TRANSACTION'
        }
      })
      this.loader = null
    }
  },
  created: async function () {
    const res = await API.graphql({ query: queries.getTransactions })
    this.transactions = res.data.getTransactions
  },
  mounted () {
    this.$root.$on('new-transaction', (transaction) => {
      console.log(transaction)
      this.transactions.push(...transaction)
    })
  }
}
</script>
