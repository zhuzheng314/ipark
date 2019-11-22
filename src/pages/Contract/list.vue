<template>
  <div>
    <el-card style="width: 100%">
      <el-select  size="small"
                  v-model="value" placeholder="合同类型">
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
        v-model="value">
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
      <g2-column
        :option="customOption"
        :is-bar="false"
        :data="yearList"
        style="width: 100%"
        :height="300"
        :axis-name="{name:'月份', value:'到期合同数（份）'}">
      </g2-column>
    </el-card>
    <el-card>
      <el-table
        :data="tableData"
        @row-click="contractState"
        style="width: 100%">
        <el-table-column
          prop="a"
          label="合同序号">
        </el-table-column>
        <el-table-column
          prop="b"
          label="楼宇名称">
        </el-table-column>
        <el-table-column
          prop="c"
          label="客户名称">
        </el-table-column>
        <el-table-column
          prop="e"
          sortable
          label="截止时间">
        </el-table-column>
        <el-table-column
          prop="d"
          sortable
          label="签订日">
        </el-table-column>
        <el-table-column
          prop="f"
          sortable
          label="合同状态">
        </el-table-column>
        <el-table-column
          prop="g"
          label="租赁数目">
        </el-table-column>
        <el-table-column
          prop="h"
          label="跟进人">
        </el-table-column>
        <el-table-column
          prop="j"
          sortable
          label="合同金额">
        </el-table-column>
      </el-table>
      <div style="width: 100%; text-align: right; padding-top: 20px">
        <el-pagination layout="prev, pager, next" :total="1000"> </el-pagination>
      </div>
    </el-card>

    <el-dialog
      title="新建合同"
      top="10px"
      width="950px"
      style="overflow-y: scroll"
      :style="{height: dialogHeight + 'px'}"
      :visible.sync="addContractVisible"
    >
      <div>
        <ParkForm :formList="addContractFormList" :itemList="[]"></ParkForm>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addContractVisible = false">取 消</el-button>
        <el-button type="primary" @click="addContractVisible = false">确 定</el-button>
      </span>
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
        <BodyCard type=1 :data="contractInfo_body3"></BodyCard>
        <BodyCard type=1 :data="contractInfo_body4"></BodyCard>
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
      value: '',
      addContractVisible: false,
      addContractFormList: [
        {
          title: '基础信息',
          span: 24,
          itemSpan: 8,
          minHeight: 150,
          padding: '0 10px 0',
          margin: '',
          children: [
            {
              type: 'input',
              label: '合同编号',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { required: true, message: '该项为必填', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'select',
              label: '客户业态',
              key: 'tamplate',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请选择', trigger: 'change' }
              ],
              options: [
                {
                  label: '商业',
                  value: 's1'
                }, {
                  label: '商业',
                  value: 's2'
                }
              ]
            },
            {
              type: 'input',
              label: '跟进商务',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'select',
              label: '合同类型',
              key: 'tamplate',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请选择', trigger: 'change' }
              ],
              options: [
                {
                  label: '租房合同模板',
                  value: 's1'
                }, {
                  label: '车位合同模板',
                  value: 's2'
                }
              ]
            }
          ]
        },
        {
          title: '房源信息',
          span: 24,
          itemSpan: 8,
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
        },
        {
          title: '租户信息',
          span: 24,
          itemSpan: 8,
          minHeight: 150,
          padding: '0 10px 0',
          margin: '',
          children: [
            {
              type: 'input',
              label: '品牌名称',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { required: true, message: '该项为必填', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'select',
              label: '经营范围',
              key: 'tamplatecccc',
              placeholder: '请输入',
              options: [
                {
                  label: '互联网',
                  value: 's1'
                }, {
                  label: '金融',
                  value: 's2'
                }
              ]
            },
            {
              type: 'input',
              label: '联系人',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '联系电话',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '联系邮箱',
              key: 'emil',
              placeholder: '请输入',
              rule: [
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            }
          ]
        },
        {
          title: '开票信息',
          span: 24,
          itemSpan: 8,
          children: [
            {
              type: 'input',
              label: '开户银行',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '账号',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '电话',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '纳税人识别号',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '开票地址',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            }
          ]
        },
        {
          title: '工商信息',
          span: 24,
          itemSpan: 8,
          children: [
            {
              type: 'input',
              label: '统一社会信用代码',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '纳税人识别号',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '注册号',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '组织机构代码',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '法定代表人',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '国籍',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '注册资本/万',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '经营状态',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'date-picker',
              label: '成立日期',
              key: 'date3',
              placeholder: '请选择日期',
              rule: [
                { required: true, message: '请选择', trigger: 'change' }
              ]
            },
            {
              type: 'input',
              label: '公司类型',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            }, {
              type: 'input',
              label: '人员规模',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '营业期限',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '登记机关',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '核准日期',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '英文名',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '所属地区',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '所属行业',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '注册地址',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '经营范围',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            }
          ]
        },
        {
          title: '基础条款',
          span: 24,
          itemSpan: 8,
          minHeight: 150,
          padding: '0 10px 0',
          margin: '',
          children: [
            {
              type: 'input',
              label: '租赁面积',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { required: true, message: '该项为必填', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'date-picker',
              label: '签订时间',
              key: 'date3',
              placeholder: '请选择日期',
              rule: [
                { required: true, message: '请选择', trigger: 'change' }
              ]
            },
            {
              type: 'date-picker',
              label: '计租时间',
              key: 'date3',
              placeholder: '请选择日期',
              rule: [
                { required: true, message: '请选择', trigger: 'change' }
              ]
            },
            {
              type: 'date-picker',
              label: '结束时间',
              key: 'date3',
              placeholder: '请选择日期',
              rule: [
                { required: true, message: '请选择', trigger: 'change' }
              ]
            },
            {
              type: 'input',
              label: '押金设置(元)',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'select',
              label: '租期划分',
              key: 'tamplate',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请选择', trigger: 'change' }
              ],
              options: [
                {
                  label: '按起始日划分',
                  value: 's1'
                }, {
                  label: '商业',
                  value: 's2'
                }
              ]
            },
            {
              type: 'input',
              label: '付款周期(月)',
              key: 'i',
              placeholder: '几月一付',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '收款日',
              key: 'i',
              placeholder: '每月收款日',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '提前收租(月)',
              key: 'i',
              placeholder: '提前几个月收租金',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'select',
              label: '计费类型',
              key: 'tamplate',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请选择', trigger: 'change' }
              ],
              options: [
                {
                  label: '按实际天数计费',
                  value: 's1'
                }, {
                  label: '车位合同模板',
                  value: 's2'
                }
              ]
            }
          ]
        },
        {
          title: '房源租期条款',
          span: 24,
          itemSpan: 8,
          minHeight: 150,
          padding: '0 10px 0',
          margin: '',
          children: [
            {
              type: 'date-picker',
              label: '开始时间',
              key: 'date3',
              placeholder: '请选择日期',
              rule: [
                { required: true, message: '请选择', trigger: 'change' }
              ]
            },
            {
              type: 'date-picker',
              label: '结束时间',
              key: 'date3',
              placeholder: '请选择日期',
              rule: [
                { required: true, message: '请选择', trigger: 'change' }
              ]
            },
            {
              type: 'input',
              label: '合同单价(元/㎡·天)',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { required: true, message: '该项为必填', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '年租金',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { required: true, message: '该项为必填', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '月租金',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { required: true, message: '该项为必填', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            }
          ]
        },
        {
          title: '物业费基础条款',
          span: 24,
          itemSpan: 8,
          minHeight: 150,
          padding: '0 10px 0',
          margin: '',
          children: [
            {
              type: 'input',
              label: '管理面积',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'date-picker',
              label: '签订时间',
              key: 'date3',
              placeholder: '请选择日期',
              rule: [
                { required: true, message: '请选择', trigger: 'change' }
              ]
            },
            {
              type: 'date-picker',
              label: '计费时间',
              key: 'date3',
              placeholder: '请选择日期',
              rule: [
                { required: true, message: '请选择', trigger: 'change' }
              ]
            },
            {
              type: 'date-picker',
              label: '结束时间',
              key: 'date3',
              placeholder: '请选择日期',
              rule: [
                { required: true, message: '请选择', trigger: 'change' }
              ]
            },
            {
              type: 'input',
              label: '押金(元)',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { required: true, message: '该项为必填', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '付款周期(月)',
              key: 'i',
              placeholder: '几月一付',
              rule: [
                { required: true, message: '该项为必填', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '收款日',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { required: true, message: '该项为必填', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '收款日',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { required: true, message: '该项为必填', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '提前收费(月)',
              key: 'i',
              placeholder: '提前几个月收物业费',
              rule: [
                { required: true, message: '该项为必填', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            }
          ]
        },
        {
          title: '物业费条款',
          span: 24,
          itemSpan: 8,
          minHeight: 150,
          padding: '0 10px 0',
          margin: '',
          children: [
            {
              type: 'date-picker',
              label: '开始时间',
              key: 'date3',
              placeholder: '请选择日期',
              rule: [
                { required: true, message: '请选择', trigger: 'change' }
              ]
            },
            {
              type: 'date-picker',
              label: '结束时间',
              key: 'date3',
              placeholder: '请选择日期',
              rule: [
                { required: true, message: '请选择', trigger: 'change' }
              ]
            },
            {
              type: 'input',
              label: '合同单价(元/㎡·天)',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { required: true, message: '该项为必填', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '年物业费',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { required: true, message: '该项为必填', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '月物业费',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { required: true, message: '该项为必填', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            }
          ]
        }
      ],
      contractInfoState: false,
      contractInfo_header: {
        title: '正常执行',
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
      dialogHeight: 700
    }
  },
  methods: {
    handleAddContract () {
      this.addContractVisible = true
    },
    contractState (row) {
      this.contractInfoState = true
      this.contractInfo_header.data = row
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
      this.$message('这里是' + i)
    },
    customOption (chart, dataset, data) {
      let dv = dataset.createView().source(data)
      chart.source(dv)
      chart.interval().position('name*value').color('#3adc21')
    }
  },
  created () {
    [1, 2, 3, 4, 5, 6, 7, 8].forEach(item => {
      this.tableData.push(
        {
          a: 'xxx' + item,
          b: '协力大厦' + item,
          c: 'XXX公司' + item,
          d: '2015-10-10',
          e: '2016-01-01',
          f: '到期未处理',
          g: '100',
          h: '刘某人',
          i: '否',
          j: 200000 + item
        }
      )
    })
    for (let i = 0; i < 24; i++) {
      this.yearList.push({
        name: 'yue' + i,
        value: (Math.random() * 100)
      })
    }
    // console.log(this.yearList)
  },
  mounted () {
    this.dialogHeight = document.documentElement.clientHeight
    console.log(document.documentElement.clientHeight, 'document.documentElement.clientHeight')
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/style/index.less';
  .el-card{
    margin-bottom: 20px;
  }
</style>
