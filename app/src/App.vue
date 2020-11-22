<template>
  <v-app>
    <v-main>
      <v-responsive>
        <v-container
          :aspect-ratio="16/9"
          class="grey lighten-5"
          fluid
        >
          <v-row>
            <v-col>
              <Portfolio />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <PlaceOrder />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <Transactions />
            </v-col>
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
