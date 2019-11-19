<template>
  <div>
    <el-card style="width: 100%">
      <div>
        <el-select  size="small"
                    multiple
                    v-model="value"
                    placeholder="客户类型">
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
        >客户</el-button>
      </div>
    </el-card>
    <el-card>
<!--      <el-radio-group v-model="radio" size="mini">-->
<!--        <el-radio-button label="收款"></el-radio-button>-->
<!--        <el-radio-button label="付款"></el-radio-button>-->
<!--      </el-radio-group>-->
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
        @row-click="customerState"
        style="width: 100%">
        <el-table-column
          prop="a"
          label="客户状态">
        </el-table-column>
        <el-table-column
          prop="b"
          label="渠道">
        </el-table-column>
        <el-table-column
          prop="c"
          label="需求面积段">
        </el-table-column>
        <el-table-column
          prop="d"
          label="行业">
        </el-table-column>
        <el-table-column
          prop="e"
          label="预计签约时间">
        </el-table-column>
        <el-table-column
          prop="e"
          label="币种（单位）">
        </el-table-column>
        <el-table-column
          prop="e"
          label="跟进人">
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      title="新建客户"
      :visible.sync="addContractVisible"
      width="800px">
      <div>
        <ParkForm :formList="addContractFormList" :itemList="[]"></ParkForm>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addContractVisible = false">取 消</el-button>
        <el-button type="primary" @click="addContractVisible = false">确 定</el-button>
      </span>
    </el-dialog>
<!--  客户详情-->
    <el-drawer
      title="客户详情"
      custom-class="drawer-r"
      :visible.sync="customerInfoState"
      size="1186px"
      direction="rtl">
      <HeaderCard :data="customerInfo_header">
        <template #headerCardBtns>
          <div class="btnBox" v-for="(item,i) in customerInfo_header.button" :key="(item,i)" @click="open(item.name)">
            <i class="iconfont" v-html="item.icon"></i>
            <span class="headerCard-btn-name">{{item.name}}</span>
          </div>
        </template>
      </HeaderCard>
      <div class="drawer-body" style="height: 660px;">
        <BodyCard type=1 :data="customerInfo_body_1"></BodyCard>
        <!-- <BodyCard type=1 :data="customerInfo_body_room"></BodyCard> -->
        <!-- <BodyCard type=2 :data="customerInfo_body_table1"></BodyCard> -->

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
        { name: '初次接触', value: 10000 },
        { name: '潜在客户', value: 10000 },
        { name: '意向客户', value: 10000 },
        { name: '成交客户', value: 10000 },
        { name: '流失客户', value: 10000 },
        { name: '总计', value: 10000 }
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
          title: '客户信息',
          span: 12,
          minHeight: 500,
          children: [
            {
              type: 'input',
              label: '客户',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { required: true, message: '该项为必填', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '联系人',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { required: true, message: '该项为必填', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '联系方式',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { required: true, message: '该项为必填', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '跟进人',
              key: 'i',
              placeholder: '请输入租客名称',
              rule: [
                { required: true, message: '请输入租客名称', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'select',
              label: '行业',
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
              type: 'date-picker',
              label: '来访时间',
              key: 'i',
              placeholder: '请输入租客名称',
              rule: [
                { required: true, message: '请输入租客名称', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'select',
              label: '客户来源',
              key: 'tamplate',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请选择', trigger: 'change' }
              ],
              options: [
                {
                  label: '上门',
                  value: 's1'
                }, {
                  label: '官网',
                  value: '官网'
                }
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
          span: 12,
          minHeight: 500,
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
      customerInfoState: false,
      customerInfo_header: {
        title: '杨晓明',
        button: [
          {
            name: '附件',
            icon: '&#xe655;',
            function: 'open'
          },
          {
            name: '备注',
            icon: '&#xe7d1;',
            function: 'open'
          }
        ]
      },
      customerInfo_body_1: {
        title: '客户信息',
        info: [
          { name: '名称', value: '杨晓明' },
          { name: '来访时间', value: '2019-10-28' },
          { name: '客户状态', value: '未签约' },
          { name: '渠道', value: '中介' },
          { name: '需求面积段', value: '300-400' },
          { name: '需求工位段', value: '50-100' },
          { name: '行业', value: '互联网' },
          { name: '预计签约时间', value: '2019-12-06' },
          { name: '跟进人', value: '杨晓明' }
        ]
      }

    }
  },
  methods: {
    handleAddContract () {
      this.addContractVisible = true
    },
    customerState () {
      this.customerInfoState = true
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
