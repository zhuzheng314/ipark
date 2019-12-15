<template>
<div class="bodyCard">
  <el-card class="box-card">
    <div class="bodyCard-title">
      {{title}}
      <div class="bodyCard-btns">
        <slot name="btn"></slot>
      </div>
    </div>
    <div v-if="type==1">
      <div class="bodyCard-infoBox" v-for="(item,i) of data.info" :key="(item,i)">
        <span class="bodyCard-infoBox-name">{{item.name}}</span>
        <span>:</span>
        <el-tag v-if="item.tag">
          <el-tooltip
          class="item"
          effect="dark"
          :content="item.value"
          placement="top">
            <span class="bodyCard-infoBox-value">{{item.value}}</span>
          </el-tooltip>
        </el-tag>
        <el-tooltip v-else class="item" effect="dark" :content="item.value" placement="top">
          <span class="bodyCard-infoBox-value">{{item.value}}</span>
        </el-tooltip>

      </div>
    </div>
    <div v-if="type==2">
      <el-table :data="info.tableData" :style="{width: 144 * info.label.length,minWidth: '1146px'}">
      <el-table-column
        v-for="(item,i) in info.label"
        :key="(item,i)"
        :prop="item.prop"
        :label="item.label"
        :width="144 * info.label.length >= 1146 ? 144 : 1146 / info.label.length">
        </el-table-column>
      </el-table>
    </div>
    <div v-if="type==3">
      <div class="bodyCard-text">{{data.info ? data.info : '暂无备注'}}</div>
    </div>
    <div v-if="type==='img'">
      <slot name="img-cont"></slot>
      <div style="padding: 0 20px 20px">
        <img style="width: 300px; height: 200px; margin-right: 20px"
         :key="'img'+ index"
          v-for="(item, index) in data && data.attached && data.attached.upload"
          :src="$urls.fileUrl + item.url"
          @click="handleOpenImg($urls.fileUrl + item.url)"
          alt="">
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
    this.info.tableData.forEach(arr => {
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
      width: 80%;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      display: flex;
      justify-content: flex-end;
    }
  }
  .bodyCard-infoBox{
    width: 376px;
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
