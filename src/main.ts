import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
// import '../public/theme/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import '../public/style/index.less'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'vue-g2'

import * as filters from './filters/filters'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

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
