<template>
  <div class="assetInfo">

    <el-card style="margin-bottom: 10px">
<!--      <div class="box-card-title" style="width: 200px; height: 100px;float: left">-->
<!--        <div class="back" @click="setState">-->
<!--          <i class="el-icon-arrow-left"></i>-->
<!--        </div>-->
<!--        <div class="parkName">-->
<!--          <i class="iconfont">&#xe60c;</i>-->
<!--          <p class="park-building">西港发展中心 / B栋</p>-->
<!--          <p class="details">查看详情</p>-->
<!--        </div>-->
<!--      </div>-->
      <div slot="header" class="clearfix">
        <el-page-header @back="goBack" content="协力大厦">
        </el-page-header>
      </div>
      <div>
        <InfoBox
          style="float: left; margin:0 60px 0 15px"
          v-for="(item, index) in infoBoxData" :type='item.type'
          :key="'info' + index"
          :data="item"
        ></InfoBox>
        <div style="clear:both"></div>
      </div>

    </el-card>

    <el-card>
      <div>
        <el-select class="mr-10" v-model="requirement.area.value" placeholder="面积选择">
          <el-option
            v-for="item in requirement.area.areaList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select class="mr-10" v-model="requirement.state.value" placeholder="审核状态">
          <el-option
            v-for="item in requirement.state.stateList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select class="mr-10" v-model="requirement.timeLimit.value" placeholder="合同期限">
          <el-option
            v-for="item in requirement.timeLimit.timeLimitList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select class="mr-10" v-model="requirement.industry.value" placeholder="行业筛选">
          <el-option
            v-for="item in requirement.industry.industryList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select class="mr-10" v-model="requirement.source.value" placeholder="招商筛选">
          <el-option
            v-for="item in requirement.source.sourceList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select class="mr-10" v-model="requirement.empty.value" placeholder="空置筛选">
          <el-option
            v-for="item in requirement.empty.emptyList"
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
      infoBoxData: [
        {
          type: 0,
          title: {
            name: '管理面积',
            note: '测试文本'
          },
          value: {
            value: 20311400.3,
            unit: '㎡',
            chart: 0.24
          },
          subtitle: {
            name: '总房源数量',
            value: 22,
            unit: '间'
          }
        },
        {
          type: 'num',
          title: {
            name: '出租率',
            note: '测试文本'
          },
          value: {
            value: 55,
            unit: '%',
            chart: 0.24
          },
          subtitle: {
            name: '本月签约面积',
            value: 22,
            unit: '㎡'
          }
        },
        {
          type: 'num',
          title: {
            name: '在租实时均价',
            note: '测试文本'
          },
          value: {
            value: 2,
            unit: '元/㎡·天',
            chart: 0.24
          },
          subtitle: {
            name: '本月签约均价',
            value: 0,
            unit: '元/㎡·天'
          }
        },
        {
          type: 0,
          title: {
            name: '可招商面积',
            note: '测试文本'
          },
          value: {
            value: 20311400.3,
            unit: '㎡',
            chart: 0.24
          },
          subtitle: {
            name: '可招商房间',
            value: 22,
            unit: '间'
          }
        },
        {
          type: 'chart',
          title: {
            name: '当前计租率',
            note: '测试文本'
          },
          value: {
            value: 22.3,
            unit: '%',
            chart: 0.24
          },
          subtitle: {
            name: '预计全年计租率',
            value: 22,
            unit: '%'
          }
        }
      ],
      requirement: {
        area: {
          areaList: [
            {
              value: 1,
              label: '100m³以内'
            },
            {
              value: 2,
              label: '100-200m³'
            },
            {
              value: 3,
              label: '200-300m³'
            },
            {
              value: 4,
              label: '300m³以上'
            }
          ],
          value: ''
        },
        state: {
          stateList: [
            {
              value: 1,
              label: '已审核'
            },
            {
              value: 2,
              label: '审核中'
            },
            {
              value: 3,
              label: '未通过'
            }
          ],
          value: ''
        },
        timeLimit: {
          timeLimitList: [
            {
              value: 1,
              label: '半年以下'
            },
            {
              value: 2,
              label: '一年以内'
            },
            {
              value: 3,
              label: '三年以内'
            },
            {
              value: 4,
              label: '三年以上'
            }
          ],
          value: ''
        },
        industry: {
          industryList: [
            {
              value: 1,
              label: '金融'
            },
            {
              value: 2,
              label: '物流'
            },
            {
              value: 3,
              label: '电商'
            },
            {
              value: 4,
              label: '互联网'
            },
            {
              value: 0,
              label: '其他'
            }
          ],
          value: ''
        },
        source: {
          sourceList: [
            {
              value: 1,
              label: '中介'
            },
            {
              value: 2,
              label: '广告'
            },
            {
              value: 0,
              label: '其他'
            }
          ],
          value: ''
        },
        empty: {
          emptyList: [
            {
              value: 1,
              label: '占用'
            },
            {
              value: 2,
              label: '预定'
            },
            {
              value: 0,
              label: '待租'
            }
          ],
          value: ''
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
    },
    goBack () {
      this.$router.go(-1) // 后退
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
    position: relative;
    .box-card-title {
      position: relative;
      .back .el-icon-arrow-left{
        font-size: 32px;
        color: @blue;
        font-weight: 800;
        cursor: pointer;
      }
      .parkName{
        width: 230px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 80px;
        i{
          font-size: 32px;
          color: @green;
          position: absolute;
          top: 25px;
        }
        p{
          width: ~"calc(100% - 50px)";
          position: absolute;
          right: 0;
          text-align: center;
        }
        .park-building{
          top: 10px;
          font-size: 18px;
        }
        .details{
          top: 50px;
          cursor: pointer;
          color: @blue;
        }
      }
    }

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
