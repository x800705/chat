import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = "http://139.159.141.82:8088";

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
