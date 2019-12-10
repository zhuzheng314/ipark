<template>
  <div class="assetInfo">
    <div v-if="buildId">
      <el-card style="margin-bottom: 10px">
        <div slot="header" class="clearfix">
          <el-page-header @back="goBack" :content="buildInfo.name">
          </el-page-header>
        </div>
        <div class="top-card-wrap">
          <InfoBox
            v-for="(item, index) in infoBoxData" :type='item.type'
            :key="'info' + index"
            :data="item"
          ></InfoBox>
        </div>

      </el-card>

      <el-card>
        <div>
          <el-select
            size="small"
            style="width: 150px"
            class="mr-10"
            v-model="requirement.area.value"
            placeholder="面积选择"
            @change="(data) => {
              this.handleSelect(data, 'area')
            }">
            <el-option
              v-for="item in this.$store.state.dictionary.dictionaryType['demand_area']"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select
            size="small"
            style="width: 150px"
            class="mr-10"
            v-model="requirement.timeLimit.value"
            placeholder="合同期限">
            <el-option
              v-for="item in this.$store.state.dictionary.dictionaryType['contract_term']"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button
            size="small"
            type="primary"
            style="float: right"
            @click="() => this.addRoomShow = true"
            icon="el-icon-plus">
            新增房间
          </el-button>
        </div>
        <el-divider></el-divider>

        <!--      状态-->
        <div style="margin-bottom: 10px;cursor: pointer">
          <div class="typeWrap" @click="handleStatusClick(item)" v-for="item in statusList" :key="item.str">
            <div class="status" :style="{background: item.color}"></div>
            <div class="text">{{item.str}}</div>
          </div>
          <div style="float: right">
            <el-button size="mini" @click="() => this.showTrueArea = !this.showTrueArea">切换</el-button>
          </div>
        </div>

        <!--      楼宇列表-->

        <div v-if="roomFloor.length">
          <div class="list" :key="'list-' + index" v-for="(item, index) in roomFloor">
            <div class="list-header">
              <div>{{item.floor}}楼</div>
              <div>{{item.allArea}}㎡</div>
            </div>
            <div class="list-wrap">
              <div v-for="(subItem, subIndex) in item.children" :key="'listItem' + subIndex" >
                <div
                  class="list-item"
                  @click="handleRoomClick(subItem)"
                  :style="{
                width: !showTrueArea ? 'calc(' + 100 / item.children.length + '% - 5px)'
                : 'calc(' + subItem.area * 100 / item.allArea + '% - 5px)',
                background: filterRoomColorByState(subItem) }">
                  <div class="text">{{subItem.name}}</div>
                  <div class="sub-text" style="margin-bottom: 8px">{{subItem.area}}㎡</div>
                  <div class="sub-text">{{subItem.state === 0? '2022-11-11到期':'-' }}</div>
                  <div class="status">{{statusList[subItem.state].str}}</div>
                </div>
              </div>

            </div>
            <div class="clear"></div>
          </div>
        </div>
        <div v-if="!roomFloor.length">
          <None></None>
        </div>

        <!--      房间信息-->
        <el-drawer
          title="房间详情"
          custom-class="drawer-r"
          :visible.sync="roomInfoState"
          size="1186px"
          direction="rtl">
          <HeaderCard :data="roomInfo_header">
            <template #headerCardBtns>
              <div class="btnBox" v-for="(item,i) in roomInfo_header.button" :key="(item,i)" @click="open(item.name)">
                <i class="iconfont" v-html="item.icon"></i>
                <span class="headerCard-btn-name">{{item.name}}</span>
              </div>
            </template>
          </HeaderCard>
          <HeaderInfo type=1 :data="roomInfo_info"></HeaderInfo>
          <div class="drawer-body" style="height: 500px;">
            <BodyCard type=2 :data="roomInfo_body_table1">
              <template #btn>
                <el-button
                  :style="{height: '80%',margin: 'auto 8px'}"
                  size="mini"
                >新建合同</el-button>
              </template>
            </BodyCard>
            <BodyCard type=2 :data="roomInfo_body_table2">
              <!-- <template #btn>
                <el-button
                  :style="{height: '80%',margin: 'auto 8px'}"
                  icon="el-icon-plus"
                  size="mini"
                >客户 </el-button>
              </template> -->
            </BodyCard>
          </div>
        </el-drawer>
      </el-card>
    </div>

    <div v-if="!buildId">
      <el-card>
        <None style="padding-top: 100px; height: 400px"></None>
      </el-card>
    </div>
    <el-dialog
      title="添加房间"
      :visible.sync="addRoomShow"
      width="600px"
    >
      <div>
        <ParkForm
          ref="addRoomForm"
          v-if="addRoomShow"
          @onSubmit="fetchAddRoom"
          :formList="$formsLabels.addRoomForm"
          :options="$store.getters.buildListOptions"
          :defaultValue="{}"
          :itemList="[]">
        </ParkForm>
      </div>

    </el-dialog>
    <el-dialog
      title="修改房间信息"
      :visible.sync="modifyShow"
      destroy-on-close
      width="600px"
    >
      <div>
        <ParkForm
          ref="addRoomForm"
          v-if="modifyShow"
          @onSubmit="fetchModifyRoom"
          :formList="$formsLabels.addRoomForm"
          :options="$store.getters.buildListOptions"
          :defaultValue="defaultValue"
          :itemList="[]">
        </ParkForm>
      </div>

    </el-dialog>
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
  props: ['propBuildId'],
  data () {
    return {
      buildId: null,
      showTrueArea: true,
      modifyShow: false,
      buildInfo: {},
      options: [
        {
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
        }
      ],
      value: '',
      fakerList: [
      ],
      colorList: ['#57D1E2', '#46D2A8', '#F1A468', '#626C91', '#dcdcdc'],
      statusList: [
        {
          color: '#57D1E2',
          code: 0,
          str: '在租'
        },
        {
          color: '#46D2A8',
          code: 1,
          str: '待招商'
        },
        {
          color: '#F1A468',
          code: 2,
          str: '自用'
        },
        {
          color: '#626C91',
          code: 3,
          str: '未分配'
        },
        {
          color: '#dcdcdc',
          code: 4,
          str: '锁定'
        }
      ],
      infoBoxData: [],
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
              label: '进驻'
            },
            {
              value: 2,
              label: '退驻'
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
      },
      roomInfoState: false, // 房间信息弹窗
      roomInfo_header: {
        title: '',
        button: [
          {
            name: '编辑',
            icon: '&#xe62a;'
          },
          {
            name: '附件',
            icon: '&#xe655;',
            function: 'click1'
          },
          {
            name: '删除',
            icon: '&#xe7d1;',
            function: 'click1'
          },
          {
            name: '更多',
            icon: '&#xe86d;',
            function: 'click1'
          }
        ]
      },
      roomInfo_info: {
        label: [
          { prop: 'area', label: '面积(㎡)' },
          { prop: 'state', label: '房源状态' },
          // { prop: 'state', label: '招商状态' },
          { prop: 'price', label: '预租单价(元/㎡·天)' },
          { prop: 'room_usage', label: '房源类型' },
          { prop: 'decoration_standard', label: '装修' }
          // { prop: 'tag', label: '表签' }
        ],
        tableData: []
      },
      roomInfo_body_table1: {
        title: '合同信息',
        info: {
          label: [
            { prop: 'company_name', label: '租户' },
            { prop: 'fee_start_ts', label: '计租日' },
            { prop: 'fee_end_ts', label: '结束日' },
            { prop: 'property_unit_price', label: '合同单价' },
            { prop: 'state', label: '状态' }
          ],
          tableData: []
        }
      },
      roomInfo_body_table2: {
        title: '招商信息',
        info: {
          label: [
            { prop: 'contacter', label: '租客' },
            { prop: 'contact', label: '联系电话' },
            { prop: 'state', label: '客户状态' },
            { prop: 'receiver', label: '跟进人员' },
            { prop: 'info_source', label: '招商渠道' },
            { prop: 'memo', label: '备注' }
          ],
          tableData: [
          ]
        }
      },
      addRoomShow: false,
      filterStatus: false,
      filterData: '',
      roomInfo: {},
      defaultValue: {},
      roomParams: {
        area: null

      }
    }
  },
  computed: {
    roomFloor () {
      return this.$store.getters.roomFloor
    }
  },
  watch: {
    'propBuildId' (newData, oldData) {
      this.buildId = newData
      this.fetchRoomList()
      // this.fetchBuildList()
      this.fetchBuildingInfo()
    },
    buildId () {
      // this.fetchBuildingInfo()
    }
  },
  methods: {
    getState (value) {
      this.state = value
    },
    random (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    // roomInfo (id) {
    //   this.roomInfoState = true
    //   // console.log(id.index,id.subIndex);
    //   this.roomInfo_header.title = id.index + '楼00' + id.subIndex + '室'
    // },
    handleRoomClick (room) {
      this.roomInfoState = true
      this.roomInfo = room
      this.fetchRoomInfo().then(res => {
        if (res.code === 1000) {
          let data = res
          this.roomInfo_header.title = data.floor + '/' + data.name
          this.roomInfo_info.tableData = []
          this.roomInfo_info.tableData.push({ ...data })
        } else {
          this.$message.error('获取房间详情失败')
        }
      })
      this.$https.post(this.$urls.contract.get_list_by_room, {
        page_size: 999,
        page_no: 1,
        room_id: this.roomInfo.domain_id
      }).then(res => {
        if (res.code === 1000) {
          this.roomInfo_body_table1.info.tableData = []
          this.roomInfo_body_table1.info.tableData = res.list
        }
      })
      this.$https.post(this.$urls.customer.get_info, { room_id: this.roomInfo.domain_id }).then(res => {
        if (res.code === 1000) {
          let data = res
          this.roomInfo_body_table2.info.tableData = []
          this.roomInfo_body_table2.info.tableData.push({ ...data })
        }
      })
    },
    handleSelect (data, type) {
      if (type === 'area') {
      }
    },
    open (i) {
      if (i === '编辑') {
        // this.modifyShow = true
        this.fetchRoomInfo().then(res => {
          if (res.code === 1000) {
            this.defaultValue = res
            this.modifyShow = true
          }
        })
      }
      if (i === '删除') {
        this.fetchDelRoom()
      }
    },
    goBack () {
      this.$router.go(-1) // 后退
    },
    handleStatusClick (data) {
      this.filterStatus = !this.filterStatus
      this.filterData = data
      this.filterRoomColorByState()
    },
    filterRoomColorByState (room) {
      if (!room) return 'yellow'
      if (!this.filterStatus) {
        return this.statusList[room.state].color
      } else {
        if (this.filterData.code === room.state) {
          return this.statusList[room.state].color
        } else {
          return '#dcdcdc'
        }
      }
    },
    fetchModifyRoom (data) {
      this.$https.post(this.$urls.room.modify, {
        domain_id: this.roomInfo.domain_id,
        ...data
      }).then(res => {
        if (res.code === 1000) {
          this.$message.success('修改成功')
          this.fetchRoomList()
          this.modifyShow = false
        }
      })
    },
    fetchRoomInfo () {
      return new Promise((resolve, reject) => {
        this.$https.post(this.$urls.room.get_info, {
          domain_id: this.roomInfo.domain_id
        }).then(res => {
          resolve(res)
        })
      })
    },
    fetchDelRoom () {
      this.$https.post(this.$urls.room.remove, {
        domain_id: this.roomInfo.domain_id
      }).then(res => {
        if (res.code === 1000) {
          this.$message.success('删除成功')
          this.fetchRoomList()
        } else {
          this.$message.warning('删除失败')
        }
      })
    },
    fetchRoomList () {
      if (!this.buildId) {

      } else {
        let params = {
          pid: this.buildId,
          page_no: 1,
          page_size: 20
        }
        this.$store.dispatch('getRoomList', params)
      }
    },
    fetchBuildList () {
      this.$store.dispatch('getBuildList', {
        pid: this.$utils.storageGet('activePark').domain_id,
        page_no: 1,
        page_size: 20
      })
    },
    fetchBuildingInfo () {
      let buildId = this.buildId
      this.$https.post(this.$urls.building.info, {
        building_id: buildId
      }).then(res => {
        let data = res
        this.buildInfo = data
        this.infoBoxData = [
          {
            type: 0,
            title: { name: '管理面积', note: '测试文本' },
            value: { value: data.total_area, unit: '㎡', chart: null },
            subtitle: { name: '总房源数量', value: data.total_rooms, unit: '间' }
          },
          {
            type: 'num',
            title: { name: '出租率', note: '测试文本' },
            value: { value: data.rent_rate, unit: '%', chart: Number(data.rent_change_rate) || 0 },
            subtitle: { name: '本月签约面积', value: data.month_area, unit: '㎡' }
          },
          {
            type: 'num',
            title: { name: '在租实时均价', note: '测试文本' },
            value: { value: data.avg_unit_price, unit: '元/㎡·天', chart: Number(data.avg_unit_price_rate) || 0 },
            subtitle: { name: '本月签约均价', value: data.month_area_avg_price, unit: '元/㎡·天' }
          },
          {
            type: 0,
            title: { name: '可招商面积', note: '测试文本' },
            value: { value: data.rent_area, unit: '㎡', chart: null },
            subtitle: { name: '可招商房间', value: data.rent_rooms, unit: '间' }
          },
          {
            type: 'chart',
            title: { name: '当前计租率', note: '测试文本' },
            value: { value: data.pay_rate, unit: '%', chart: data.pay_rate },
            subtitle: { name: '预计全年计租率', value: Number(data.year_pay_rate).toFixed(2) * 100, unit: '%' }
          }
        ]
      })
    },
    fetchAddRoom (data) {
      this.$store.dispatch('addRoom', data).then(res => {
        if (res.code === 1000) {
          this.$message.success('新增成功')
          this.addRoomShow = false
          this.$refs.addRoomForm.resetForm()
          this.fetchRoomList()
        }
      })
    }
  },
  mounted () {
    this.buildId = this.propBuildId
    this.fetchBuildingInfo()
    this.fetchRoomList()
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
    .top-card-wrap{
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
    }
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
            padding: 0 12px;
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
