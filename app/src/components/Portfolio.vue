<template>
  <v-simple-table>
    <template v-slot:default>
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
</template>

<script>
import {API} from '@aws-amplify/api'
import * as queries from '../graphql/queries'

export default {
  name: 'Portfolio',
  data() {
    return {
      stocks: []
    }
  },
  created: async function () {
    const res = await API.graphql({query: queries.getStocks})
    this.stocks = res.data.getStocks
  }
}
</script>
