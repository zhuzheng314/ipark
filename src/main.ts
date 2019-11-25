import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
// import '../public/theme/index.css'
import 'echarts/lib/component/polar'
import 'element-ui/lib/theme-chalk/index.css'
import '../public/style/index.less'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import { api, baseUrl } from './config/api'
import registerGlobalComponents from './components/index.js'
import 'vue-g2'
import ECharts from 'vue-echarts'
import 'echarts'
import { tables } from './config/table'

// 过滤器
import { FilterFun } from './filters/FilterFun'

const filterFun: FilterFun = new FilterFun()

filterFun.funs.forEach((v, k) => {
  Vue.filter(k, v)
})

Vue.component('v-chart', ECharts)

Vue.use(ElementUI)
Vue.config.productionTip = false

axios.defaults.baseURL = baseUrl

Vue.prototype.$https = axios
Vue.prototype.$urls = api
Vue.prototype.$tableLabels = tables

registerGlobalComponents(Vue) // 全局注册组件

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
