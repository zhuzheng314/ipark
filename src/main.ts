import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import '../public/style/theme/index.css'
import './registerServiceWorker'
import router from './router'
import store from './store'

import { FilterFun } from './filters/FilterFun'
const filterFun: FilterFun = new FilterFun()

filterFun.funs.forEach((v, k) => {
  console.log(k, v)
  Vue.filter(k, v)
})

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
