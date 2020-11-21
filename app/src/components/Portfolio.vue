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
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      stocks: [],
    }
  },
};
</script>
