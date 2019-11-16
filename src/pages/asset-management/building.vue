<template>
  <div class="building">
    <el-card style="margin-bottom: 10px">
      <div slot="header" class="clearfix">
        <el-page-header @back="goBack" content="西港发展中心">
        </el-page-header>
      </div>
      <div>
        <div>
          <InfoBox
            style="float: left; margin:0 60px 0 15px"
            v-for="(item, index) in infoBoxData" :type='item.type'
            :key="'info' + index"
            :data="item"
          ></InfoBox>
          <div style="clear:both"></div>
        </div>
      </div>
    </el-card>

    <el-card>
      <el-table
        ref="filterTable"
        :data="tableData"
        @row-click="handleRowClick"
        style="width: 100%">
        <el-table-column
          prop="name"
          width="300"
          label="名称">
          <template  slot-scope="scope">
            <div class="tablecard">
              <img class="img" :src="scope.row.img">
              <div class="right">
                <div class="name">{{scope.row.name}}</div>
                <div class="value">{{scope.row.area}}</div>
              </div>
            </div>

          </template>
        </el-table-column>
        <el-table-column
          prop="can"
          label="可招租面积">
        </el-table-column>
        <el-table-column
          prop="price"
          label="在租均价">
        </el-table-column>
        <el-table-column
          prop="name"
          width="200"
          label="出租率">
          <template>
            <el-progress :percentage="50"></el-progress>
          </template>
        </el-table-column>
        <el-table-column
          prop="num"
          label="总房源数量">
        </el-table-column>
        <el-table-column
          prop="num"
          label="可招租房源数量">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import RoomBox from '@/pages/asset-management/roomBox.vue'
import InfoBox from '@/components/InfoBox/index.vue'
export default {
  name: 'building',
  components: {
    InfoBox
  },
  props: ['state'],
  data () {
    return {
      stateValue: this.state,
      // 查询需求
      // 园区列表
      parkList: [],
      // 楼宇列表
      buildingList: [],
      // 楼宇信息
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
      // 楼层列表
      floorList: [
        { name: '一楼', area: '1534m³', roomList: [] },
        { name: '二楼', area: '1534m³', count: 3, roomList: [{ name: '', area: 0, state: 0, count: 3 }] },
        { name: '三楼', area: '1534m³', count: 3, roomList: [{ name: '', area: 0, state: 0, count: 2 }, { name: '', area: 0, state: 0, count: 1 }] },
        { name: '四楼', area: '1534m³', count: 3, roomList: [{ name: '', area: 0, state: 0, count: 1 }, { name: '', area: 0, state: 0, count: 1 }, { name: '', area: 0, state: 0, count: 1 }] }
      ],
      tableData: []
    }
  },
  mounted () {
    [1, 1, 1, 1, 1].forEach((a, i) => {
      this.tableData.push({
        img: require('@/assets/img/park/build.png'),
        date: '2016-05-02',
        name: '协力大厦' + i,
        can: '10000 ㎡',
        price: '2.22元/㎡·天',
        percent: '10%',
        area: '建筑面积：12344 ㎡',
        num: 10,
        address: '上海市普陀区金沙江路 1518 弄',
        tag: '家'
      })
    })
  },
  watch: {

  },
  methods: {
    setState () {
      this.stateValue = 0
      this.$emit('getState', this.stateValue)
    },
    handleRowClick (row, column, event) {
      console.log(row, column, event)
      this.$router.push('/asset-management/assetInfo')
    },
    goBack () {
      this.$router.go(-1) // 后退
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
  .building{
    .box-card-title {
      position: relative;
      width: 100%;
      height: 144px;
    }
    .box-card-content {
      position: relative;
      width: 100%;
      margin-top: 8px;
      // box-sizing: border-box;
      height: ~"calc(100% - 144px - 8px)";
      &>div {
        height: 100%;
      }
    }
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
    .building-infoBox{
      width: ~"calc(100% - 310px)";
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      display: flex;
      justify-content: space-evenly;
    }

    .requirement{
      width: 100%;
      height: 48px;
    }

    .floors{
      overflow: auto;
      width: 100%;
      height: ~"calc(100% - 50px)";
    }
    .noFloor{
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 300px;
      font-size: 36px;
      color: @gray;
    }
    .floor{
      width: 100%;
      height: 80px;
      margin-bottom: 16px;
      position: relative;
      border-bottom: 1px solid @light-blue;
    }
    .floor-title{
      .title-style();
      height: 80px;
      width: 120px;
      float: left;
      padding-left: 18px;
      box-sizing: border-box;
      p{
        cursor: pointer;
        height: 20px;
        line-height: 20px;
        color: @gray;
        margin: 0px;
        padding-left: 5px;
        &:first-child{
          margin-top: 40px;
          font-size: 18px;
        }
        &:nth-child(2){
          font-size: 14px;
        }
      }
      &:before{
        width: 4px;
        height: 64px;
        position: absolute;
        transform: translateY(-24px);
        left: 8px;
      }
    }
    .rooms{
      height: 100%;
      float: left;
      box-sizing: border-box;
      width: ~"calc(100% - 120px)";
      border: 1px solid #f0f;
    }
    .tablecard{
      .img{
        width: 96px;
        height: 62px;
        float: left;
        margin-right: 10px;
      }
      .right{
        .name{
          font-size: 16px;
          padding: 9px 0 14px;
          line-height: 16px;
          color: #666;
        }
        .value{
          font-size: 14px;
          line-height: 14px;
          color: #8D8D8D;
        }
      }
    }
  }

</style>
