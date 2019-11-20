<template>
  <div class="add">
    <el-card class="progress">
      <div slot="header" class="clearfix">
        <el-page-header @back="goBack" content="新增合同">
        </el-page-header>
      </div>
      <div>
        <el-steps :active="1" finish-status="success">
          <el-step title="合同基础信息"></el-step>
          <el-step title="租赁条款"></el-step>
          <el-step title="物业条款"></el-step>
        </el-steps>

      </div>

    </el-card>

    <el-card class="form-wrap">
      <ParkForm style="margin: -10px" :formList="addContractFormList" :itemList="[]"></ParkForm>
      <div style="text-align: center; margin-top: 40px">
        <el-button>重置</el-button>
        <el-button type="primary">提交</el-button>
      </div>

    </el-card>
  </div>

</template>

<script>
import ElCard from 'element-ui/packages/card/src/main'
export default {
  name: 'add',
  components: { ElCard },
  data () {
    return {
      addContractFormList: [
        {
          title: '基础信息',
          span: 24,
          itemSpan: 6,
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
          itemSpan: 6,
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
          itemSpan: 6,
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
          itemSpan: 6,
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
          itemSpan: 6,
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
          itemSpan: 6,
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
          itemSpan: 6,
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
          itemSpan: 6,
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
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.add{
  width: 100%;
  position: relative;
  .progress{
    position:sticky;
    top: 0;
    width: 100%;
    z-index: 100;
  }
  .form-wrap{
    padding: 20px;
  }
}
</style>
