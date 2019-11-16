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

// 组件
import BodyCard from './components/BodyCard/index.vue'
import CardList from './components/CardList/index.vue'
import GlobalHeader from './components/GlobalHeader/index.vue'
import HeaderCard from './components/HeaderCard/index.vue'
import InfoBox from './components/InfoBox/index.vue'
import ParkForm from './components/ParkForm/index.vue'
import SideMenu from './components/SideMenu/index.vue'
import HeaderInfo from './components/HeaderInfo/index.vue'

// 过滤器
import { FilterFun } from './filters/FilterFun'

Vue.component('BodyCard', BodyCard)
Vue.component('CardList', CardList)
Vue.component('GlobalHeader', GlobalHeader)
Vue.component('HeaderCard', HeaderCard)
Vue.component('InfoBox', InfoBox)
Vue.component('ParkForm', ParkForm)
Vue.component('SideMenu', SideMenu)
Vue.component('HeaderInfo', HeaderInfo)
const filterFun: FilterFun = new FilterFun()

filterFun.funs.forEach((v, k) => {
  Vue.filter(k, v)
})

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
