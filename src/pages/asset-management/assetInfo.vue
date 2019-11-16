<template>
  <div class="assetInfo">
    <!-- <el-card style="margin-bottom: 10px;d"> -->
      <!-- <CardList v-for="item in 5"  :key="item + 'cardl'" style="width: 18%; margin: 0 10px 0 0; float: left"></CardList>
      <div class="clear"></div> -->
    <!-- </el-card> -->
    <el-card style="margin-bottom:10px">
      <InfoBox style="with:250px;margin:0 15px 0 10px;float: left" v-for="item in 5" :type='item % 4' :key="'info' + item" :data="infoBoxData"></InfoBox>
      <div style="clear:both"></div>
    </el-card>

    <el-card>
      <div>
        <el-select v-for="item in 5" :key="item + 'sel'" class="select" size="small" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-divider></el-divider>

<!--      状态-->
      <div>
        <div v-for="item in 4" :key="'t' + item" class="typeWrap">
          <div class="status" :style="{background: colorList[item - 1]}"></div>
          <div class="text">2019({{item}})</div>
        </div>

        <div style="float: right">
          <el-button size="mini" @click="() => this.showType = !this.showType">切换</el-button>
        </div>
      </div>

<!--      楼宇列表-->

      <div class="list" :key="'list-' + index" v-for="(item, index) in fakerList">
        <div class="list-header">{{index}}</div>
        <div class="list-wrap">
          <div v-for="(subItem, subIndex) in item" :key="'listItem' + subIndex" >
            <div
              v-if="!showType"
              class="list-item"
              :style="{ width: 'calc(' + 100 / item.length + '% - 5px)' , background: subItem.bgColor }">
              <div class="text">阿里巴巴</div>
              <div class="sub-text" style="margin-bottom: 8px">{{subItem.area}}㎡</div>
              <div class="sub-text">2019-11-11到期</div>
              <div class="status">占用</div>
            </div>
            <div
              v-if="showType"
              class="list-item"
              :style="{ width: 'calc(' + subItem.area * 100 / item[item.length - 1].allArea + '% - 5px)' , background: subItem.bgColor }">
              <div class="text">阿里巴巴</div>
              <div class="sub-text" style="margin-bottom: 8px">{{subItem.area}}㎡</div>
              <div class="sub-text">2019-11-11到期</div>
              <div class="status">占用</div>
            </div>
          </div>

        </div>
        <div class="clear"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import ElDivider from 'element-ui/packages/divider/src/main'
import InfoBox from '@/components/InfoBox/index.vue'
export default {
  name: 'assetInfo',
  components: {
    ElDivider,
    InfoBox
  },
  data () {
    return {
      showType: true,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      fakerList: [
      ],
      colorList: ['#57D1E2', '#46D2A8', '#F1A468', '#626C91'],
      infoBoxData: {
        title: {
          name: '可招商面积',
          note: '可招商面积'
        },
        value: {
          value: 203400,
          unit: '㎡',
          chart: 0.42
        },
        subtitle: {
          name: '可招商房间',
          value: 22,
          unit: '间'
        }
      }
    }
  },
  mounted () {
    let fakerList = []
    for (let i = 0; i < 6; i++) {
      let arr = []
      let allArea = 0
      let randomLength = this.random(3, 8)
      for (let j = 0; j < randomLength; j++) {
        let area = this.random(150, 300)
        allArea += area
        arr.push({
          area,
          allArea,
          bgColor: this.colorList[this.random(0, 4) % 4]
        })
      }
      fakerList.push(arr)
    }
    this.fakerList = fakerList
  },
  methods: {
    getState (value) {
      this.state = value
    },
    random (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
  *{
    box-sizing: border-box;
  }
  .assetInfo{
    width: 100%;
    height: 100%;
    .park,.building,.room{
      width: 100%;
      height: 100%;
    }
    .select{
      margin-right: 10px;
    }
    .typeWrap{
      display: inline-block;
      margin-bottom: 15px;
      .status{
        width: 16px;
        height: 16px;
        border-radius: 2px;
        vertical-align: middle;
        display: inline-block;
      }
      .text{
        margin: 0 40px 0 8px;
        display: inline-block;
        vertical-align: middle;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.65);
      }
    }
    .list{
      width: 100%;
      margin-bottom: 8px;
      &-header{
        width: 80px;
        background-color: white;
        height: 80px;
        float: left;
        border-bottom: 1px solid #c6c6c8;
      }
      &-wrap{
        width: calc(~"100% - 80px");
        float: left;
        height: 80px;
        /*background-color: green;*/
        .list-item{
          float: left;
          width: 25%;
          height: 80px;
          padding: 13px 9px;
          color: white;
          position: relative;
          margin-right: 5px;
          .text{
            font-size: 14px;
            height: 14px;
            line-height: 14px;
            margin-bottom: 8px;
          }
          .text:last-child{
            margin-bottom: 0;
          }
          .sub-text{
            font-size: 12px;
            height: 12px;
            line-height: 12px;
          }
          .status{
            position: absolute;
            right: 0;
            top: 0;
            width: 42px;
            height: 24px;
            background:rgba(255,255,255,0.45);
            color: #5E5E5E;
            line-height: 24px;
            text-align: center;
            font-size: 12px;
          }
        }
      }
    }
  }
  .clear{
    clear: both;
  }
</style>
