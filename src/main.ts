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

Object.keys(filters.filters).forEach((key:any) => {
  Vue.filter(filters.filters[key].name, filters.filters[key].fun)
})

// localStorage.setItem('token','1');
// router.beforeEach((to, from, next) => {
//   if (to.path === '/home') {
//     let token = localStorage.getItem('token');
//     if (token===null||token===''){
//       next('/test/test');
//     }
//     else{
//       next();
//     }
//   }else{
//     next();
//   }
// })

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
