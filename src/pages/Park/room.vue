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
            v-model="demand_area"
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
            v-model="contract_term"
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
                background: filterRoomState(subItem).color }">
                  <div class="text">{{subItem.name}}</div>
                  <div class="sub-text" style="margin-bottom: 8px">{{subItem.area}}㎡</div>
                  <div class="sub-text">
                    {{subItem.state === 292 ? subItem.end_ts + '到期' : '-' }}
                    </div>
                  <div class="status">{{filterRoomState(subItem).str}}</div>
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
            <BodyCard type='img' :data="{
              title: '房屋图片',
              ...roomInfo
            }">
              <div slot="img-cont">

              </div>
            </BodyCard>

            <BodyCard type=2 :data="roomInfo_body_table1">
              <template #btn>
                <el-button
                  :style="{height: '80%',margin: 'auto 8px'}"
                  size="mini"
                  @click="addContract"
                >新建合同</el-button>
              </template>
            </BodyCard>
            <BodyCard type=2 :data="roomInfo_body_table2">
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
          @onCancel="() => {this.addRoomShow = false}"
          @onSubmit="fetchAddRoom"
          :formList="$formsLabels.addRoomForm"
          :options="$store.getters.buildListOptions"
          :default-rules="{
            name:  [
              { required: true, message: '该项为必填', trigger: 'blur' },
              {
                validator: validateRoomAdd,
                trigger: ['blur', 'change']
              }
            ]
          }"
          :defaultValue="addRoomDefaultValue"
          :itemList="[]">
        </ParkForm>
      </div>

    </el-dialog>
    <el-dialog
      title="修改房间信息"
      :visible.sync="modifyShow"
      destroy-on-close
      width="600px">
      <div>
        <ParkForm
          ref="addRoomForm"
          v-if="modifyShow"
          @onCancel="modifyShow = false"
          @onSubmit="fetchModifyRoom"
          :formList="$formsLabels.addRoomForm"
          :options="$store.getters.buildListOptions"
          :defaultValue="defaultValue"
          :disabled="disabled"
          :default-rules="{
            name:  [
              { required: true, message: '该项为必填', trigger: 'blur' },
              {
                validator: validateRoomModify,
                trigger: ['blur', 'change']
              }
            ]
          }"
          :itemList="[]">
        </ParkForm>
      </div>
    </el-dialog>
