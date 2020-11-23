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
import PlaceOrder from "@/components/PlaceOrder";
import Transactions from "@/components/Transactions";

export default {
  name: 'App',
  components: {
    Portfolio,
    PlaceOrder,
    Transactions
  },
  data() {
    return {}
  }
}
</script>
