import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import '/plugin/vee-validation.js'
import { store } from './store/index'
import axios from 'axios'

// Vue.use(axios)
Vue.prototype.$http = axios
Vue.config.productionTip = false


new Vue({
  router,
  store: store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
