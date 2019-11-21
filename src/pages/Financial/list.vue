<template>
  <div>
    <el-card style="width: 100%">
      <div>
        <el-select  size="small"
                    multiple
                    v-model="value"
                    placeholder="账单类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <el-input
          placeholder="搜索"
          size="small"
          style="width: 220px; margin-left: 15px"
          prefix-icon="el-icon-search"
          v-model="value">
        </el-input>
        <el-button
          style="float: right"
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="handleAddContract"
        >添加账单</el-button>
      </div>
    </el-card>
    <el-card>
      <el-radio-group v-model="radio" size="mini">
        <el-radio-button label="收款"></el-radio-button>
        <el-radio-button label="付款"></el-radio-button>
      </el-radio-group>
      <div>
        <div :key="item.name" v-for="item in finData" class="simple-item">
          <div class="title">{{item.name}}</div>
          <div class="value">{{item.value}}</div>
        </div>
      </div>

    </el-card>
    <el-card>
      <el-table
        :data="tableData"
        @row-click="financialState"
        style="width: 100%">
        <el-table-column
          prop="a"
          label="楼宇名称">
        </el-table-column>
        <el-table-column
          prop="b"
          label="房间号">
        </el-table-column>
        <el-table-column
          prop="c"
          label="对房名称">
        </el-table-column>
        <el-table-column
          prop="d"
          label="费用类型">
        </el-table-column>
        <el-table-column
          prop="e"
          label="账单金额">
        </el-table-column>
        <el-table-column
          prop="e"
          label="币种（单位）">
        </el-table-column>
        <el-table-column
          prop="e"
          label="实收/付金额">
        </el-table-column>
        <el-table-column
          prop="e"
          label="需收/退金额">
        </el-table-column>
        <el-table-column
          prop="e"
          label="开票金额">
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination layout="prev, pager, next" :total="1000"></el-pagination>

    <el-dialog
      title="新建收付款账单"
      :visible.sync="addContractVisible"
      width="600px"
    >
      <div>
        <ParkForm :formList="addContractFormList" :itemList="[]"></ParkForm>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
