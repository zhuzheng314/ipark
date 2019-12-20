<template>
  <div>
    <el-card style="width: 100%">
<!--      <div slot="header">-->
<!--        <el-select-->
<!--        size="small"-->
<!--        v-model="work_state"-->
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
<!--        >报修</el-button>-->
<!--      </div>-->
      <div>
        <Comparison
          :type="item.type"
          :key="item.name"
          v-for="item in infoData"
          :data="{name: item.name, value: item.value, chart: item.chart}"></Comparison>
      </div>
    </el-card>
    <el-card>
      <div slot="header">
        <el-select
          size="small"
          v-model="work_state"
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
        >报修</el-button>
      </div>
      <GTable
        @row-click="workOrderState"
        @current-change="handlePageClick"
        @prev-click="handlePageClick"
        @next-click="handlePageClick"
        :page="page"
        :tableLabel="$tableLabels.repairList"
        :tableData="tableData">
      </GTable>
    </el-card>

    <el-dialog
      title="维修工单"
      :visible.sync="addVisible"
      width="600px"
      v-if="addVisible"
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
        @onSubmit="fetchAdd"
        @onCancel="addVisible = false"
        :formList="$formsLabels.repairForm"
        :itemList="[]"
        :options="$store.getters.repairListOptions"
        :defaultValue="addDefaultValue"
        ></ParkForm>
      </div>
    </el-dialog>
    <el-dialog
      title="修改维修工单"
      :visible.sync="modifyVisible"
      width="600px"
      v-if="modifyVisible"
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
        @onCancel="() => {this.modifyVisible = false}"
        :formList="$formsLabels.repairForm"
        :itemList="[]"
        :options="$store.getters.repairListOptions"
        :defaultValue="defaultValue"
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
      <div class="drawer-body" :style="{height: bodyHeight}">
        <BodyCard type=1 :data="workOrderInfo_body1"></BodyCard>
        <BodyCard type='img' :data="{
          title: '图片详情',
          ...workOrderInfo
        }"></BodyCard>
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
  watch: {
    InfoState () {
      if (this.InfoState) {
        this.$nextTick(() => {
          this.bodyHeight = this.$utils.dialogHeight()
        })
      }
    }
  },
  data () {
    return {
      bodyHeight: 0,
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
        }, {
          value: 1,
          label: '已解决'
        }, {
          value: 2,
          label: '待解决'
        }
      ],
      work_state: '',
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
      workOrderInfo_header: {
        title: '维修工单',
        button: [
          {
            name: '完成',
            icon: '&#xe7d1;'
          },
          {
            name: '编辑',
            icon: '&#xe62a;'
          },
          {
            name: '删除',
            icon: '&#xe64a;',
            function: 'click1'
          }
        ],
        data: {}
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
      infoData: [],
      addDefaultValue: {
        repair_state: 316
      },
      defaultValue: {
        // attached: { upload: [{ name: 'hotSearchBox.png', url: '1575471117333/d3d90bd06b6535541c17e138f8cdc838.png' }] },
        // contact: 13333333333,
        // customer: '金',
        // describe: '..',
        // domain_id: [3],
        // originator: 10,
        // reserve_ts: '2019-12-11T16:00:00.000Z'
      },
      page: {
        page_no: 1,
        total: 0,
        page_size: 5
      },
      workOrderInfo: {}
    }
  },
  methods: {
    handleAddContract () {
      this.addVisible = true
    },
    workOrderState (data) { // 显示客户详情
      this.id = data.repair_code
      this.fetchGetInfo(this.id)
      this.InfoState = true
    },
    open (i) {
      if (i === '完成') {
        this.fetchFinish()
      }
      if (i === '编辑') {
        this.InfoState = false
        this.$utils.timeOut(this.fetchGetBack)
      }
      if (i === '删除') {
        this.fetchRemove(this.id)
      }
    },
    fetchAdd (data) { // 添加报修工单
      let params = {
        ...data
      }
      // params.domain_id = params.domain_id[0]
      this.$https.post(this.$urls.repair.add, params)
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
    fetchRemove (id) { // 删除报修工单
      this.$confirm('此操作将永久删除该工单, 是否继续?', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        let params = {
          repair_code: id
        }
        this.$https.post(this.$urls.repair.remove, params).then((res) => {
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
    fetchModify (data) { // 修改报修工单
      let params = {
        ...data,
        repair_code: this.id
      }
      this.$https.post(this.$urls.repair.modify, params).then((res) => {
        if (res.code === 1000) {
          this.$message.success('修改成功')
          this.fetchList()
          this.modifyVisible = false
        } else {
          this.$message.error('修改失败')
        }
      })
    },
    fetchInfo () { // 获取报修工单统计信息
      let params = {
        park_id: this.$store.state.form.activePark.domain_id
      }
      this.$https.post(this.$urls.repair.info, params).then((res) => {
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
    fetchList () { // 获取报修工单列表
      let params = {
        ...this.page,
        park_id: this.$store.state.form.activePark.domain_id,
        repair_state: this.work_state
      }
      this.$https.post(this.$urls.repair.get_list, params).then((res) => {
        // console.log(res)
        let list = res.list
        let params = ['repair_state']
        this.$dictionary.tableData(list, params)
        let stateList = {
          repair_state: {
            '未解决': 'danger'
          }
        }
        this.$utils.tagState(list, stateList)
        this.page.total = res.total
        this.tableData = []
        this.tableData = res.list
      })
    },
    fetchListSearch () {
      this.page.page_no = 1
      this.fetchList()
    },
    fetchGetInfo (id) { // 获取报修工单信息
      let params = {
        repair_code: id
      }
      // this.$message(`${id}`)
      this.$https.post(this.$urls.repair.get_info, params).then((res) => {
        let data = res
        this.workOrderInfo = res
        data.repair_state = this.$store.getters.getDicById(data.repair_state)
        this.workOrderInfo_body1.info = [
          { name: '工单类型', value: '维修工单' },
          { name: '发起人', value: data.originator },
          { name: '工单号', value: data.repair_code },
          { name: '工单摘要', value: data.describe },
          { name: '工单状态', value: data.repair_state },
          { name: '预约时间', value: data.reserve_ts }
        ]
        this.workOrderInfo_body2.info = [
          { name: '楼宇名称', value: data.park_name },
          { name: '楼层', value: data.building_name },
          { name: '房间号', value: data.name }
        ]
        this.workOrderInfo_body3.info = data.evaluate
      })
    },
    fetchGetBack () {
      let params = {
        repair_code: this.id
      }
      this.$https.post(this.$urls.repair.get_back, params).then(res => {
        if (res.code === 1000) {
          let data = res
          this.defaultValue = data
          // this.defaultValue.customer_id = 10
          this.modifyVisible = true
        } else {
          this.$message.error('获取信息失败')
        }
      })
    },
    fetchFinish () {
      let params = {
        repair_code: this.id
      }
      this.$https.post(this.$urls.repair.get_back, params).then(res => {
        if (res.code === 1000) {
          let data = res
          this.$confirm('该工单已解决?', '提示', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(() => {
            let params = {
              ...data,
              repair_code: this.id,
              repair_state: 314
            }
            this.$https.post(this.$urls.repair.modify, params).then((res) => {
              if (res.code === 1000) {
                this.$message.success('操作成功')
                this.fetchList()
                this.InfoState = false
              } else {
                this.$message.error('操作失败')
              }
            })
          })
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
    this.$store.dispatch('getParkTreeList')
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
  .el-card{
    margin-bottom: 20px;
  }
</style>
