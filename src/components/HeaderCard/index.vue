<template>
<div class="headerCard">
  <el-card class="box-card" shadow="never">
    <div class="headerCard-title">
      <i v-if="headerCard_icon!==false" class="iconfont" v-html="headerCard_icon"></i>
      <span>{{data.title}}</span>
    </div>
    <div class="headerCard-btns">
      <slot name="headerCardBtns"></slot>
    </div>
    <slot name="headerCardSlot" :slotName="data.data"></slot>
  </el-card>

</div>
</template>

<script>
export default {
  name: 'HeaderCard',
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

  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
.headerCard{
  /deep/ .box-card{
    min-height: 56px;
    .el-card__body{
      padding: 0;
      position: relative;
    }
    .headerCard-title{
      font-size: 24px;
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
