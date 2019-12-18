<template>
  <div>
    <el-card style="width: 100%">
<!--      <div slot="header">-->
<!--        <el-select-->
<!--        size="small"-->
<!--        v-model="value1"-->
<!--        clearable-->
<!--        @change="fetchListSearch"-->
<!--        placeholder="工单状态">-->
<!--          <el-option-->
<!--            v-for="item in this.$store.state.dictionary.dictionaryType['work_state']"-->
<!--            :key="item.value"-->
<!--            :label="item.label"-->
<!--            :value="item.value">-->
<!--          </el-option>-->
<!--        </el-select>-->

<!--        <el-input-->
<!--          placeholder="搜索工单"-->
<!--          clearable-->
<!--          @change="fetchListSearch"-->
<!--          size="small"-->
<!--          style="width: 220px; margin-left: 15px"-->
<!--          prefix-icon="el-icon-search"-->
<!--          v-model="value2">-->
<!--        </el-input>-->

<!--        <el-button-->
<!--          style="float: right"-->
<!--          type="primary"-->
<!--          icon="el-icon-plus"-->
<!--          size="small"-->
<!--          @click="handleAddContract"-->
<!--        >投诉</el-button>-->
<!--      </div>-->
      <div>
        <div>
          <Comparison
            :type="item.type"
            :key="item.name"
            v-for="item in infoData"
            :data="{name: item.name, value: item.value, chart: item.chart}"></Comparison>
        </div>
      </div>

    </el-card>
    <el-card>
      <div slot="header">
        <el-select
          size="small"
          v-model="value1"
          clearable
          @change="fetchListSearch"
          placeholder="工单状态">
          <el-option
            v-for="item in this.$store.state.dictionary.dictionaryType['work_state']"
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
      :before-close="(done) => {
         this.$confirm('表单尚未提交确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        }"
      title="新建投诉工单"
      v-if="addVisible"
      :visible.sync="addVisible"
      width="600px"
      >
      <div>
        <ParkForm
        @onSubmit="fetchAdd"
        @onCancel="addVisible = false"
        :formList="$formsLabels.complaintForm"
        :options="$store.getters.complaintListOptions"
        :defaultValue="addDefaultValue"
        :itemList="[]"
        ></ParkForm>
      </div>
    </el-dialog>
    <el-dialog
      title="修改投诉工单"
      :visible.sync="modifyVisible"
      v-if="modifyVisible"
      width="600px"
      :before-close="(done) => {
         this.$confirm('表单尚未提交确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        }"
      >
      <div>
        <ParkForm
        @onSubmit="fetchModify"
        :formList="$formsLabels.complaintForm"
        :options="$store.getters.complaintListOptions"
        :defaultValue="defaultValue"
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
        <BodyCard type='img' :data="{
          title: '图片详情',
          ...workOrderInfo
        }"></BodyCard>
        <!-- <BodyCard type=1 :data="workOrderInfo_body2"></BodyCard> -->
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
      modifyVisible: false,
      id: '',
      workOrderInfo_header: {
        title: '投诉工单',
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
          { name: '工单类型', value: '-' },
          { name: '发起人', value: '-' },
          { name: '工单号', value: '-' },
          { name: '工单摘要', value: '-' },
          { name: '工单状态', value: '-' },
          { name: '预约时间', value: '-' }
        ]
      },
      workOrderInfo_body2: {
        title: '所属资产',
        info: [
          { name: '楼宇名称', value: '-' },
          { name: '楼层', value: '-' },
          { name: '房间号', value: '-' }
        ]
      },
      workOrderInfo_body3: {
        title: '工单评价',
        info: '无'
      },
      workOrderInfo: {},
      infoData: [],
      addDefaultValue: {
        complaint_state: 316
      },
      defaultValue: {},
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
        this.InfoState = false
        this.fetchGetBack()
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
      this.$confirm('此操作将永久删除该工单, 是否继续?', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
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
      })
    },
    fetchModify (data) { // 修改投诉工单
      let params = {
        ...data,
        complaint_code: this.id
      }
      this.$https.post(this.$urls.complaint.modify, params).then((res) => {
        if (res.code === 1000) {
          this.$message.success('修改成功')
          this.modifyVisible = false
        } else {
          this.$message.error('修改失败')
        }
      })
    },
    fetchInfo () { // 获取投诉工单统计信息
      let params = {
        park_id: this.$store.state.form.activePark.domain_id
      }
      this.$https.post(this.$urls.complaint.info, params).then((res) => {
        if (res.code === 1000) {
          this.infoData = []
          this.infoData = [
            { name: '已解决', value: Number(res.resolved), chart: Number(res.resolved_rate), type: 'arrow' },
            { name: '待解决', value: Number(res.unsolved), chart: Number(res.unsolved_rate), type: 'arrow' },
            { name: '完成率', value: Number(res.complet), chart: Number(res.complet_rate), type: 'arrow' },
            { name: '满意度', value: Number(res.satisfies), chart: Number(res.satisfies_rate), type: 'arrow' }
          ]
        }
      })
    },
    fetchList () { // 获取投诉工单列表
      let params = {
        ...this.page,
        park_id: this.$store.state.form.activePark.domain_id
      }
      this.$https.post(this.$urls.complaint.get_list, params).then((res) => {
        // console.log(res)
        let list = res.list
        let params = ['complaint_state']
        this.$dictionary.tableData(list, params)
        let stateList = {
          complaint_state: {
            '未解决': 'danger'
          }
        }
        this.$utils.tagState(list, stateList)
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
        complaint_code: id
      }
      // this.$message(`${id}`)
      this.workOrderInfo = {}
      this.$https.post(this.$urls.complaint.get_info, params).then((res) => {
        let data = res
        this.workOrderInfo = res
        data.complaint_state = this.$store.getters.getDicById(data.complaint_state)
        this.workOrderInfo_body1.info = [
          { name: '工单类型', value: data.type || '投诉' },
          { name: '发起人', value: data.originator },
          { name: '工单号', value: data.complaint_code },
          { name: '工单摘要', value: data.describe },
          { name: '工单状态', value: data.complaint_state },
          { name: '预约时间', value: data.reserve_ts }
        ]
        this.workOrderInfo_body2.info = [
          { name: '楼宇名称', value: data.park_name },
          { name: '楼层', value: data.building_name },
          { name: '房间号', value: data.name }
        ]
        this.workOrderInfo_body3.info = data.evaluate
        // console.log(res)
      })
    },
    fetchGetBack () {
      let params = {
        complaint_code: this.id
      }
      this.$https.post(this.$urls.complaint.get_back, params).then(res => {
        if (res.code === 1000) {
          let data = res
          this.defaultValue = data
          this.modifyVisible = true
        } else {
          this.$message.error('获取信息失败')
        }
      })
    },
    handlePageClick (num) { // 点击页码时
      this.page.page_no = num
      this.fetchList()
    }
  },
  created () {
    this.fetchList()
    this.fetchInfo()
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
  .el-card{
    margin-bottom: 20px;
  }
</style>
