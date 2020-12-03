<template>
  <v-card>
    <v-card-title>
      Buy/Sell
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field
            v-model="stock"
            label="Stock"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="shares"
            label="Number of shares"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="pricePerShare"
            label="Price per share"
          />
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-col class="text-right">
        <v-btn
          :disabled="buyLoading"
          :loading="buyLoading"
          class="ma-2"
          color="secondary"
          @click="buy"
        >
          Buy
        </v-btn>
        <v-btn
          :disabled="sellLoading"
          :loading="sellLoading"
          color="secondary"
          @click="sell"
        >
          Sell
        </v-btn>
      </v-col>
    </v-card-actions>
  </v-card>
</template>

<script>
import { API } from '@aws-amplify/api'
import * as mutations from '../../../graphql/mutations'

export default {
  name: 'PlaceOrder',
  data () {
    return {
      portfolioId: 'Fred Portfolio',
      stock: '',
      shares: null,
      pricePerShare: null,
      buyLoader: null,
      sellLoader: null,
      buyLoading: false,
      sellLoading: false
    }
  },
  methods: {
    async buy () {
      try {
        this.initBuyButtonLoading()
        await this.placeOrder(true)
      } catch (e) {
        console.error(e)
      } finally {
        this.resetLoadingButtons()
      }
    },
    async sell () {
      this.initSellLoadingButton()
      await this.placeOrder(true)
      this.resetLoadingButtons()
    },
    async placeOrder (buy) {
      const res = await API.graphql({
        query: mutations.placeOrder,
        variables: {
          input: {
            portfolioId: this.portfolioId,
            stock: this.stock,
            shares: this.shares,
            action: buy ? 'BUY' : 'SELL',
            price: this.pricePerShare
          }
        }
      })
      this.$root.$emit('new-transaction', res.data.placeOrder)
    },
    initBuyButtonLoading () {
      this.buyLoader = 'buyLoading'
      const l = this.buyLoader
      this[l] = !this[l]
    },
    initSellLoadingButton () {
      this.sellLoader = 'sellLoading'
      const l = this.sellLoader
      this[l] = !this[l]
    },
    resetLoadingButtons () {
      this.buyLoader = null
      this.sellLoader = null
      this.buyLoading = false
      this.sellLoading = false
    }
  }
}
</script>

<style scoped>
</style>
