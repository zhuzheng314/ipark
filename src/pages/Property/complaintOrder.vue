<template>
  <div>
    <el-card style="width: 100%">
      <div slot="header">
        <el-select
        size="small"
        v-model="value1"
        clearable
        @change="fetchListSearch"
        placeholder="工单状态">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <el-input
          placeholder="搜索工单"
          clearable
          @change="fetchListSearch"
          size="small"
          style="width: 220px; margin-left: 15px"
          prefix-icon="el-icon-search"
          v-model="value2">
        </el-input>

        <el-button
          style="float: right"
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="handleAddContract"
        >投诉</el-button>
      </div>
      <div>
        <div>
          <Comparison
            :type="item.type"
            :key="item.name"
            v-for="item in finData"
            :data="{name: item.name, value: item.value, chart: item.chart}"></Comparison>
        </div>
      </div>

    </el-card>
    <el-card>
      <GTable
        @row-click="workOrderState"
        @current-change="handlePageClick"
        @prev-click="handlePageClick"
        @next-click="handlePageClick"
        :page="page"
        :tableLabel="$tableLabels.complaintList"
        :tableData="tableData">
      </GTable>
    </el-card>

    <el-dialog
      title="新建投诉工单"
      :visible.sync="addVisible"
      width="600px"
      :before-close="handleClose">
      <div>
        <ParkForm
        @onSubmit="fetchAdd"
        :formList="$formsLabels.complaintForm"
        v-if="addVisible"
        :options="$store.getters.complaintListOptions"
        :defaultValue="{}"
        :itemList="[]"
        ></ParkForm>
      </div>
    </el-dialog>
    <el-dialog
      title="修改投诉工单"
      :visible.sync="modifyVisible"
      width="600px"
      :before-close="handleClose">
      <div>
        <ParkForm
        @onSubmit="fetchAdd"
        :formList="$formsLabels.complaintForm"
        v-if="addVisible"
        :options="$store.getters.complaintListOptions"
        :defaultValue="{}"
        :itemList="[]"
        ></ParkForm>
      </div>
    </el-dialog>
<!--      工单详情-->
      <el-drawer
      title="工单详情"
      custom-class="drawer-r"
      :visible.sync="InfoState"
      size="1186px"
      direction="rtl">
      <HeaderCard :data="workOrderInfo_header">
        <template #headerCardBtns>
          <div class="btnBox" v-for="(item,i) in workOrderInfo_header.button" :key="(item,i)" @click="open(item.name)">
            <i class="iconfont" v-html="item.icon"></i>
            <span class="headerCard-btn-name">{{item.name}}</span>
          </div>
        </template>
      </HeaderCard>
      <!-- <HeaderInfo type=1 :data="workOrderInfo_info"></HeaderInfo> -->
      <div class="drawer-body" style="height: 700px;">
        <BodyCard type=1 :data="workOrderInfo_body1"></BodyCard>
        <BodyCard type=1 :data="workOrderInfo_body2"></BodyCard>
        <BodyCard type=3 :data="workOrderInfo_body3"></BodyCard>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import ParkForm from '@/components/ParkForm/index.vue'