<!-- 新建合同 -->
    <el-dialog
      title="新建合同"
      top="10px"
      width="950px"
      style="overflow-y: scroll"
      :visible.sync="addContractVisible">
      <div>
        <ParkForm
        @onSubmit="fetchAddContract"
        @onCancel="() => {this.addContractVisible = false}"
        v-if="addContractVisible"
        :formList="$formsLabels.addContractForm"
        :options="$store.getters.contractListOptions"
        :default-value="{}"
        :itemList="[]"
        :defaultValue="defaultValueContract"
        ></ParkForm>
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
      value: '',
      fakerList: [
      ],
      colorList: ['#57D1E2', '#46D2A8', '#F1A468', '#626C91', '#dcdcdc'],
      statusList: [
        {
          color: '#57D1E2',
          code: 292,
          str: '在租'
        },
        {
          color: '#46D2A8',
          code: 294,
          str: '待招商'
        },
        {
          color: '#F1A468',
          code: 429,
          str: '自用'
        },
        {
          color: '#626C91',
          code: 293,
          str: '未分配'
        },
        {
          color: '#dcdcdc',
          code: 432,
          str: '锁定'
        }
      ],
      infoBoxData: [],
      demand_area: '',
      contract_term: '',
      roomInfoState: false, // 房间信息弹窗
      addContractVisible: false,
      roomInfo_header: {
        title: '',
        button: [
          {
            name: '修改房间',
            icon: '&#xe62a;'
          },
          {
            name: '删除',
            icon: '&#xe7d1;'
          }
        ]
      },
      roomInfo_info: {
        label: [
          { prop: 'area', label: '面积(㎡)' },
          { prop: 'state', label: '房源状态' },
          // { prop: 'state', label: '招商状态' },
          { prop: 'price', label: '出租单价(元/㎡·天)' }
        ],
        tableData: []
      },
      roomInfo_body_table1: {
        title: '合同信息',
        info: {
          label: [
            { prop: 'contract_code', label: '合同编号' },
            { prop: 'room', label: '楼宇/房间号' },
            { prop: 'rent_area', label: '租赁面积' },
            { prop: 'fee_start_ts', label: '开始日' },
            { prop: 'fee_end_ts', label: '结束日' },
            { prop: 'unit_price', label: '合同单价' },
            { prop: 'state', label: '状态' },
            { prop: 'contacter', label: '联系人' },
            { prop: 'contact', label: '联系人电话' }
          ],
          tableData: []
        }
      },
      roomInfo_body_table2: {
        title: '企业信息',
        info: {
          label: [
            { prop: 'contacter', label: '企业' },
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
      disabled: {},
      defaultValueContract: {},
      addRoomDefaultValue: {},
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
      this.addRoomDefaultValue = {
        pid: this.buildId
      }
      // this.fetchBuildingInfo()
    },
    modifyShow () {
      if (!this.modifyShow) {
        this.disabled = {} // 清空修改房间disabled
      }
    }
  },
  methods: {
    validateRoomAdd (rule, value, callback) {
      console.log('add')
      return this.$store.dispatch(
        'validateRoomName',
        { check_name: value, pid: this.buildId }).then(res => {
        if (res.list.length && value === '') {
          callback(new Error('该项为必填'))
        } else if (res.list.length) {
          callback(new Error('该名称已存在'))
        } else {
          callback()
        }
      })
    },
    validateRoomModify (rule, value, callback) {
      return this.$store.dispatch(
        'validateRoomName',
        { check_name: value, pid: this.buildId }).then(res => {
        if (res.list.length && value === '') {
          callback(new Error('该项为必填'))
        } else if (res.list.length) {
          let canEdit = false
          res.list.forEach(item => {
            if (item.domain_id === this.roomInfo.domain_id) {
              canEdit = true
            }
          })
          if (canEdit) {
            callback()
          } else {
            callback(new Error('该名称已存在'))
          }
        } else {
          callback()
        }
      })
    },
    addContract () { // 打开添加合同表单
      this.defaultValueContract = {
        room: [this.roomInfo.domain_id]
      }
      this.addContractVisible = true
    },
    fetchAddContract (data) { // 新增合同
      let params = {
        ...data
      }
      this.$https.post(this.$urls.contract.add, params).then(res => {
        if (res.code === 1000) {
          this.handleRoomClick(this.roomInfo)
          this.addContractVisible = false
          this.$message.success('新增成功')
        } else {
          this.$message.error('新增失败')
        }
      })
    },
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
          data.state = this.$store.getters.getDicById(data.state)
          this.roomInfo_header.title = data.floor + '-' + data.name
          this.roomInfo_info.tableData = []
          this.roomInfo_info.tableData.push({ ...data })
        } else {
          // this.$message.error('获取房间详情失败')
        }
      })
      this.$https.post(this.$urls.contract.get_list_by_room, {
        page_size: 999,
        page_no: 1,
        room_id: this.roomInfo.domain_id
      }).then(res => {
        this.roomInfo_body_table1.info.tableData = []
        if (res.code === 1000) {
          let contractList = res.list
          this.$dictionary.tableData(contractList, ['state'])
          // console.log(contractList)
          this.roomInfo_body_table1.info.tableData = contractList
        }
      })
      this.$https.post(this.$urls.customer.get_info, { room_id: this.roomInfo.domain_id }).then(res => {
        this.roomInfo_body_table2.info.tableData = []
        if (res.code === 1000) {
          let data = [res]
          this.$dictionary.tableData(data, ['info_source', 'state'])
          this.roomInfo_body_table2.info.tableData = data
        }
      })
    },
    handleSelect (data, type) {
      if (type === 'area') {
      }
    },
    open (i) {
      if (i === '修改房间') {
        this.roomInfoState = false
        this.fetchRoomInfo().then(res => {
          if (res.code === 1000) {
            this.defaultValue = res
            if (res.state === 292) { // 房间在租时，状态不可改变
              this.disabled.state = true
            }
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
      // this.filterRoomColorByState()
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
    filterRoomState (room) {
      if (!room) return {}
      let state = {}
      this.statusList.forEach(item => {
        if (item.code === room.state) {
          state = item
        }
      })
      return state
    },
    fetchModifyRoom (data) {
      this.$https.post(this.$urls.room.modify, {
        domain_id: this.roomInfo.domain_id,
        ...data
      }).then(res => {
        if (res.code === 1000) {
          this.$message.success('修改成功')
          this.fetchRoomList()
          this.$store.dispatch('getParkTreeList')
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
      if (this.roomInfo.state !== 292) {
        this.$confirm('此操作将永久删除该房间, 是否继续?', '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.$https.post(this.$urls.room.remove, {
            domain_id: this.roomInfo.domain_id
          }).then(res => {
            if (res.code === 1000) {
              this.$message.success('删除成功')
              this.roomInfoState = false
              this.fetchRoomList()
              this.$store.dispatch('getParkTreeList')
            } else {
              this.$message.warning('删除失败')
            }
          })
        })
      } else {
        this.$message.error('此房间不可删除')
      }
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
            title: { name: '管理面积', note: '管理的总面积' },
            value: { value: data.total_area, unit: '㎡', chart: null },
            subtitle: { name: '总房源数量', value: data.total_rooms, unit: '间' }
          },
          {
            type: 'num',
            title: { name: '出租率', note: '已出租面积占比' },
            value: { value: data.rent_rate, unit: '%', chart: Number(data.rent_change_rate) || 0 },
            subtitle: { name: '本月签约面积', value: data.month_area, unit: '㎡' }
          },
          {
            type: 'num',
            title: { name: '在租实时均价', note: '出租均价' },
            value: { value: data.avg_unit_price, unit: '元/㎡·天', chart: Number(data.avg_unit_price_rate) || 0 },
            subtitle: { name: '本月签约均价', value: data.month_area_avg_price, unit: '元/㎡·天' }
          },
          {
            type: 0,
            title: { name: '可招商面积', note: '可招商面积' },
            value: { value: data.rent_area, unit: '㎡', chart: null },
            subtitle: { name: '可招商房间', value: data.rent_rooms, unit: '间' }
          },
          {
            type: 'chart',
            title: { name: '当前计租率', note: '当前计租房间数量占比' },
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
          this.$store.dispatch('getParkTreeList')
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
