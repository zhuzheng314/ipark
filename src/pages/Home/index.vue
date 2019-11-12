<template>
<div class="home">
  <div class="quick">
    <div class="quick-item" v-for="(item,i) in quickList" :key="(item,i)">
      <router-link :to="item.src">
        <img :src="item.img" alt="">
      </router-link>
      <p>{{item.name}}</p>
    </div>
  </div>
</div>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
      quickList: [
        { name: '楼宇资产', img: require('@/assets/img/ipark/buildings.png'), src: '' },
        { name: '招商管理', img: require('@/assets/img/ipark/attract-investment.png'), src: '' },
        { name: '企业合同', img: require('@/assets/img/ipark/contract.png'), src: '' },
        { name: '入驻管理', img: require('@/assets/img/ipark/enter.png'), src: '' },
        { name: '退驻管理', img: require('@/assets/img/ipark/retreat.png'), src: '' }
      ]
    }
  },
  mounted () {

  },
  watch: {

  },
  methods: {

  }
}
</script>

<style lang="less">
@import '../../assets/style/index.less';

.home{
  width: 100%;
  height: 100%;
  .quick{
    width: 100%;
    height: 150px;
    background: @white;
    .quick-item{
      float: left;
      width: 100px;
      height: ~"calc(100% - 44px)";
      margin: 22px 62px;
      position: relative;
      img{
        display: block;
        width: 72px;
        height: 72px;
        margin: 0 auto;
        cursor: pointer;
      }
      p{
        color: @text-color;
        font-size: 14px;
        text-align: center;
        margin-top: 15px;
      }
    }
  }
}
</style>
