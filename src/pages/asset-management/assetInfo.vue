<template>
  <div class="assetInfo">
    <div v-if="state==0" class="park">
      <Park
        :state="state"
        @getState="getState"
      ></Park>
    </div>

    <div v-if="state==1" class="building">
      <!-- <el-card class="box-card-title">
        <div class="back" @click="state=0">
          <i class="el-icon-arrow-left"></i>
          <div class="parkName">
            <i class="iconfont">&#xe60c;</i>
            <p class="park-building">西港发展中心  /  B栋</p>
            <p class="details">查看详情</p>
          </div>
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

            {{item}}
          </div>
        </div>

      </el-card> -->
      <Building
        :state="state"
        @getState="getState"
      ></Building>
    </div>

    <div v-if="state==2" class="room">
      <Room
        :state="state"
        @getState="getState"
      ></Room>
    </div>

  </div>
</template>

<script>
import Park from '@/pages/asset-management/park.vue'
import Building from '@/pages/asset-management/building.vue'
import Room from '@/pages/asset-management/room.vue'
export default {
  name: 'assetInfo',
  components: {
    Park,
    Building,
    Room
  },
  data () {
    return {
      // 显示： 0：园区、1：楼、2：房间
      state: 1,
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
      // 楼层列表
      floorList: [
        { name: '一楼', roomList: { name: '', area: 0, state: 0 } },
        { name: '二楼', roomList: { name: '', area: 0, state: 0 } }
      ]
    }
  },
  mounted () {

  },
  watch: {

  },
  methods: {
    getState (value) {
      this.state = value
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
  .assetInfo{
    width: 100%;
    height: 100%;
    .park,.building,.room{
      width: 100%;
      height: 100%;
    }
  }
</style>
