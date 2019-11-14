<template>
  <div class="building">
    <el-card class="box-card-title">
      <div class="back" @click="setState">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="parkName">
        <i class="iconfont">&#xe60c;</i>
        <p class="park-building">西港发展中心  /  B栋</p>
        <p class="details">查看详情</p>
      </div>
      <div class="building-infoBox">
        <InfoBox type=0 :data="infoBox.area"></InfoBox>
        <InfoBox type=1 :data="infoBox.area"></InfoBox>
        <InfoBox type=2 :data="infoBox.area"></InfoBox>
        <InfoBox type=3 :data="infoBox.area"></InfoBox>

      </div>
    </el-card>
    <el-card class="box-card-content" :body-style="{height:'100%',boxSizing:'border-box'}">
      <div class="requirement">
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
        <el-button type="success">查询</el-button>
        <el-button type="info">重置</el-button>
      </div>
      <div class="noFloor" v-if="floorList.length==0">暂无楼层</div>
      <div class="floors" v-if="floorList.length>0">
        <div class="floor" v-for="(item,i) in floorList" :key="(item,i)">
          <div class="floor-title">
            <p>{{item.name}}</p>
            <p>{{item.area}}</p>
          </div>
          <div v-if="item.roomList.length==0" class="noRroom">暂无房间</div>
          <div v-if="item.roomList.length>0" class="rooms">
            <RoomBox
            v-for="(room,j) in item.roomList"
            :key="(room,j)"
            :total="item.count"
            :count="room.count"
            ></RoomBox>
          </div>
        </div>
      </div>

    </el-card>
  </div>
</template>

<script>
import RoomBox from '@/pages/asset-management/roomBox.vue'
import InfoBox from '@/components/InfoBox/index.vue'
export default {
  name: 'building',
  components: {
    RoomBox, InfoBox
  },
  props: ['state'],
  data () {
    return {
      stateValue: this.state,
      // 查询需求
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
        // stateList: ["审核状态", "已审核", "审核中", "未通过"],
        // timeLimitList: ["合同期限", "半年以内", "一年以内", "三年以内", "三年以外"],
        // industryList: ["行业筛选", "金融", "物流", "电商", "互联网", "其他"],
        // sourceList: ["招商筛选", "中介", "广告", "自主", "其他"],
        // emptyList: ["空置筛选", "占用", "预定", "待租"],
        // area: "面积选择",
        // state: "审核状态",
        // timeLimit: "合同期限",
        // industry: "行业筛选",
        // source: "招商筛选",
        // empty: "空置筛选"
      },
      // 园区列表
      parkList: [],
      // 楼宇列表
      buildingList: [],
      // 楼宇信息
      infoBox: {
        area: {
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
        }
      },
      // 楼层列表
      floorList: [
        { name: '一楼', area: '1534m³', roomList: [] },
        { name: '二楼', area: '1534m³', count: 3, roomList: [{ name: '', area: 0, state: 0, count: 3 }] },
        { name: '三楼', area: '1534m³', count: 3, roomList: [{ name: '', area: 0, state: 0, count: 2 }, { name: '', area: 0, state: 0, count: 1 }] },
        { name: '四楼', area: '1534m³', count: 3, roomList: [{ name: '', area: 0, state: 0, count: 1 }, { name: '', area: 0, state: 0, count: 1 }, { name: '', area: 0, state: 0, count: 1 }] }
      ]
    }
  },
  mounted () {

  },
  watch: {

  },
  methods: {
    setState () {
      this.stateValue = 0
      this.$emit('getState', this.stateValue)
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

  }

</style>
