<template>
  <div>
    <el-card style="width: 100%">
      <div>
        <el-select  size="small"
                    multiple
                    v-model="value"
                    placeholder="进度阶段">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select  size="small"
                    multiple
                    v-model="value"
                    placeholder="来源渠道">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <el-input
          placeholder="搜索客户名称"
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
           <Comparison :type="item.type" :data="item"></Comparison>
        </div>
      </div>

    </el-card>
    <el-card>
<!--      <el-table-->
<!--        :data="tableData"-->
<!--        @row-click="customerState"-->
<!--        style="width: 100%">-->
<!--        <el-table-column-->
<!--          prop="a"-->
<!--          label="客户名称">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="b"-->
<!--          label="进度阶段">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="c"-->
<!--          label="来源渠道">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="d"-->
<!--          label="需求面积段">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="e"-->
<!--          label="行业">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="f"-->
<!--          label="最近联络时间">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="g"-->
<!--          label="联络人">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="h"-->
<!--          label="联系方式">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="i"-->
<!--          label="预计签约时间">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="j"-->
<!--          label="跟进人">-->
<!--        </el-table-column>-->
<!--      </el-table>-->

<!--      <div style="width: 100%; text-align: right; padding-top: 20px">-->
<!--        <el-pagination layout="prev, pager, next" :total="1000"> </el-pagination>-->
<!--      </div>-->

      <GTable
        @row-click="customerState"
        :tableLabel="$tableLabels.businessCustomer"
        :tableData="tableData">
      </GTable>
    </el-card>

    <el-dialog
      title="新建客户"
      :visible.sync="addContractVisible"
      width="600px">
      <div>
        <ParkForm :formList="$formsLabels.addCustomerForm" :itemList="[]"></ParkForm>
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
        <BodyCard type=1 :data="customerInfo_body_2"></BodyCard>
        <BodyCard type=3 :data="customerInfo_body_3"></BodyCard>
        <BodyCard type=2 :data="customerInfo_body_table">
          <template #btn>
            <el-button
              :style="{height: '80%',margin: 'auto 8px'}"
              size="mini"
            >发起合同</el-button>
          </template>
        </BodyCard>

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
        { name: '初次接触', value: 134, chart: '0.23', type: 'arrow' },
        { name: '成交客户', value: 45, chart: '0.15', type: 'arrow' },
        { name: '流失客户', value: 12, chart: '-0.85', type: 'arrow' }
      ],
      options1: [
        {
          value: '选项1',
          label: '全部'
        }, {
          value: '选项2',
          label: '初次来访'
        }, {
          value: '选项3',
          label: '意向客户'
        }, {
          value: '选项4',
          label: '成交客户'
        }, {
          value: '选项5',
          label: '休眠客户'
        }
      ],
      options2: [
        {
          value: '选项1',
          label: '全部'
        }, {
          value: '选项2',
          label: '广告媒体'
        }, {
          value: '选项3',
          label: '中介'
        }, {
          value: '选项4',
          label: '客户自访'
        }, {
          value: '选项5',
          label: '其他'
        }
      ],
      value: '',
      addContractVisible: false,
      // addContractFormList: [
      //   {
      //     title: '客户信息',
      //     span: 24,
      //     // minHeight: 500,
      //     children: [
      //       {
      //         type: 'input',
      //         label: '客户(企业名称)',
      //         key: 'i',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '该项为必填', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'input',
      //         label: '联系人',
      //         key: 'i',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '该项为必填', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'input',
      //         label: '联系方式',
      //         key: 'i',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '该项为必填', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'input',
      //         label: '跟进人',
      //         key: 'i',
      //         placeholder: '请输入租客名称',
      //         rule: [
      //           { required: true, message: '请输入租客名称', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'select',
      //         label: '进度阶段',
      //         key: 'tamplate',
      //         placeholder: '请选择',
      //         rule: [
      //           { required: true, message: '请选择', trigger: 'change' }
      //         ],
      //         options: [
      //           {
      //             label: '初次来访',
      //             value: 's1'
      //           }, {
      //             label: '意向客户',
      //             value: 's2'
      //           }, {
      //             label: '成交客户',
      //             value: 's3'
      //           }, {
      //             label: '休眠客户',
      //             value: 's4'
      //           }
      //         ]
      //       },
      //       {
      //         type: 'select',
      //         label: '行业',
      //         key: 'tamplate',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请选择', trigger: 'change' }
      //         ],
      //         options: [
      //           {
      //             label: '美食',
      //             value: 's1'
      //           }, {
      //             label: '美食美食',
      //             value: 's2'
      //           }
      //         ]
      //       },
      //       {
      //         type: 'date-picker',
      //         label: '来访时间',
      //         key: 'i',
      //         placeholder: '请输入租客名称',
      //         rule: [
      //           { required: true, message: '请输入租客名称', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'select',
      //         label: '客户来源',
      //         key: 'tamplate',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请选择', trigger: 'change' }
      //         ],
      //         options: [
      //           {
      //             label: '上门',
      //             value: 's1'
      //           }, {
      //             label: '官网',
      //             value: '官网'
      //           }
      //         ]
      //       },
      //       {
      //         type: 'textarea',
      //         label: '备注',
      //         key: 'i',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请输入', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     title: '房源信息',
      //     span: 24,
      //     children: [
      //       {
      //         type: 'cascader',
      //         label: '需求面积',
      //         key: 'xuqmj',
      //         rule: [
      //           { required: true, message: '请选择', trigger: 'change' }
      //         ],
      //         options: [
      //           {
      //             value: 1,
      //             label: '100㎡以内'
      //           }, {
      //             value: 2,
      //             label: '100-200㎡'
      //           }, {
      //             value: 3,
      //             label: '200-300㎡'
      //           }, {
      //             value: 4,
      //             label: '300㎡以上'
      //           }
      //         ]
      //       },
      //       {
      //         type: 'cascader',
      //         label: '需求工位',
      //         key: 'fangyxx',
      //         rule: [
      //           { required: true, message: '请选择', trigger: 'change' }
      //         ],
      //         options: [
      //           {
      //             value: 1,
      //             label: '1-20个'
      //           }, {
      //             value: 2,
      //             label: '21-50个'
      //           }, {
      //             value: 3,
      //             label: '51-100个'
      //           }, {
      //             value: 4,
      //             label: '100个以上'
      //           }
      //         ]
      //       },
      //       {
      //         type: 'date-picker',
      //         label: '预计签约时间',
      //         key: 'i',
      //         placeholder: '请输入租客名称',
      //         rule: [
      //           { required: true, message: '请输入租客名称', trigger: 'change' }
      //         ]
      //       },
      //       {
      //         type: 'cascader',
      //         label: '房源信息',
      //         key: 'fangyxx',
      //         rule: [
      //           { required: true, message: '请选择', trigger: 'change' }
      //         ],
      //         options: [{
      //           value: 1,
      //           label: '梦想小镇',
      //           children: [{
      //             value: 2,
      //             label: '1幢',
      //             children: [
      //               { value: 3, label: '101' },
      //               { value: 4, label: '201' },
      //               { value: 5, label: '205' }
      //             ]
      //           }, {
      //             value: 7,
      //             label: '3幢',
      //             children: [
      //               { value: 8, label: '101' },
      //               { value: 9, label: '103' },
      //               { value: 10, label: '503' }
      //             ]
      //           }, {
      //             value: 12,
      //             label: '8幢',
      //             children: [
      //               { value: 13, label: '202' },
      //               { value: 14, label: '503' },
      //               { value: 15, label: '603' }
      //             ]
      //           }]
      //         }, {
      //           value: 17,
      //           label: '人工智能小镇',
      //           children: [{
      //             value: 18,
      //             label: '16幢',
      //             children: [
      //               { value: 19, label: '501' },
      //               { value: 20, label: '505' }
      //             ]
      //           }, {
      //             value: 21,
      //             label: '19幢',
      //             children: [
      //               { value: 22, label: '103' },
      //               { value: 23, label: '105' }
      //             ]
      //           }]
      //         }]
      //       }
      //     ]
      //   }
      // ],
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
      },
      customerInfo_body_2: {
        title: '关注房源',
        info: [
          { name: '所属园区', value: '西港发展中心' },
          { name: '楼宇/房间号', value: '协力大厦/302' },
          { name: '房源面积', value: '300㎡' },
          { name: '房源状态', value: '空置' }
        ]
      },
      customerInfo_body_3: {
        title: '备注',
        info: ''
      },
      customerInfo_body_table: {
        title: '合同',
        info: {
          label: [
            { prop: 'a', label: '合同编号' },
            { prop: 'b', label: '楼宇/房间号' },
            { prop: 'c', label: '租赁面积' },
            { prop: 'd', label: '开始日' },
            { prop: 'e', label: '结束日' },
            { prop: 'f', label: '合同单价' },
            { prop: 'g', label: '状态' },
            { prop: 'h', label: '联系人方式' }
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
    customerState () {
      this.customerInfoState = true
    },
    handleClose () { },
    open (i) {
      this.$message('这里是' + i)
    },
    test (page) {
      console.log(page)
    }
  },
  created () {
    [1, 2, 3, 4, 5, 6, 7, 8].forEach(item => {
      this.tableData.push(
        {
          a: 'xxx-xx-' + item,
          b: item % 2 === 0 ? '已签约' : '未签约',
          c: item % 2 === 0 ? '中介' : '广告',
          d: item % 2 === 0 ? '200㎡以上' : '200㎡以下',
          e: item % 2 === 0 ? '互联网' : '金融',
          f: item % 2 === 0 ? '2019-10-15' : '2019-09-25',
          g: item % 2 === 0 ? '裴仕颉' : '金李敏',
          h: '13954546589',
          i: item % 2 === 0 ? '2019-12-15' : '2019-12-25',
          j: item % 2 === 0 ? '裴仕颉' : '金李敏'
        }
      )
    })
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
  .el-card{
    margin-bottom: 20px;
  }
  // .simple-item{
  //   min-width: 140px;
  //   border-right: 2px solid rgb(230, 232, 238);
  //   padding-left: 20px;
  //   float: left;
  //   margin: 20px 30px 20px 0;
  //   .title{
  //     font-size: 12px;
  //     color: rgb(152, 154, 163);
  //     line-height: 12px;
  //     margin-bottom: 20px;
  //   }
  //   .value{
  //     font-size: 22px;
  //     color: rgb(31, 33, 46);
  //     height: 22px;
  //   }
  // }
</style>
