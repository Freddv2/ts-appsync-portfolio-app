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
      <v-btn
        :disabled="loading"
        :loading="loading"
        color="secondary"
        @click="loader = 'loading'"
      >
        Place order
      </v-btn>
      <v-col />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'PlaceOrder',
  data() {
    return {
      stock: '',
      shares: 0,
      pricePerShare: 0,
      loader: null,
      loading: false,
    }
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    },
  },
}
</script>

<style scoped>
</style>
