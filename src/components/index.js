import Vue from 'vue'

// 组件
import BodyCard from './BodyCard/index.vue'
import CardList from './CardList/index.vue'
import GlobalHeader from './GlobalHeader/index.vue'
import HeaderCard from './HeaderCard/index.vue'
import InfoBox from './InfoBox/index.vue'
import ParkForm from './ParkForm/index.vue'
import SideMenu from './SideMenu/index.vue'
import HeaderInfo from './HeaderInfo/index.vue'
import Comparison from './Comparison/index.vue'
import GTable from './GTable'
import ParkMenu from './ParkMenu'
import None from './None'

export default (Vue) => {
  Vue.component('BodyCard', BodyCard)
  Vue.component('CardList', CardList)
  Vue.component('GlobalHeader', GlobalHeader)
  Vue.component('HeaderCard', HeaderCard)
  Vue.component('InfoBox', InfoBox)
  Vue.component('ParkForm', ParkForm)
  Vue.component('SideMenu', SideMenu)
  Vue.component('HeaderInfo', HeaderInfo)
  Vue.component('Comparison', Comparison)
  Vue.component('GTable', GTable)
  Vue.component('ParkMenu', ParkMenu)
  Vue.component('None', None)
}
