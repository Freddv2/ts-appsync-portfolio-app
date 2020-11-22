<template>
  <v-form>
    <v-container>
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
      <v-row>
        <v-btn
          :disabled="loading"
          :loading="loading"
          class="mr-4"
          color="secondary"
          @click="loader = 'loading'"
        >
          Place order
        </v-btn>
        <v-col/>
      </v-row>
    </v-container>
  </v-form>
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
