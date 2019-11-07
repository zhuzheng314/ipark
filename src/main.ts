import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import '../public/style/theme/index.css'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
