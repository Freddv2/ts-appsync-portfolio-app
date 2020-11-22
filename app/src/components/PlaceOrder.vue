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
      pricePerShare: 0
    }
  }
}
</script>

<style scoped>

</style>
