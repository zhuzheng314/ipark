import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
// import '../public/theme/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import '../public/style/index.less'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import registerGlobalComponents from './components/index.js'
import request from './utils/request.js'
import 'vue-g2'

// 过滤器
import { FilterFun } from './filters/FilterFun'

const filterFun: FilterFun = new FilterFun()

filterFun.funs.forEach((v, k) => {
  Vue.filter(k, v)
})

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$https = axios

registerGlobalComponents(Vue) // 全局注册组件

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