<!--  账单详情-->
    <el-drawer
      title="账单详情"
      custom-class="drawer-r"
      :visible.sync="financialInfoState"
      size="1186px"
      direction="rtl">
      <HeaderCard :data="financialInfo_header">
        <template #headerCardBtns>
          <div class="btnBox" v-for="(item,i) in financialInfo_header.button" :key="(item,i)" @click="open(item.name)">
            <i class="iconfont" v-html="item.icon"></i>
            <span class="headerCard-btn-name">{{item.name}}</span>
          </div>
        </template>
      </HeaderCard>
      <HeaderInfo type=1 :data="financialInfo_info"></HeaderInfo>
      <div class="drawer-body" style="height: 660px;">
        <BodyCard type=1 :data="financialInfo_body_financial"></BodyCard>
        <BodyCard type=1 :data="financialInfo_body_room"></BodyCard>
        <BodyCard type=2 :data="financialInfo_body_table1"></BodyCard>
        <BodyCard type=2 :data="financialInfo_body_table2"></BodyCard>
        <BodyCard type=2 :data="financialInfo_body_table3"></BodyCard>
        <BodyCard type=2 :data="financialInfo_body_table4"></BodyCard>
        <BodyCard type=2 :data="financialInfo_body_table5"></BodyCard>

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
      radio: '收款',
      yearList: [
      ],
      finData: [
        { name: '应收(3笔)', value: '10000' },
        { name: '滞纳金', value: 10000 },
        { name: '已收', value: 10000 },
        { name: '未缴(3笔)', value: '10000' }
      ],
      options: [
        {
          value: '选项1',
          label: '全部'
        }, {
          value: '选项2',
          label: '水费'
        }, {
          value: '选项3',
          label: '电费'
        }, {
          value: '选项4',
          label: '燃气'
        }, {
          value: '选项5',
          label: '房租'
        }
      ],
      value: '',
      addContractVisible: false,
      addContractFormList: [
        {
          title: '账单',
          children: [
            {
              type: 'select',
              label: '关联合同',
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
            },
            {
              type: 'input',
              label: '付款方',
              key: 'i',
              placeholder: '请输入租客名称',
              rule: [
                { required: true, message: '请输入租客名称', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '联系人',
              key: 'i',
              placeholder: '请输入租客名称',
              rule: [
                { required: true, message: '请输入租客名称', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'select',
              label: '费用类型',
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
            },
            {
              type: 'select',
              label: '币种',
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
            },
            {
              type: 'date-picker-range',
              label: '计费周期',
              key: 'fr',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '滞纳金比例（%）',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '滞纳金上限（%）',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'textarea',
              label: '备注',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            }
          ]
        },
        {
          title: '房源信息',
          children: [
            {
              type: 'cascader',
              label: '房源信息',
              key: 'fangyxx',
              rule: [
                { required: true, message: '请选择', trigger: 'change' }
              ],
              options: [{
                value: 1,
                label: '梦想小镇',
                children: [{
                  value: 2,
                  label: '1幢',
                  children: [
                    { value: 3, label: '101' },
                    { value: 4, label: '201' },
                    { value: 5, label: '205' }
                  ]
                }, {
                  value: 7,
                  label: '3幢',
                  children: [
                    { value: 8, label: '101' },
                    { value: 9, label: '103' },
                    { value: 10, label: '503' }
                  ]
                }, {
                  value: 12,
                  label: '8幢',
                  children: [
                    { value: 13, label: '202' },
                    { value: 14, label: '503' },
                    { value: 15, label: '603' }
                  ]
                }]
              }, {
                value: 17,
                label: '人工智能小镇',
                children: [{
                  value: 18,
                  label: '16幢',
                  children: [
                    { value: 19, label: '501' },
                    { value: 20, label: '505' }
                  ]
                }, {
                  value: 21,
                  label: '19幢',
                  children: [
                    { value: 22, label: '103' },
                    { value: 23, label: '105' }
                  ]
                }]
              }]
            }
          ]
        }
      ],
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
      financialInfoState: false,
      financialInfo_header: {
        title: '收款方：杨',
        button: [
          {
            name: '王晓丹',
            icon: '&#xe607;',
            function: 'click1'
          },
          {
            name: '附件',
            icon: '&#xe655;',
            function: 'click1'
          },
          {
            name: '打印',
            icon: '&#xe617;',
            function: 'click1'
          },
          {
            name: '备注',
            icon: '&#xe7d1;',
            function: 'click1'
          }
        ]
      },
      financialInfo_info: {
        label: [
          { prop: 'a', label: '账单状态' },
          { prop: 'b', label: '应退金额' },
          { prop: 'c', label: '需退金额' },
          { prop: 'd', label: '应退时间' }
        ],
        tableData: [{
          a: '未付款',
          b: '1,495.89元',
          c: '1,495.89元',
          d: '2020-01-07'
        }]
      },
      financialInfo_body_financial: {
        title: '账单信息',
        info: [
          { name: '费用类型', value: '租金' },
          { name: '计费周期', value: '2020-01-28-2020-04-27' },
          { name: '账单金额', value: '1,495.89元' },
          { name: '创建时间', value: '2019-10-28' },
          { name: '收款方', value: '杨' },
          { name: '收款方联系方式', value: '-' },
          { name: '合同编号', value: '1003' },
          { name: '账单编号', value: 'zj-20191028-016558624' },
          { name: '备注', value: '-' }
        ]
      },
      financialInfo_body_room: {
        title: '房源信息',
        info: [
          { name: '园区', value: '西港发展中心' },
          { name: '楼宇', value: '协力大厦' },
          { name: '房号', value: '10层302室' }
        ]
      },
      financialInfo_body_table1: {
        title: '收款',
        info: {
          label: [
            { prop: 'a', label: '对方单位名称' },
            { prop: 'b', label: '入账日' },
            { prop: 'c', label: '借贷标' },
            { prop: 'd', label: '发生额' },
            { prop: 'e', label: '匹配金额' },
            { prop: 'f', label: '匹配时间' },
            { prop: 'g', label: '取消匹配时间' },
            { prop: 'h', label: '操作' }
          ],
          tableData: []
        }
      },
      financialInfo_body_table2: {
        title: '付款',
        info: {
          label: [
            { prop: 'a', label: '对方单位名称' },
            { prop: 'b', label: '入账日' },
            { prop: 'c', label: '借贷标' },
            { prop: 'd', label: '发生额' },
            { prop: 'e', label: '匹配金额' },
            { prop: 'f', label: '匹配时间' },
            { prop: 'g', label: '取消匹配时间' },
            { prop: 'h', label: '操作' }
          ],
          tableData: []
        }
      },
      financialInfo_body_table3: {
        title: '结转',
        info: {
          label: [
            { prop: 'a', label: '对方单位' },
            { prop: 'b', label: '转入金额' },
            { prop: 'c', label: '转出金额' },
            { prop: 'd', label: '结转时间' },
            { prop: 'e', label: '作废时间' }
          ],
          tableData: []
        }
      },
      financialInfo_body_table4: {
        title: '开票记录',
        info: {
          label: [
            { prop: 'a', label: '购买方名称' },
            { prop: 'b', label: '发票号码' },
            { prop: 'c', label: '开票金额' },
            { prop: 'd', label: '备注' },
            { prop: 'e', label: '开票时间' },
            { prop: 'f', label: '状态' }
          ],
          tableData: []
        }
      },
      financialInfo_body_table5: {
        title: '调整',
        info: {
          label: [
            { prop: 'a', label: '调整金额' },
            { prop: 'b', label: '调整时间' },
            { prop: 'c', label: '调整类型' },
            { prop: 'd', label: '备注' },
            { prop: 'e', label: '作废调整时间' },
            { prop: 'f', label: '操作' }
          ],
          tableData: []
        }
      }

    }
  },
  methods: {
    handleAddContract () {
      this.addContractVisible = true
    },
    financialState () {
      this.financialInfoState = true
    },
    handleClose () { },
    open (i) {
      this.$message('这里是' + i)
    }
  },
  created () {
    [1, 2, 3, 4, 5, 6, 7, 8].forEach(item => {
      this.tableData.push(
        {
          a: 'xxx-xx-' + item,
          b: '出租合同模板' + item,
          c: '销售类' + item,
          d: item % 2 === 0 ? '启用' : '停用',
          e: '$20000'
        }
      )
    })
    // console.log(this.yearList)
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
  .el-card{
    margin-bottom: 20px;
  }
  .simple-item{
    min-width: 140px;
    border-right: 2px solid rgb(230, 232, 238);
    padding-left: 20px;
    float: left;
    margin: 20px 30px 20px 0;
    .title{
      font-size: 12px;
      color: rgb(152, 154, 163);
      line-height: 12px;
      margin-bottom: 20px;
    }
    .value{
      font-size: 22px;
      color: rgb(31, 33, 46);
      height: 22px;
    }
  }
</style>
