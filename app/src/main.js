import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Amplify from '@aws-amplify/core'

Vue.config.productionTip = false

const appSyncConfig = {
  aws_appsync_graphqlEndpoint: 'https://gntkxpuor5dpdmrzemg6nfp424.appsync-api.ca-central-1.amazonaws.com/graphql',
  aws_appsync_region: 'ca-central-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'da2-m4rfks7yyjbxln7o2fnntgzyby'
}

Amplify.configure(appSyncConfig)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
