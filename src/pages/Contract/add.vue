<template>
  <div  style="width: 950px">
    <el-card>
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
    <ParkForm :formList="addContractFormList" :itemList="[]"></ParkForm>
  </div>

</template>

<script>
export default {
  name: 'add',
  data () {
    return {
      addContractFormList: [
        {
          title: '客户信息',
          span: 24,
          itemSpan: 12,
          minHeight: 450,
          children: [
            {
              type: 'input',
              label: '租客名称',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '联系人',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '证件号码',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'select',
              label: '行业分类',
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
              label: '电话',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '邮箱',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '租客编码',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            }
          ]
        }, {
          title: '开票信息',
          span: 24,
          minHeight: 450,
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
            },
            {
              type: 'checkbox',
              label: '标签选择',
              key: 'c',
              options: [
                {
                  label: '美食',
                  value: 'vdd1'
                }, {
                  label: '美食美食',
                  value: 'vdd2'
                }
              ]
            }
          ]
        },
        {
          title: '工商信息',
          span: 24,
          itemSpan: 12,
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
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
