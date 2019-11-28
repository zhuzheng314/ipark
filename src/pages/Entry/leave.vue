<template>
  <div>
    <el-card>
      <div>

        <el-select  size="small"
                    multiple
                    style="width: 180px; margin-right: 15px"
                    v-model="value1"
                    placeholder="所属园区">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select  size="small"
                    multiple
                    style="width: 180px; margin-right: 15px"
                    v-model="value2"
                    placeholder="审批状态">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <el-date-picker
          size="small"
          v-model="date"
          type="daterange"
          style="width: 220px; margin-right: 15px"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-input
          placeholder="搜索企业"
          size="small"
          style="width: 180px; margin-right: 15px"
          prefix-icon="el-icon-search"
          v-model="value3">
        </el-input>

        <el-button
          style="float: right;"
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="handleAddContract"
        >新增</el-button>
      </div>
    </el-card>
    <el-card style="margin-bottom: 20px">
      <div slot="header" class="clearfix">
        <span>退驻监控图</span>
      </div>
      <div class="chart">
        <v-chart style="width:100%;height: 300px;" :options="stackedAreaOptions"></v-chart>
      </div>
    </el-card>
    <el-card>
      <!-- <el-table
        :data="tableData"
        @row-click="tenantsState"
        style="width: 100%">
        <el-table-column
          prop="a"
          label="所属园区"
          >
        </el-table-column>
        <el-table-column
          prop="b"
          label="企业名称"
          >
        </el-table-column>
        <el-table-column
          prop="c"
          label="企业类型"
          >
        </el-table-column>
        <el-table-column
          prop="d"
          label="注册资本"
          >
        </el-table-column>
        <el-table-column
          prop="e"
          label="入驻性质"
          sortable
          >
        </el-table-column>
        <el-table-column
          prop="f"
          label="入驻面积"
          sortable
          >
        </el-table-column>
        <el-table-column
          prop="g"
          label="房间号"
          sortable
          >
        </el-table-column>
        <el-table-column
          prop="e"
          label="开始时间"
          sortable
          >
        </el-table-column>
        <el-table-column
          prop="date"
          label="结束时间"
          sortable
          >
        </el-table-column>
        <el-table-column
          prop="person"
          label="跟进人"
          sortable
          >
        </el-table-column>
        <el-table-column
          prop="h"
          label="审批状态"
          sortable
          >
          <template slot-scope="scope">
            <el-tag size="mini">{{scope.row.h}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <div style="width: 100%; text-align: right; padding-top: 20px">
        <el-pagination
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div> -->
      <GTable
        @row-click="tenantsState"
        :tableLabel="$tableLabels.leaveList"
        :tableData="tableData">
      </GTable>
    </el-card>

    <el-dialog
      title="新建合同"
      :visible.sync="addContractVisible"
      width="800px">
      <div>
        <ParkForm :formList="$formsLabels.leaveForm" :itemList="[]"></ParkForm>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--      租客详细信息-->
    <el-drawer
      title="租客详细信息"
      custom-class="drawer-r"
      :visible.sync="tenantsInfoState"
      size="1186px"
      direction="rtl">
      <HeaderCard :data="tenantsInfo_header">
        <template #headerCardBtns>
          <div class="btnBox" v-for="(item,i) in tenantsInfo_header.button" :key="(item,i)" @click="open(item.name)">
            <i class="iconfont" v-html="item.icon"></i>
            <span class="headerCard-btn-name">{{item.name}}</span>
          </div>
        </template>
      </HeaderCard>
      <HeaderInfo type=1 :data="tenantsInfo_info"></HeaderInfo>
      <div class="drawer-body" style="height: 700px;">
        <BodyCard type=1 :data="tenantsInfo_body"></BodyCard>
        <BodyCard type=2 :data="tenantsInfo_body_table1"></BodyCard>
        <!-- <BodyCard type=2 :data="tenantsInfo_body_table2"></BodyCard> -->
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
      options1: [ ],
      options2: [
        {
          value: '选项1',
          label: '未审批'
        }, {
          value: '选项2',
          label: '审批中'
        }, {
          value: '选项3',
          label: '已通过'
        }, {
          value: '选项4',
          label: '未通过'
        }
      ],
      date: [],
      value1: '',
      value2: '',
      value3: '',
      stackedAreaOptions: {},
      addContractVisible: false,
      // addContractFormList: [
      //   {
      //     title: '客户信息',
      //     span: 12,
      //     minHeight: 450,
      //     children: [
      //       {
      //         type: 'input',
      //         label: '租客名称',
      //         key: 'i',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请输入合同编号', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'input',
      //         label: '联系人',
      //         key: 'i',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请输入合同编号', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'input',
      //         label: '证件号码',
      //         key: 'i',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请输入合同编号', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'select',
      //         label: '行业分类',
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
      //         type: 'input',
      //         label: '电话',
      //         key: 'i',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请输入合同编号', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'input',
      //         label: '邮箱',
      //         key: 'i',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请输入合同编号', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'input',
      //         label: '租客编码',
      //         key: 'i',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请输入合同编号', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       }
      //     ]
      //   }, {
      //     title: '开票信息',
      //     span: 12,
      //     minHeight: 450,
      //     children: [
      //       {
      //         type: 'input',
      //         label: '开户银行',
      //         key: 'tenantName',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请输入合同编号', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'input',
      //         label: '账号',
      //         key: 'tenantName',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请输入合同编号', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'input',
      //         label: '电话',
      //         key: 'tenantName',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请输入合同编号', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'input',
      //         label: '纳税人识别号',
      //         key: 'tenantName',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请输入合同编号', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'input',
      //         label: '开票地址',
      //         key: 'tenantName',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请输入合同编号', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'checkbox',
      //         label: '标签选择',
      //         key: 'c',
      //         options: [
      //           {
      //             label: '美食',
      //             value: 'vdd1'
      //           }, {
      //             label: '美食美食',
      //             value: 'vdd2'
      //           }
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     title: '工商信息',
      //     span: 24,
      //     itemSpan: 12,
      //     children: [
      //       {
      //         type: 'input',
      //         label: '统一社会信用代码',
      //         key: 'tenantName',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请输入合同编号', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'input',
      //         label: '纳税人识别号',
      //         key: 'tenantName',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请输入合同编号', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'input',
      //         label: '注册号',
      //         key: 'tenantName',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请输入合同编号', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'input',
      //         label: '组织机构代码',
      //         key: 'tenantName',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请输入合同编号', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'input',
      //         label: '法定代表人',
      //         key: 'tenantName',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请输入合同编号', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'input',
      //         label: '国籍',
      //         key: 'tenantName',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请输入合同编号', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'input',
      //         label: '注册资本/万',
      //         key: 'tenantName',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请输入合同编号', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'input',
      //         label: '经营状态',
      //         key: 'tenantName',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请输入合同编号', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'date-picker',
      //         label: '成立日期',
      //         key: 'date3',
      //         placeholder: '请选择日期',
      //         rule: [
      //           { required: true, message: '请选择', trigger: 'change' }
      //         ]
      //       },
      //       {
      //         type: 'input',
      //         label: '公司类型',
      //         key: 'tenantName',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请输入合同编号', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       }, {
      //         type: 'input',
      //         label: '人员规模',
      //         key: 'tenantName',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请输入合同编号', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'input',
      //         label: '营业期限',
      //         key: 'tenantName',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请输入合同编号', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'input',
      //         label: '登记机关',
      //         key: 'tenantName',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请输入合同编号', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'input',
      //         label: '核准日期',
      //         key: 'tenantName',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请输入合同编号', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'input',
      //         label: '英文名',
      //         key: 'tenantName',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请输入合同编号', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'input',
      //         label: '所属地区',
      //         key: 'tenantName',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请输入合同编号', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'input',
      //         label: '所属行业',
      //         key: 'tenantName',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请输入合同编号', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'input',
      //         label: '注册地址',
      //         key: 'tenantName',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请输入合同编号', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       },
      //       {
      //         type: 'input',
      //         label: '经营范围',
      //         key: 'tenantName',
      //         placeholder: '请输入',
      //         rule: [
      //           { required: true, message: '请输入合同编号', trigger: 'blur' },
      //           { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //         ]
      //       }
      //     ]
      //   }
      // ],
      tenantsInfoState: false,
      tenantsInfo_header: {
        title: '杭州拓源科技有限公司',
        button: [
          {
            name: '编辑',
            icon: '&#xe62a;',
            function: 'click1'
          },
          {
            name: '附件',
            icon: '&#xe655;',
            function: 'click1'
          },
          {
            name: '备注',
            icon: '&#xe7d1;',
            function: 'click1'
          },
          {
            name: '删除',
            icon: '&#xe64a;',
            function: 'click1'
          }
        ],
        data: {}
      },
      tenantsInfo_info: {
        label: [
          { prop: 'a', label: '入驻时间' },
          { prop: 'b', label: '法人' },
          { prop: 'c', label: '成立时间' },
          { prop: 'd', label: '行业分类' },
          { prop: 'e', label: '联系人' },
          { prop: 'f', label: '证件号码' },
          { prop: 'g', label: '注册资本' },
          { prop: 'h', label: '企业地址' },
          { prop: 'i', label: '标签' },
          { prop: 'j', label: '最新备注' }
        ],
        tableData: [{
          a: '2018/10/28',
          b: '王秀兰',
          c: '2015/01/25',
          d: '网络科技',
          e: '-',
          f: '313598198015243245',
          g: '200万元人民币',
          h: '杭州经济开发区',
          i: '软件互联网',
          j: '-'

        }]
      },
      tenantsInfo_body: {
        title: '抬头发票',
        info: [
          { name: '纳税人识别号', value: '5465489518XX' },
          { name: '账号', value: '35495448' },
          { name: '开户银行', value: '中国银行股份有限公司杭州大学城支行' },
          { name: '电话', value: '0517-88222222' },
          { name: '开票地址', value: '杭州经济开发区' }

        ]
      },
      tenantsInfo_body_table1: {
        title: '合同',
        info: {
          label: [
            { prop: 'a', label: '租客' },
            { prop: 'b', label: '楼宇/房间号' },
            { prop: 'c', label: '租赁数' },
            { prop: 'd', label: '开始日' },
            { prop: 'e', label: '结束日' },
            { prop: 'f', label: '合同单价' },
            { prop: 'g', label: '状态' }
          ],
          tableData: [
            { a: '杭州拓源科技有限公司', b: '华润中心/701', c: '300.00㎡', d: '2019-10-30', e: '2020-10-30', f: '1.6元/平方米·天', g: '正常执行' },
            { a: '杭州拓源科技有限公司', b: '华润中心/701', c: '300.00㎡', d: '2019-10-30', e: '2020-10-30', f: '1.6元/平方米·天', g: '正常执行' },
            { a: '杭州拓源科技有限公司', b: '华润中心/701', c: '300.00㎡', d: '2019-10-30', e: '2020-10-30', f: '1.6元/平方米·天', g: '正常执行' },
            { a: '杭州拓源科技有限公司', b: '华润中心/701', c: '300.00㎡', d: '2019-10-30', e: '2020-10-30', f: '1.6元/平方米·天', g: '正常执行' }
          ]
        }
      }
    }
  },
  methods: {
    handleAddContract () {
      this.addContractVisible = true
    },
    tenantsState () {
      this.tenantsInfoState = true
    },
    handleClose () { },
    open (i) {
      this.$message('这里是' + i)
    },
    // 折线面积图
    stackedAreaChart (data) {
      let stackedAreaChartOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#65C6E7'
            }
          }
        },
        grid: {
          top: '5%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
          // tooltip:{axisPointer:{lineStyle:{color:"#65C6E7"}}},
          // borderColor: '#65C6E7'
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisTick: {// 坐标轴刻度线
              show: true,
              inside: true,
              lineStyle: {
                // color:'#33E9FF',
              }
            },
            axisLine: {
              lineStyle: {
                // color: '#33E9FF',
              }
            },
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                // color: '#33E9FF',
              }
            },
            axisLabel: {// 刻度颜色
              // color:"#33E9FF",
            },
            splitLine: {
              lineStyle: {// 网格线
                width: 0,
                color: ['rgba(51, 233, 255, 0.6)']
              }
            }
          }
        ],
        // color : ['#00FEFF','#FFFF57'],
        series: [
          {
            type: 'line',
            areaStyle: { normal: {} },
            lineStyle: { width: 2 },
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(54, 172, 254, 0.5)'
              }, {
                offset: 1, color: 'rgba(67, 144, 250, 0.1)'
              }],
              global: false
            },
            data: data
          }
        ]
      }
      return stackedAreaChartOption
    }
  },
  created () {
    [1, 2, 3, 4, 5, 6, 7, 8].forEach((item, index) => {
      this.tableData.push(
        {
          a: '阿里巴巴' + item,
          b: 'xxxxxxxx' + item,
          c: '互联网' + item,
          d: '1000',
          e: '入驻企业',
          f: '400',
          g: '302',
          h: '审批中',
          i: '',
          date: '2019-11-11',
          person: item % 2 === 0 ? '刘涛' : '赵阳'
        }
      )
    })
    for (let i = 0; i < 24; i++) {
      this.yearList.push({
        name: 'yue' + i,
        value: (Math.random() * 100)
      })
    }

    let stackedAreaData = []
    for (let i = 0; i <= 12; i++) {
      stackedAreaData.push(Math.floor(Math.random() * 10))
    }

    this.stackedAreaOptions = this.stackedAreaChart(stackedAreaData)
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
