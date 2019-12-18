<template>
  <div>
    <el-card>
      <div slot="header">
        <el-select
          size="small"
          v-model="charge_type"
          clearable
          @change="fetchListSearch"
          placeholder="费用类型"
        >
          <el-option
            v-for="item in this.$store.state.dictionary.dictionaryType['charge_type']"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input
          placeholder="搜索客户名称"
          size="small"
          style="width: 220px; margin-left: 15px"
          prefix-icon="el-icon-search"
          v-model="customer_name"
          clearable
          @change="fetchListSearch"
        ></el-input>
        <el-date-picker
          v-model="date"
          size="small"
          style="margin-left: 15px"
          type="daterange"
          range-separator="至"
          clearable
          @change="fetchListSearch"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-select
          size="small"
          style="margin-left: 15px"
          v-model="overdue"
          clearable
          @change="fetchListSearch"
          placeholder="是否逾期"
        >
          <el-option
            v-for="item in is_overdue"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select
          size="small"
          style="margin-left: 15px"
          v-model="expense_state"
          clearable
          @change="fetchListSearch"
          placeholder="结清状态"
        >
          <el-option
            v-for="item in this.$store.state.dictionary.dictionaryType['expense_state']"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button
          style="float: right"
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="handleAdd"
        >新增费用</el-button>
      </div>
      <div>
        <Comparison
          :type="item.type"
          :key="item.name"
          v-for="item in infoData"
          :data="{name: item.name, value: item.value, chart: item.chart}"
        ></Comparison>
      </div>
    </el-card>
    <el-card>
      <GTable
        @row-click="financialState"
        @current-change="handlePageClick"
        @prev-click="handlePageClick"
        @next-click="handlePageClick"
        :page="page"
        :tableLabel="$tableLabels.expenseList"
        :tableData="tableData"
      >
        <template #renderButton="data">
          <span>
            <el-button type="text" @click.stop="handleReceipt(data.slotName)">收款</el-button>
            <el-button type="text" @click.stop="handleSettle(data.slotName)">结清</el-button>
          </span>
        </template>
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
      title="新建费用账单"
      :visible.sync="addVisible"
      v-if="addVisible"
      width="600px">
      <div>
        <ParkForm
          @onChange="formActive"
          @onSubmit="fetchAdd"
          @onCancel="() => {this.addVisible = false}"
          :defaultHidden="defaultHidden"
          :formList="expenseForm"
          :options="{
            ...this.$store.getters.expenseListOptions,
            record_room: formOptions.record_room,
          }"
          :defaultValue="addDefaultValue"
          :default-disabled="{
            create_ts: true,
            updater: true
          }"
          :itemList="[]"
        ></ParkForm>
      </div>
    </el-dialog>
    <el-dialog
      :before-close="(done) => {
         this.$confirm('表单尚未提交确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        }"
      title="修改费用账单"
      :visible.sync="modifyVisible"
      v-if="modifyVisible"
      width="600px">
      <div>
        <ParkForm
          @onSubmit="fetchModify"
          @onCancel="() => {this.modifyVisible = false}"
          :defaultHidden="defaultHidden"
          :formList="expenseForm"
          :options="{
            ...this.$store.getters.expenseListOptions,
            record_room: formOptions.record_room,
          }"
          :defaultValue="defaultValue"
          :default-disabled="{
            type: true,
            customer_id: true,
            create_ts: true,
            updater: true
          }"
          :itemList="[]"
        ></ParkForm>
      </div>
    </el-dialog>
    <!--  账单详情-->
    <el-drawer
      title="账单详情"
      custom-class="drawer-r"
      :visible.sync="InfoState"
      size="1186px"
      direction="rtl"
    >
      <HeaderCard :data="info_header">
        <template #headerCardBtns>
          <div
            class="btnBox"
            v-for="(item,i) in info_header.button"
            :key="(item,i)"
            @click="open(item.name)"
          >
            <i class="iconfont" v-html="item.icon"></i>
            <span class="headerCard-btn-name">{{item.name}}</span>
          </div>
        </template>
      </HeaderCard>
      <HeaderInfo type="1" :data="info_info"></HeaderInfo>
      <div class="drawer-body" style="height: 660px;">
        <BodyCard type="1" :data="info_body_expense"></BodyCard>
        <BodyCard type="2" :data="customerInfo_body_table"></BodyCard>
        <BodyCard type="2" :data="info_body_room"></BodyCard>
        <BodyCard type="2" :data="info_body_water">
          <template #btns="data">
            <el-button type="text" @click="fetchGetBack(data.slotName.expense_code)">编辑</el-button>
          </template>
        </BodyCard>
        <BodyCard type="2" :data="info_body_electric">
          <template #btns="data">
            <el-button type="text" @click="fetchGetBack(data.slotName.expense_code)">编辑</el-button>
          </template>
        </BodyCard>
        <BodyCard type="2" :data="info_body_gas">
          <template #btns="data">
            <el-button type="text" @click="fetchGetBack(data.slotName.expense_code)">编辑</el-button>
          </template>
        </BodyCard>
        <BodyCard type="2" :data="info_body_lease">
          <template #btns="data">
            <el-button type="text" @click="fetchGetBack(data.slotName.expense_code)">编辑</el-button>
          </template>
        </BodyCard>
        <BodyCard type="2" :data="info_body_other"></BodyCard>
      </div>
    </el-drawer>
    <!-- 收款 -->
    <el-dialog
      :before-close="(done) => {
         this.$confirm('表单尚未提交确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        }"
      title="系统提示"
      :visible.sync="visibleReceipt"
      v-if="visibleReceipt"
      width="600px">
      <div class="receipt">
        <span>{{receipt.customer_name}}</span>的
        <span>{{receipt.type}}</span>费用，在
        <span class="time">{{receipt.start_ts}}</span>到
        <span class="time">{{receipt.end_ts}}</span>计费周期内，应收取
        <span class="money">{{receipt.bill_money}}</span>元，已收取
        <span class="money">{{receipt.receive_money}}</span>元。
        <p>
          本次收取金额
          <el-input-number v-model="receiptNum" size="mini" controls-position="right" label="描述文字"></el-input-number>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visibleReceipt = false">取 消</el-button>
        <el-button type="primary" @click="fetchReceipt">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :before-close="(done) => {
         this.$confirm('表单尚未提交确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        }"
      title="系统提示"
      v-if="visibleSettle"
      :visible.sync="visibleSettle"
      width="600px"
      >
      <div class="receipt">
        <span>{{receipt.customer_name}}</span>的
        <span>{{receipt.type}}</span>费用，在
        <span class="time">{{receipt.start_ts}}</span>到
        <span class="time">{{receipt.end_ts}}</span>计费周期内，应收取
        <span class="money">{{receipt.bill_money}}</span>元，已收取
        <span class="money">{{receipt.receive_money}}</span>元。本次收取金额
        <span class="money">{{receipt.bill_money - receipt.receive_money}}</span>元。
        <!-- <p>本次收取金额
        <el-input-number
        v-model="receiptNum"
        size="mini"
        controls-position="right"
        label="描述文字"
        >
        </el-input-number></p>-->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visibleSettle = false">取 消</el-button>
        <el-button type="primary" @click="fetchSettle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ParkForm from '@/components/ParkForm/index.vue'
import ElCard from 'element-ui/packages/card/src/main'
export default {
  name: 'charges',
  components: {
    ElCard,
    ParkForm
  },
  computed: {
    parkId () {
      return this.$store.state.form.activePark.domain_id
    }
  },
  watch: {
    parkId () {
      this.fetchChargeInfo()
    }
  },
  data () {
    return {
      formOptions: {},
      tableData: [],
      activeName: 'first',
      radio: '收款',
      yearList: [],
      infoData: [],
      is_overdue: [
        {
          value: true,
          label: '是'
        },
        {
          value: false,
          label: '否'
        }
      ],
      charge_type: '',
      customer_name: '',
      date: '',
      overdue: '',
      expense_state: '',
      addVisible: false,
      modifyVisible: false,
      InfoState: false,
      visibleReceipt: false,
      visibleSettle: false,
      id: '',
      info_header: {
        title: '客户名称：-',
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
      info_info: {
        label: [
          { prop: 'state', label: '账单状态' },
          { prop: 'type', label: '费用类型' },
          { prop: 'bill_money', label: '付款金额' },
          { prop: 'receive_money', label: '已付金额' },
          { prop: 'overdue_day', label: '逾期天数' },
          { prop: 'pay_date', label: '应付时间' },
          { prop: 'state', label: '结清状态' }
        ],
        tableData: []
      },
      customerInfo_body_table: {
        title: '合同',
        info: {
          label: [
            { prop: 'contract_code', label: '合同编号' },
            { prop: 'rooms', label: '房间号', tags: true },
            { prop: 'rent_area', label: '租赁面积' },
            { prop: 'fee_start_ts', label: '开始日' },
            { prop: 'fee_end_ts', label: '结束日' },
            { prop: 'unit_price', label: '合同单价' },
            { prop: 'state', label: '状态', renderTags: true },
            { prop: 'contacter', label: '联系人' },
            { prop: 'contact', label: '联系人电话' }
          ],
          tableData: []
        }
      },
      info_body_expense: {
        title: '账单信息',
        info: []
      },
      info_body_room: {
        title: '房源信息',
        info: {
          label: [
            { prop: 'park_name', label: '所属园区' },
            { prop: 'building_name', label: '楼宇' },
            { prop: 'name', label: '房间号' },
            { prop: 'area', label: '面积' },
            { prop: 'state', label: '房源状态', renderTags: true }
          ],
          tableData: []
        }
      },
      info_body_water: {
        title: '水费信息',
        info: {
          label: [
            { prop: 'rooms', label: '房间号', tags: true },
            { prop: 'previous_val', label: '期初数' },
            { prop: 'current_val', label: '期末数' },
            { prop: 'create_ts', label: '填单日' },
            { prop: 'updater', label: '操作人' },
            { prop: 'i', label: '操作', renderButton: true }
          ],
          tableData: []
        }
      },
      info_body_electric: {
        title: '电费信息',
        info: {
          label: [
            { prop: 'rooms', label: '房间号', tags: true },
            { prop: 'previous_val', label: '期初数' },
            { prop: 'current_val', label: '期末数' },
            { prop: 'create_ts', label: '填单日' },
            { prop: 'updater', label: '操作人' },
            { prop: 'i', label: '操作', renderButton: true }
          ],
          tableData: []
        }
      },
      info_body_gas: {
        title: '煤气费信息',
        info: {
          label: [
            { prop: 'rooms', label: '房间号', tags: true },
            { prop: 'previous_val', label: '期初数' },
            { prop: 'current_val', label: '期末数' },
            { prop: 'create_ts', label: '填单日' },
            { prop: 'updater', label: '操作人' },
            { prop: 'i', label: '操作', renderButton: true }
          ],
          tableData: []
        }
      },
      info_body_lease: {
        title: '租赁信息',
        info: {
          label: [
            { prop: 'rental', label: '租赁物' },
            { prop: 'start_ts', label: '开始日期' },
            { prop: 'end_ts', label: '结束日期' },
            { prop: 'bill_money', label: '应收金额' },
            { prop: 'receive_money', label: '实收金额' },
            { prop: 'contacter', label: '联系人' },
            { prop: 'contact', label: '联系方式' },
            { prop: 'i', label: '操作', renderButton: true }
          ],
          tableData: []
        }
      },
      info_body_other: {
        title: '其他费用',
        info: {
          label: [
            { prop: 'generate_ts', label: '日期' },
            { prop: 'memo', label: '内容' },
            { prop: 'bill_money', label: '应收金额' },
            { prop: 'receive_money', label: '实收金额' },
            { prop: 'contacter', label: '联系人' },
            { prop: 'contact', label: '联系方式' },
            { prop: 'i', label: '操作', renderButton: true }
          ],
          tableData: []
        }
      },
      addDefaultValue: {
        create_ts: new Date(),
        updater: this.$store.state.form.account || '工作人员'
      },
      defaultValue: {},
      page: {
        page_no: 1,
        total: 0,
        page_size: 5
      },
      receipt: '',
      receiptNum: 0,
      defaultHidden: {},
      expenseForm: [
        {
          title: '账单',
          children: [
            {
              type: 'select',
              label: '费用类型',
              key: 'type',
              placeholder: '请选择费用类型',
              rule: [
                { required: true, message: '请选择费用类型', trigger: 'change' }
              ],
              options: []
            },
            {
              type: 'select',
              label: '客户名称',
              key: 'customer_id',
              placeholder: '请选择客户名称',
              rule: [
                { required: true, message: '请选择客户名称', trigger: 'change' }
              ],
              options: []
            },
            {
              type: 'input',
              label: '联系人',
              key: 'contacter',
              placeholder: '请输入',
              rule: [
                // { required: true, message: '该项为必填', trigger: 'blur' }
                // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '联系方式',
              key: 'contact',
              placeholder: '请输入',
              rule: [
                // { required: true, message: '该项为必填', trigger: 'blur' },
                {
                  pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
                  message: '手机号码格式错误'
                }
              ]
            },
            {
              type: 'date-picker',
              label: '计费周期开始',
              key: 'start_ts',
              placeholder: '请选择',
              rule: [{ required: true, message: '请选择', trigger: 'change' }]
            },
            {
              type: 'date-picker',
              label: '计费周期结束',
              key: 'end_ts',
              placeholder: '请选择',
              rule: [{ required: true, message: '请选择', trigger: 'change' }]
            },
            {
              type: 'cascader',
              label: '房源信息',
              multiple: true, // 是否多选
              key: 'record_room',
              rule: [{ required: true, message: '请选择', trigger: 'change' }],
              options: []
            },
            {
              type: 'input-num',
              label: '期初数',
              key: 'previous_val',
              placeholder: '请输入',
              rule: [{ required: true, message: '请输入', trigger: 'change' }]
            },
            {
              type: 'input-num',
              label: '期末数',
              key: 'current_val',
              placeholder: '请输入',
              rule: [{ required: true, message: '请输入', trigger: 'change' }]
            },
            {
              type: 'input-num',
              label: '应收金额',
              key: 'bill_money',
              placeholder: '请输入',
              rule: [{ required: true, message: '请输入', trigger: 'change' }]
            },
            {
              type: 'date-picker',
              label: '应收日期',
              key: 'pay_date',
              placeholder: '请选择',
              rule: [{ required: true, message: '请选择', trigger: 'change' }]
            },
            {
              type: 'input',
              label: '租赁物',
              key: 'rental',
              placeholder: '请输入租赁物名称',
              rule: [
                { required: true, message: '请输入租赁物名称', trigger: 'blur' }
                // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'textarea',
              label: '内容',
              key: 'memo',
              placeholder: '请输入租赁物名称',
              rule: [
                { required: true, message: '请输入租赁物名称', trigger: 'blur' }
                // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'date-picker',
              label: '日期',
              key: 'generate_ts',
              placeholder: '请选择',
              rule: [{ required: true, message: '请选择', trigger: 'change' }]
            },
            {
              type: 'date-picker',
              label: '填单日',
              key: 'create_ts',
              placeholder: '请选择',
              rule: [{ required: true, message: '请选择', trigger: 'change' }]
            },
            {
              type: 'input',
              label: '操作人',
              key: 'updater',
              placeholder: '请输入操作人名称',
              rule: [
                { required: true, message: '请输入操作人名称', trigger: 'blur' }
                // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    selectType (data) {
      if (data.value === 413 || data.value === 414 || data.value === 458) {
        // 水费 电费 煤气
        this.defaultHidden = {
          rental: true,
          memo: true,
          generate_ts: true
        }
      } else if (data.value === 450 || data.value === 451) {
        // 房租 物业
        this.defaultHidden = {
          rental: true,
          memo: true,
          generate_ts: true,
          previous_val: true,
          current_val: true
        }
      } else if (data.value === 453) {
        // 租赁
        this.defaultHidden = {
          memo: true,
          generate_ts: true,
          previous_val: true,
          current_val: true
        }
      } else if (data.value === 456) {
        // 其他
        this.defaultHidden = {
          rental: true,
          previous_val: true,
          current_val: true
        }
      }
    },
    formActive (data) {
      if (data.key === 'type') {
        this.selectType(data)
      }
      if (data.key === 'customer_id') {
        let customer = this.$store.state.form.customerList
        let obj = {}
        customer.forEach(v => {
          if (v.id === data.value) {
            obj.contacter = v.contacter
            obj.contact = v.contact
          }
        })
        this.addDefaultValue = { ...this.addDefaultValue, ...obj }
        this.buildTreeWithCustomer(data.value)
      }
    },
    buildTreeWithCustomer (data) {
      // 根据客户获取房间树
      this.$https
        .post(this.$urls.park.get_tree_list, {
          page_size: 999,
          page_no: 1,
          customer_id: data
        })
        .then(res => {
          // console.log(res.list);
          let list = res.list
          const filterList = list => {
            return list.map(item => {
              if (!item) {
                return {
                  label: '暂无'
                }
              }
              let children =
                item.children && item.children.length
                  ? filterList(item.children)
                  : null
              return {
                label: item.name,
                value: item.domain_id,
                path: item.path,
                children
              }
            })
          }
          let tree = filterList(list)
          this.formOptions = { record_room: tree }
          // this.$forceUpdate()
        })
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleReceipt (data) {
      // 收款
      this.receipt = {}
      this.visibleReceipt = true
      this.receipt = data
    },
    handleSettle (data) {
      // 结清
      this.receipt = {}
      this.visibleSettle = true
      this.receipt = data
    },
    fetchReceipt () {
      let receipt = this.receipt
      let params = {
        expense_code: receipt.expense_code,
        receive_money: receipt.receive_money + this.receiptNum
      }
      this.$https.post(this.$urls.expense.modify, params).then(res => {
        this.receiptNum = 0
        if (res.code === 1000) {
          this.fetchList()
          this.visibleReceipt = false
          this.$message.success('收款成功')
        } else {
          this.$message.error('收款失败')
        }
      })
    },
    fetchSettle () {
      let receipt = this.receipt
      let params = {
        expense_code: receipt.expense_code,
        receive_money: receipt.bill_money
      }
      this.$https.post(this.$urls.expense.modify, params).then(res => {
        this.receiptNum = 0
        if (res.code === 1000) {
          this.fetchList()
          this.visibleSettle = false
          this.$message.success(
            `已结清${receipt.customer_name}的${receipt.type}费用`
          )
        } else {
          this.$message.error('结清失败')
        }
      })
    },
    handleAdd () {
      this.defaultHidden = {}
      this.formOptions = {}
      this.addDefaultValue.contacter = ''
      this.addDefaultValue.contact = ''
      this.addVisible = true
    },
    financialState (data) {
      this.id = data.expense_code
      this.$https
        .post(this.$urls.contract.get_list, {
          park_id: this.$store.state.form.activePark.domain_id,
          page_no: 1,
          page_size: 999,
          customer_id: data.customer_id
        })
        .then(res => {
          this.info_body_room.info.tableData = []
          this.customerInfo_body_table.info.tableData = []
          if (res.list.length) {
            let roomList = res.list[0].room
            this.$dictionary.tableData(roomList, ['state'])
            this.info_body_room.info.tableData = roomList
            let contractList = res.list
            this.$utils.getRooms(contractList)
            this.$dictionary.tableData(contractList, ['state'])
            this.customerInfo_body_table.info.tableData = contractList
          }
        })
      this.fetchGetInfo(this.id)
      this.fetchGetInfoType(data.customer_id)
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
    fetchAdd (data) {
      // 添加房租费用
      let params = {
        ...data,
        receive_money: 0,
        state: 441
      }
      this.$https.post(this.$urls.expense.add, params).then(res => {
        if (res.code === 1000) {
          this.fetchList()
          this.addVisible = false
          this.$message.success('添加成功')
        } else {
          this.$message.error('添加失败')
        }
      })
    },
    fetchRemove (id) {
      // 删除房租费用
      this.$confirm('此操作将永久删除该费用, 是否继续?', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        let params = {
          expense_code: id
        }
        this.$https.post(this.$urls.expense.remove, params).then(res => {
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
    fetchModify (data) {
      // 修改房租费用
      let params = {
        ...data,
        expense_code: this.id
      }
      this.$https.post(this.$urls.expense.modify, params).then(res => {
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
    fetchInfo () {
      // 获取房租费用统计信息
      let params = {
        park_id: this.$store.state.form.activePark.domain_id,
        type: 413
      }
      this.$https.post(this.$urls.charge.top_info, params).then(res => {
        if (res.code === 1000) {
          this.infoData = [
            {
              typeSelect: 'receive',
              name: `应收(${res.need_receive_num}笔)`,
              value: res.need_receive,
              chart: res.need_receive_rate,
              type: 'arrow'
            },
            {
              typeSelect: 'receive',
              name: `已收(${res.receive_num}笔)`,
              value: res.receive,
              chart: res.receive_rate,
              type: 'chart'
            },
            {
              typeSelect: 'receive',
              name: `未缴(${res.un_receive_num}笔)`,
              value: res.un_receive,
              chart: res.un_receive_rate,
              type: 'chart'
            },
            {
              typeSelect: 'receive',
              name: `水费`,
              value: res.water_fee,
              chart: res.water_fee_rate,
              type: 'arrow'
            },
            {
              typeSelect: 'receive',
              name: `电费`,
              value: res.electric_fee,
              chart: res.electric_fee_rate,
              type: 'arrow'
            },
            {
              typeSelect: 'receive',
              name: `房租`,
              value: res.water_fee,
              chart: res.water_fee_rate,
              type: 'arrow'
            },
            {
              typeSelect: 'receive',
              name: `物业`,
              value: res.water_fee,
              chart: res.water_fee_rate,
              type: 'arrow'
            },
            {
              typeSelect: 'receive',
              name: `租赁`,
              value: res.water_fee,
              chart: res.water_fee_rate,
              type: 'arrow'
            },
            {
              typeSelect: 'receive',
              name: `其他费`,
              value: res.fee,
              chart: res.fee_rate,
              type: 'arrow'
            }
          ]
        }
      })
    },
    fetchGetBack (id = this.id) {
      let params = {
        expense_code: id
      }
      this.$https.post(this.$urls.expense.get_back, params).then(res => {
        if (res.code === 1000) {
          let data = res
          data.value = data.type
          this.selectType(data)
          this.formOptions = {}
          this.buildTreeWithCustomer(data.customer_id)
          this.defaultValue = data
          this.modifyVisible = true
        } else {
          this.$message.error('获取信息失败')
        }
      })
    },
    fetchList () {
      // 获取财房租费用列表
      let params = {
        park_id: this.$store.state.form.activePark.domain_id,
        ...this.page,
        type: this.charge_type,
        customer_name: this.customer_name,
        start_ts: this.date && this.date.length ? this.date[0] : '',
        end_ts: this.date && this.date.length ? this.date[1] : '',
        is_overdue:
          this.overdue === false ? false : this.overdue === true ? true : null,
        state: this.expense_state
      }
      this.$https.post(this.$urls.expense.get_list, params).then(res => {
        let list = []
        if (res.code === 1000) {
          list = res.list
          let params = ['state', 'type']
          this.$dictionary.tableData(list, params)
          this.$utils.getRooms(list)
          this.page.total = res.total
        }
        this.tableData = list
      })
    },
    fetchListSearch () {
      this.page.page_no = 1
      this.fetchList()
    },
    fetchGetInfo (id) {
      // 获取费用信息
      let params = {
        expense_code: id
      }
      this.$https.post(this.$urls.expense.get_info, params).then(res => {
        let data = res
        this.info_info.tableData = []
        this.info_body_expense.info = []
        data.state = this.$store.getters.getDicById(data.state)
        data.type = this.$store.getters.getDicById(data.type)
        this.info_header.title = '客户名称：' + data.customer_name
        this.info_info.tableData.push({ ...data })
        this.info_body_expense.info = [
          { name: '费用编号', value: data.expense_code || '-' },
          { name: '合同编号', value: data.contract_code || '-' },
          { name: '费用类型', value: data.type || '-' },
          { name: '账单金额', value: data.bill_money || '-' },
          { name: '实收金额', value: data.receive_money || '-' },
          { name: '开票金额', value: data.invoice_money || '-' },
          { name: '计费周期', value: data.start_ts + '-' + data.end_ts || '-' },
          { name: '联系人', value: data.contacter || '-' },
          { name: '联系电话', value: data.contact || '-' }
        ]
      })
    },
    fetchGetInfoType (id) {
      // 获取费用列表_类型
      let params = {
        customer_id: id,
        page_no: 1,
        page_size: 999
      }
      this.$https.post(this.$urls.expense.get_list_bind, params).then(res => {
        this.info_body_water.info.tableData = []
        this.info_body_electric.info.tableData = []
        this.info_body_gas.info.tableData = []
        this.info_body_lease.info.tableData = []
        this.info_body_other.info.tableData = []
        let listWater = []
        let listElectric = []
        let listGas = []
        let listLease = []
        let listOther = []
        let dataList = res.list
        this.$utils.getRooms(dataList)
        if (res.code === 1000) {
          let data = res.list
          if (data.length) {
            data.forEach(v => {
              if (v.type === 413) {
                listWater.push(v)
              } else if (v.type === 414) {
                listElectric.push(v)
              } else if (v.type === 458) {
                listGas.push(v)
              } else if (v.type === 453) {
                listLease.push(v)
              } else if (v.type === 456) {
                listOther.push(v)
              }
            })
          }
        }
        this.info_body_water.info.tableData = listWater
        this.info_body_electric.info.tableData = listElectric
        this.info_body_gas.info.tableData = listGas
        this.info_body_lease.info.tableData = listLease
        this.info_body_other.info.tableData = listOther
      })
    },
    handlePageClick (num) {
      // 点击页码时
      this.page.page_no = num
      this.fetchList()
    }
  },
  mounted () {
    this.fetchInfo()
    this.fetchList()
    // console.log(this.yearList)
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/style/index.less";
.el-card {
  margin-bottom: 20px;
}
.receipt {
  font-size: 16px;
  line-height: 24px;
  .time {
    margin: 0 8px;
  }
  .money {
    color: @blue;
  }
}
</style>
