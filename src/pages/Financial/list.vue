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
        <el-table-column
          prop="f"
          label="操作">
          <template>
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      title="新建收付款账单"
      :visible.sync="addContractVisible"
      width="600px"
      :before-close="handleClose">
      <div>
        <ParkForm :formList="addContractFormList" :itemList="[]"></ParkForm>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
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
        { name: '应收（0笔）', value: 10000 },
        { name: '滞纳金', value: 10000 },
        { name: '实收', value: 10000 },
        { name: '调整', value: 10000 },
        { name: '转入', value: 10000 },
        { name: '需收（0笔）', value: 10000 }
      ],
      options: [{
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
      }],
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
        }, {
          title: '工单信息',
          children: [
            {
              type: 'input',
              label: '服务地点',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '发起人',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'select',
              label: '工单类型',
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
              label: '联系电话',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'date-picker',
              label: '预约服务时间',
              key: 'fr',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
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
              options: [
                {
                  label: '1',
                  value: '1',
                  children: [
                    {
                      label: '1-1',
                      value: '1-1',
                      children: [
                        {
                          label: '1-1-1',
                          value: '1-1-1',
                          children: [
                            {
                              label: '1-1-1-1',
                              value: '1-1-1-1'
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }, {
                  label: '2',
                  value: '2'
                },
                {
                  label: '3',
                  value: '3',
                  children: [
                    {
                      label: '3-1',
                      value: '3-1'
                    }
                  ]
                },
                {
                  label: '4',
                  value: '4',
                  children: [
                    {
                      label: '4-1',
                      value: '4-1',
                      children: [
                        {
                          label: '4-1-1',
                          value: '4-1-1'
                        },
                        {
                          label: '4-1-2',
                          value: '4-1-2'
                        }
                      ]
                    }
                  ]
                }
              ]
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
      ]
    }
  },
  methods: {
    handleAddContract () {
      this.addContractVisible = true
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
  .el-card{
    margin-bottom: 20px;
  }
  .simple-item{
    min-width: 140px;
    border-left: 2px solid rgb(230, 232, 238);
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
