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
export default {
  name: 'PlaceOrder',
  data () {
    return {
      stock: '',
      shares: 0,
      pricePerShare: 0,
      buyLoader: null,
      sellLoader: null,
      buyLoading: false,
      sellLoading: false
    }
  },
  methods: {
    buy () {
      this.initBuyButtonLoading()
      setTimeout(() => {
        this.resetLoadingButtons()
      }, 3000)
    },
    sell () {
      this.initSellLoadingButton()
      setTimeout(() => {
        this.resetLoadingButtons()
      }, 3000)
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
