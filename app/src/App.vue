<template>
  <v-app>
    <v-main
      class="grey lighten-3"
    >
      <v-responsive>
        <v-container
          fluid
        >
          <v-row>
            <v-spacer />
            <v-col cols="8">
              <Portfolio />
            </v-col>
            <v-spacer />
          </v-row>
          <v-row>
            <v-spacer />
            <v-col cols="8">
              <PlaceOrder />
            </v-col>
            <v-spacer />
          </v-row>
          <v-row>
            <v-spacer />
            <v-col cols="8">
              <Transactions />
            </v-col>
            <v-spacer />
          </v-row>
        </v-container>
      </v-responsive>
    </v-main>
  </v-app>
</template>

<script>
import Portfolio from '@/components/Portfolio'
import PlaceOrder from '@/components/PlaceOrder'
import Transactions from '@/components/Transactions'

export default {
  name: 'App',
  components: {
    Portfolio,
    PlaceOrder,
    Transactions
  },
  data () {
    return {}
  },
  async created () {
    //A better way of fetching inital data would be to fetch all the portfolio info and pass it as a prop to children component.
    //But for Demo purpose, we'll fetch data in child component to show GraphQL data return filtering capabilities
    // const res = await API.graphql({
    //   query: queries.getPortfolio,
    //   variables: {
    //     id: '1'
    //   }
    // })
  }
}
</script>
