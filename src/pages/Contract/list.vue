<template>
  <div>
    <el-card style="width: 100%">
      <el-select  size="small"
                  v-model="value1" placeholder="合同状态">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-input
        placeholder="搜索租客"
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
      >新建合同</el-button>
    </el-card>
    <el-card style="margin-bottom: 20px">
      <div slot="header" class="clearfix">
        <span>到期监控图</span>
      </div>
      <div class="chart">
        <v-chart style="width:100%;height: 300px;" :options="barOptions"></v-chart>
      </div>
    </el-card>
    <el-card>
      <GTable
        @row-click="contractState"
        @current-change="handlePageClick"
        @prev-click="handlePageClick"
        @next-click="handlePageClick"
        :page="page"
        :tableLabel="$tableLabels.contractList"
        :tableData="tableData">
      </GTable>
    </el-card>

    <el-dialog
      title="新建合同"
      top="10px"
      width="950px"
      style="overflow-y: scroll"
      :style="{height: dialogHeight + 'px'}"
      :visible.sync="addContractVisible">
      <div>
        <ParkForm
        @onSubmit="fetchAddContract"
        v-if="addContractVisible"
        :formList="$formsLabels.addContractForm"
        :options="$store.getters.contractListOptions"
        :default-value="{}"
        :itemList="[]"
        :defaultValue="defaultValue"
        ></ParkForm>
      </div>
    </el-dialog>
    <el-dialog
      title="修改合同"
      top="10px"
      width="950px"
      style="overflow-y: scroll"
      :style="{height: dialogHeight + 'px'}"
      :visible.sync="modifyVisible">
      <div>
        <ParkForm
        @onSubmit="fetchModify"
        v-if="modifyVisible"
        :formList="$formsLabels.addContractForm"
        :options="$store.getters.contractListOptions"
        :itemList="[]"
        :defaultValue="defaultValue"
        ></ParkForm>
      </div>
    </el-dialog>

<!--  合同详情-->
    <el-drawer
      title="合同详情"
      custom-class="drawer-r"
      :visible.sync="contractInfoState"
      size="1186px"
      direction="rtl">
      <HeaderCard :data="contractInfo_header">
        <template #headerCardBtns>
          <div class="btnBox" v-for="(item,i) in contractInfo_header.button" :key="(item,i)" @click="open(item.name)">
            <i class="iconfont" v-html="item.icon"></i>
            <span class="headerCard-btn-name">{{item.name}}</span>
          </div>
        </template>
        <template #headerCardSlot="data">
          <div style="color: #999;padding: 0 48px;">
            <p>
              <span>合同摘要</span>
              【起租日{{data.slotName.d}}。租赁数{{data.slotName.g}}㎡。首期租赁3月一付。租金单价4元/㎡·天。】
            </p>
            <p>
              <span>最新备注</span>
            </p>
          </div>
        </template>
      </HeaderCard>
      <div class="drawer-body" style="height: 700px;">
        <BodyCard type=1 :data="contractInfo_body_contract"></BodyCard>
        <BodyCard type=1 :data="contractInfo_body_room"></BodyCard>
        <BodyCard type=1 :data="contractInfo_body1"></BodyCard>
        <BodyCard type=1 :data="contractInfo_body2"></BodyCard>
        <BodyCard type=1 :data="contractInfo_body5"></BodyCard>
        <BodyCard type=1 :data="contractInfo_body6"></BodyCard>
        <BodyCard type=1 :data="contractInfo_body7"></BodyCard>
      </div>
    </el-drawer>

<!--    <AddContract></AddContract>-->
  </div>
</template>

<script>
// import AddContract from '../Components/AddContract/index'

