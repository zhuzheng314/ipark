<template>
<div class="headerCard">
  <el-card class="box-card" shadow="never">
    <div class="headerCard-title">
      <i v-if="headerCard_icon!==false" class="iconfont" v-html="headerCard_icon"></i>
      <span>{{data.title}}</span>
    </div>
    <div class="headerCard-btns">
      <div class="btnBox" v-for="(item,i) in headerCard_button" :key="(item,i)" @click="childMethod(item.function)">
        <i class="iconfont" v-html="item.icon"></i>
        <span class="headerCard-btn-name">{{item.name}}</span>
      </div>
    </div>
  </el-card>

</div>
</template>

<script>
export default {
  name: 'headerCard',
  components: {
  },
  props: [
    'data'
  ],
  data () {
    return {
      headerCard_icon: !this.data.icon ? false : this.data.icon,
      headerCard_title: this.data.title,
      headerCard_button: this.data.button
    }
  },
  methods: {
    childMethod (fun) {
      this.$parent.$parent.$parent[fun]()
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
.headerCard{
  /deep/ .box-card{
    height: 56px;
    border-bottom: 2px solid #B2E0F4;
    .el-card__body{
      padding: 0;
      position: relative;
    }
    .headerCard-title{
      height: 56px;
      line-height: 56px;
      padding-left: 25px;
      i {
        margin-right: 10px;
      }
    }
    .headerCard-btns{
      height: 100%;
      width: 520px;
      position: absolute;
      right: 16px;
      top: 0;
      display: flex;
      justify-content: flex-end;
      .btnBox{
        width: 100px;
        height: 100%;
        line-height: 56px;
        cursor: pointer;
        color: @text-color;
        &:hover{
          color: @light-blue;
        }
        &:active{
          color: @blue;
        }
        i{
          margin-right: 10px;
        }

      }
    }
  }
}
</style>
