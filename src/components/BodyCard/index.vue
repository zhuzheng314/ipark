<template>
<div class="bodyCard">
  <el-card class="box-card">
    <div class="bodyCard-title">{{title}}</div>
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
      <el-table :data="info.tableData" :style="{width: 144 * info.label.length}">
      <el-table-column
        v-for="(item,i) in info.label"
        :key="(item,i)"
        :prop="item.prop"
        :label="item.label"
        :width="144">
      </el-table-column>
    </el-table>
    </div>
  </el-card>
</div>
</template>

<script>
export default {
  name: 'bodyCard',
  components: {
  },
  props: [
    'type', 'data'
  ],
  data () {
    return {
      title: this.data.title,
      info: this.data.info
      // {
      //   name: this.data.info.name,
      //   value: this.data.info.value,
      //   tag: !this.data.info.tag ? false : this.data.info.tag
      // }
    }
  },
  methods: {
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
  }
  .bodyCard-title{
    .title-style;
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
      font-size: 14px;
      color: @text-color-light;
    }
  }
  &:after{
    content: "";
    display: block;
    clear: both;
  }

}
</style>
