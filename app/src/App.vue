<template>
  <v-app>
    <v-container
        class="grey lighten-5"
        fluid
    >
      <Portfolio/>
      <PlaceOrder/>
    </v-container>
  </v-app>
</template>

<script>
import Portfolio from '@/components/Portfolio'
import PlaceOrder from "@/components/PlaceOrder";

export default {
  name: 'App',
  components: {
    Portfolio,
    PlaceOrder
  },
  data() {
    return {}
  }
}
</script>
