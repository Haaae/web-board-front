import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import '/plugin/vee-validation.js'

import { store } from './store'

import axios from 'axios'

Vue.use(axios)
// Vue.prototype.$axios = window.axios

Vue.config.productionTip = false


new Vue({
  router,
  store: store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