export default {
  name: 'index',
  components: {
    // AddContract
  },
  data () {
    return {
      tableData: [],
      activeName: 'first',
      dialogHeight: '',
      yearList: [
      ],
      options: [
        {
          value: '选项1',
          label: '签订'
        }, {
          value: '选项2',
          label: '执行'
        }, {
          value: '选项3',
          label: '到期'
        }, {
          value: '选项4',
          label: '到期未处理'
        }
      ],
      value1: '',
      value2: '',
      addContractVisible: false,
      modifyVisible: false,
      contractInfoState: false,
      id: '',
      contractInfo_header: {
        title: '正常执行',
        button: [
          {
            name: '编辑',
            icon: '&#xe62a;'
          },
          {
            name: '删除',
            icon: '&#xe7d1;',
            function: 'click1'
          }
        ],
        data: {}
      },
      contractInfo_body_contract: { },
      contractInfo_body_room: {
        title: '房源信息',
        info: [
          { name: '园区', value: '西港发展中心' },
          { name: '楼宇', value: '协力大厦' },
          { name: '房号', value: '10层302室' }
        ]
      },
      contractInfo_body1: {
        title: '租客信息',
        info: [
          { name: '租客', value: '拓源网络' },
          { name: '行业', value: '-' },
          { name: '租客联系人', value: '-' },
          { name: '法人', value: '-' },
          { name: '签订人', value: '-' }
        ]
      },
      contractInfo_body2: {
        title: '其他关键信息',
        info: [ ]
      },
      contractInfo_body3: {
        title: '滞纳金',
        info: [
          { name: '滞纳金比例', value: '0.5%/天' },
          { name: '滞纳金上限', value: '1%' }
        ]
      },
      contractInfo_body4: {
        title: '滞纳金',
        info: [
          { name: '滞纳金比例', value: '0.5%/天' },
          { name: '滞纳金上限', value: '1%' }
        ]
      },
      contractInfo_body5: {
        title: '基本条款',
        info: [
          { name: '房源信息', value: '9001' },
          { name: '租赁数', value: '360' }
        ]
      },
      contractInfo_body6: {
        title: '保证金条款',
        info: [
          { name: '保证金类型', value: '租金保证金' },
          { name: '保证金额', value: '10000元' }
        ]
      },
      contractInfo_body7: {
        title: '租期条款',
        info: [
          { name: '开始时间', value: '2019-11-11' },
          { name: '结束时间', value: '2022-11-10' },
          { name: '付款时间', value: '(工作日)15天' },
          { name: '基础单价', value: '3元/㎡·天' },
          { name: '计费类型', value: '按月计费' },
          { name: '租期划分方式', value: '按起始日划分' },
          { name: '天单价换算规则', value: '-' },
          { name: '年天数', value: '365天' },
          { name: '支付类型', value: '3月一付' }
        ]
      },
      publicOptions: {
        color: ['#4a8fcd', '#639ed5', '#8ebde6', '#37add0'],
        grid: {
          left: '80px',
          right: '40px'
        },
        barWidth: '20'
      },
      barOptions: {},
      defaultValue: {
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
      this.addContractVisible = true
    },
    contractState (data) {
      this.id = data.contract_code
      this.contractInfoState = true
      this.contractInfo_header.data = data
      this.contractInfo_body_contract = {
        title: '合同信息',
        info: [
          { name: '合同编号', value: row.c },
          { name: '跟进人', value: '-' },
          { name: '合同租赁数', value: row.g + '㎡' },
          { name: '合同签订日', value: row.d },
          { name: '合同起租日', value: row.e },
          { name: '合同失效日', value: '2017-01-01' },
          { name: '单位保留小数', value: '2' },
          { name: '计算精度', value: '精确计算结果保留两位小数' },
          { name: '原合同失效日', value: '-' },
          { name: '合同标签', value: '-' }

        ]
      }
    },
    handleClose () { },
    open (i) {
      if (i === '编辑') {
        this.fetchGetBack()
      }
      if (i === '删除') {
        this.fetchRemove(this.id)
      }
    },
    fetchAddContract (data) { // 新增合同
      let params = {
        ...data
      }
      this.$https.post(this.$urls.contract.add, params).then(res => {
        if (res.code === 1000) {
          this.fetchList()
          this.addContractVisible = false
          this.$message.success('新增成功')
        } else {
          this.$message.error('新增失败')
        }
      })
    },
    fetchList () { // 获取合同列表
      let params = {
        park_id: this.$store.state.form.activePark.domain_id,
        ...this.page
      }
      this.$https.post(this.$urls.contract.get_list, params).then((res) => {
        console.log(res)
        // this.page.total = res.list.length
        this.tableData = res.list
      })
    },
    fetchRemove (id) { // 删除合同
      let params = {
        contract_code: id
      }
      this.$https.post(this.$urls.contract.remove, params).then((res) => {
        if (res.code === 1000) {
          this.fetchList()
          this.contractInfoState = false
          this.$message.success('删除成功')
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    fetchModify (data) { // 修改合同
      let params = {
        ...data,
        customer_code: this.id
      }
      this.$https.post(this.$urls.contract.modify, params).then(res => {
        if (res.code === 1000) {
          this.$message.success('修改成功')
          this.defaultValue = {}
          this.fetchList()
          this.modifyVisible = false
        } else {
          this.$message.error('修改失败')
        }
      })
    },
    fetchGetBack () {
      let params = {
        contract_code: this.id
      }
      this.$https.post(this.$urls.contract.get_back, params).then(res => {
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
    },
    fetchInfo () {
      let params = {
        park_id: this.$store.state.form.activePark.domain_id
      }
      this.$https.post(this.$urls.contract.info, params).then(res => {
        if (res.code === 1000) {
        }
      })
    }
  },
  created () {
    for (let i = 0; i < 24; i++) {
      this.yearList.push({
        name: 'yue' + i,
        value: (Math.random() * 100)
      })
    }
    this.fetchInfo()
  },
  mounted () {
    this.dialogHeight = document.documentElement.clientHeight
    let xAxisData = []
    let seriesData = []
    this.yearList.forEach(v => {
      xAxisData.push(v.name)
      seriesData.push(v.value)
    })
    this.barOptions = {
      color: this.publicOptions.color,
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} 个'
      },
      grid: {
        top: '20px',
        left: '50px',
        right: '20px'
      },
      xAxis: {
        type: 'category',
        data: xAxisData
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: '到期数量',
        data: seriesData,
        type: 'bar',
        barWidth: this.publicOptions.barWidth
      }]
    }
    // this.fetchAddContract();
    this.fetchList()
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
  .el-card{
    margin-bottom: 20px;
  }
</style>
