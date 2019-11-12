<template>
  <div>
    <el-card style="width: 100%">
      <!--      <div slot="header" class="clearfix">-->
      <!--        <span>条件筛选</span>-->
      <!--      </div>-->
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
      <g2-column :is-bar="false"
                 :data="yearList"
                 style="width: 100%"
                 :height="300"
                 :axis-name="{name:'月份', value:'到期合同数（份）'}">
      </g2-column>
    </el-card>
    <el-card>
      <el-table
        :data="tableData"
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
          label="合同编号">
        </el-table-column>
        <el-table-column
          prop="d"
          label="签订日">
        </el-table-column>
        <el-table-column
          prop="e"
          label="开始日期">
        </el-table-column>
        <el-table-column
          prop="f"
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
          prop="i"
          label="是否续签">
        </el-table-column>
        <el-table-column
          prop="j"
          label="合同金额">
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      title="新建合同"
      :visible.sync="addContractVisible"
      width="600px"
      :before-close="handleClose">
      <div>
        <ParkForm :formList="addContractFormList"></ParkForm>
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
      tableData: [{
        a: 'xxx-1',
        b: '协力大厦',
        c: 'number',
        d: '2015-10-10',
        e: '2016-01-01',
        f: '到期未处理',
        g: '100',
        h: '刘某人',
        i: '否',
        j: 200000
      }],
      activeName: 'first',
      yearList: [
      ],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      addContractVisible: false,
      addContractFormList: [
        {
          title: '合同信息',
          children: [
            {
              type: 'select',
              label: '模版选择',
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
              label: '合同编号',
              key: 'i',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            }, {
              type: 'select',
              label: '跟进人',
              key: 'followPerson',
              placeholder: '请选择',
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
              type: 'date-picker',
              label: '签订时间',
              key: 'date',
              placeholder: '请选择日期',
              rule: [
                { required: true, message: '请选择', trigger: 'change' }
              ]
            }, {
              type: 'date-picker',
              label: '计租时间',
              key: 'date2',
              placeholder: '请选择日期',
              rule: [
                { required: true, message: '请选择', trigger: 'change' }
              ]
            }, {
              type: 'date-picker',
              label: '失效时间',
              key: 'date3',
              placeholder: '请选择日期',
              rule: [
                { required: true, message: '请选择', trigger: 'change' }
              ]
            }
          ]
        }, {
          title: '租客信息',
          children: [
            {
              type: 'input',
              label: '租客',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'select',
              label: '行业',
              key: 'tenantIndustry',
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
              label: '法人',
              key: 'fr',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            }, {
              type: 'input',
              label: '签订人',
              key: 'qdr',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            }, {
              type: 'input',
              label: '联系方式',
              key: 'zklxr',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            }
          ]
        }, {
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
          a: 'xxx' + item,
          b: '协力大厦' + item,
          c: 'number' + item,
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
  }
}
</script>

<style lang="less" scoped>
  .el-card{
    margin-bottom: 20px;
  }
</style>