import ElCard from 'element-ui/packages/card/src/main'
export default {
  name: 'index',
  components: {
    ElCard,
    ParkForm
  },
  data () {
    return {
      tableData: [],
      activeName: 'first',
      yearList: [
      ],
      options: [
        {
          value: 0,
          label: '全部'
        }, {
          value: 1,
          label: '维修'
        }, {
          value: 2,
          label: '保洁'
        }, {
          value: 3,
          label: '报事'
        }, {
          value: 4,
          label: '投诉'
        }],
      options2: [
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: '已解决'
        }, {
          value: 2,
          label: '待解决'
        }
      ],
      value1: '',
      value2: '',
      addVisible: false,
      tamplateFormList: [
        {
          type: 'select',
          label: '模板类型',
          key: 'tamplate',
          placeholder: '请输入',
          rule: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          options: [
            {
              label: '美食',
              value: 's1'
            }, {
              label: '美食美食',
              value: 's2'
            }
          ]
        }, {
          type: 'input',
          label: '模板名称',
          key: 'i',
          placeholder: '请输入',
          rule: [
            { required: true, message: '请输入模板名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        }, {
          type: 'textarea',
          label: '模板描述',
          key: 'i11',
          placeholder: '请输入模板描述',
          rule: [
            { required: true, message: '请输入模板描述', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        }, {
          type: 'upload',
          label: '模板描述',
          key: 'i11',
          placeholder: '请输入模板描述',
          rule: [
            { required: true, message: '请输入模板描述', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        }
      ],
      InfoState: false,
      id: '',
      workOrderInfo_header: {
        title: '维修工单',
        button: [
          {
            name: '编辑',
            icon: '&#xe62a;'
          },
          {
            name: '删除',
            icon: '&#xe7d1;'
          }
        ]
      },
      workOrderInfo_body1: {
        title: '工单信息',
        info: [
          { name: '工单类型', value: '维修工单' },
          { name: '发起人', value: '王丽华' },
          { name: '工单号', value: '5465489518XX' },
          { name: '工单摘要', value: '门窗维修' },
          { name: '工单状态', value: '已维修' },
          { name: '预约时间', value: '2019-10-20' }
        ]
      },
      workOrderInfo_body2: {
        title: '所属资产',
        info: [
          { name: '楼宇名称', value: 'XXX1' },
          { name: '楼层', value: '三楼' },
          { name: '房间号', value: 'A304' }
        ]
      },
      workOrderInfo_body3: {
        title: '工单评价',
        info: '无'
      },
      finData: [
        { name: '已解决', value: '254235', chart: '-0.1128', type: 'arrow' },
        { name: '待解决', value: 13453, chart: '0.3432', type: 'arrow' },
        { name: '完成率', value: 13513, chart: '0.6356', type: 'arrow' },
        { name: '满意度', value: '134553', chart: '0.3564', type: 'arrow' }
      ],
      defaultValue: {
        contact: '15895642356',
        contacter: '金',
        create_ts: '2019-12-30T16:00:00.000Z',
        demand_area: 1,
        demand_ts: '2019-12-30T16:00:00.000Z',
        email: '',
        info_source: 0,
        memo: '',
        name: '客户丙',
        receiver: '金',
        room: [[17, 21, 23]],
        state: 0,
        status: 0,
        work_station: 2
      },
      page: {
        page_no: 1,
        total: 0,
        page_size: 5
      }

    }
  },
  methods: {
    handleAddContract () {
      this.addVisible = true
    },
    workOrderState (row) {
      this.id = row.complaint_code
      this.fetchGetInfo(this.id)
      this.InfoState = true
    },
    open (i) {
      if (i === '编辑') {
        // this.modifyShow = true
        // this.fetchModify(this.id)
      }
      if (i === '删除') {
        this.fetchRemove(this.id)
      }
    },
    fetchAdd (data) { // 添加投诉工单
      let params = {
        ...data
      }
      // params.domain_id = params.domain_id[0]
      this.$https.post(this.$urls.complaint.add, params)
        .then(res => {
          if (res.code === 1000) {
            this.fetchList()
            this.addVisible = false
            this.$message.success('添加成功')
          } else {
            this.$message.error('添加失败')
          }
        })
    },
    fetchRemove (id) { // 删除投诉工单
      let params = {
        complaint_code: id
      }
      this.$https.post(this.$urls.complaint.remove, params).then((res) => {
        if (res.code === 1000) {
          this.fetchList()
          this.InfoState = false
          this.$message.success('删除成功')
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    fetchModify (id) { // 修改投诉工单
      let params = {
        id: id
      }
      this.$https.post(this.$urls.complaint.modify, params).then((res) => {
        this.$message(`${res.msg}`)
      })
    },
    fetchInfo () { // 获取投诉工单统计信息
      let params = {
        id: this.parkId
      }
      this.$https.post(this.$urls.complaint.info, params).then((res) => {
        // console.log(res)
        this.tableData = res.list
        let data = res.data
        this.finData.forEach(v => {
          v.value = data[v.key]
          v.chart = data[v.key + '_rate']
        })
      })
    },
    fetchList () { // 获取投诉工单列表
      let params = {
        ...this.page,
        park_id: this.$store.state.form.activePark.domain_id
      }
      this.$https.post(this.$urls.complaint.get_list, params).then((res) => {
        // console.log(res)
        this.page.total = res.total
        this.tableData = res.list
      })
    },
    fetchListSearch () {
      this.page.page_no = 1
      this.fetchList()
    },
    fetchGetInfo (id) { // 获取投诉工单信息
      let params = {
        customer_id: id
      }
      // this.$message(`${id}`)
      this.$https.post(this.$urls.complaint.get_info, params).then((res) => {
        // console.log(res)
      })
    },
    handlePageClick (num) { // 点击页码时
      this.page.page_no = num
      this.fetchList()
    }
  },
  created () {
    this.fetchList()
    // console.log(this.yearList)
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
  .el-card{
    margin-bottom: 20px;
  }
</style>
