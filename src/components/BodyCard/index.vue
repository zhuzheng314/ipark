<template>
<div class="bodyCard">
  <el-card class="box-card">
    <div class="bodyCard-title" slot="header">
      {{title}}
      <div class="bodyCard-btns">
        <slot name="btn"></slot>
      </div>
    </div>
    <div v-if="type==1" style="padding: 20px; overflow: hidden">
      <div class="bodyCard-infoBox" v-for="(item,i) of data.info" :key="(item,i)">
        <span class="bodyCard-infoBox-name">{{item.name}}</span>
        <span>:</span>
        <span class="bodyCard-infoBox-value" v-if="item.tag">
          <Tag :data="item.value"></Tag>
        </span>
        <el-tooltip v-else class="item" effect="dark" :content="item.value" placement="top">
          <span class="bodyCard-infoBox-value">{{item.value === null || item.value === undefined ? '-' : item.value}}</span>
        </el-tooltip>
      </div>
    </div>
    <div v-if="type==2" style="padding: 20px">
      <GTable
        :tableLabel="info.label"
        :tableData="info && info.tableData">
        <template #renderButton="data">
          <slot name="btns" :slotName="data.slotName"></slot>
        </template>
      </GTable>
    </div>
    <div v-if="type==3" style="padding: 20px">
      <div class="bodyCard-text">{{data.info ? data.info : '暂无备注'}}</div>
    </div>
    <div v-if="type==='img'">
      <slot name="img-cont"></slot>
      <div style="padding: 0 20px 20px">
        <div v-if="data && data.attached && data.attached.upload && data.attached.upload.length">
          <img style="width: 300px; height: 200px; margin-right: 20px"
               :key="'img'+ index"
               v-for="(item, index) in data && data.attached && data.attached.upload"
               :src="$urls.fileUrl + item.url"
               @click="handleOpenImg($urls.fileUrl + item.url)"
               alt="">
        </div>
        <None v-else></None>
      </div>
    </div>
  </el-card>
</div>
</template>

<script>
export default {
  name: 'BodyCard',
  components: {
  },
  props: [
    'type', 'data'
  ],
  data () {
    return {
      title: this.data.title,
      info: this.data.info
    }
  },
  methods: {
    handleOpenImg (url) {
      window.open(url)
    }
  },
  mounted () {
    this.info && this.info.tableData && this.info.tableData.forEach(arr => {
      for (var i in arr) {
        arr[i] = arr[i] || '-'
      }
    })
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
.bodyCard{
  width: ~"calc(100% - 32px)";
  margin: 16px 16px 0 16px;
  background: #fff;
  /deep/ .el-card__body{
    padding: 0;
    min-height: 88px;
  }
  .bodyCard-title{
    .title-style;
    position: relative;
    .bodyCard-btns{
      /*width: 80%;*/
      /*height: 100%;*/
      position: absolute;
      right: 0px;
      top: 0px;
      /*display: flex;*/
      /*justify-content: flex-end;*/
    }
  }
  .bodyCard-infoBox{
    width: 33%;
    height: 40px;
    line-height: 40px;
    float: left;
    box-sizing: border-box;
    padding: 0 16px;
    .ellipsis;
    .bodyCard-infoBox-name{
      font-size: 16px;
      color: @text-color;
    }
    .bodyCard-infoBox-value{
      margin-left: 5px;
      font-size: 14px;
      color: @text-color-light;
      display: inline-block;
    }
  }
  .bodyCard-text{
    width: 100%;
    padding: 0 36px;
  }

  &:after{
    content: "";
    display: block;
    clear: both;
  }

}
</style>
