<template>
  <div>
    <el-card style="width: 100%">
      <!--      <div slot="header" class="clearfix">-->
      <!--        <span>条件筛选</span>-->
      <!--      </div>-->
      <el-select  size="small"
                  multiple
                  v-model="value" placeholder="设备类型">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-input
        placeholder="搜索房号或设备类型"
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
      >设备</el-button>
    </el-card>
    <el-card>
      <el-table
        :data="tableData"
        @row-click="equipmentState"
        style="width: 100%">
        <el-table-column
          prop="a"
          label="楼宇名称">
        </el-table-column>
        <el-table-column
          prop="b"
          label="楼层">
        </el-table-column>
        <el-table-column
          prop="c"
          label="房号">
        </el-table-column>
        <el-table-column
          prop="d"
          label="设备名称">
        </el-table-column>
        <el-table-column
          prop="e"
          label="设备类型">
        </el-table-column>
        <el-table-column
          prop="f"
          label="设备状态">
        </el-table-column>
        <el-table-column
          prop="g"
          label="设备单价">
        </el-table-column>
        <el-table-column
          prop="n"
          label="本期读书">
        </el-table-column>
        <el-table-column
          prop="t"
          label="本期录入时间">
        </el-table-column>
        <el-table-column
          prop="n"
          label="上期读书">
        </el-table-column>
        <el-table-column
          prop="t"
          label="上期录入时间">
        </el-table-column>
      </el-table>
      <div style="width: 100%; text-align: right; padding-top: 20px">
        <el-pagination layout="prev, pager, next" :total="1000"> </el-pagination>
      </div>
    </el-card>

    <el-dialog
      title="新建设备"
      :visible.sync="addContractVisible"
      width="600px">
      <div>
        <ParkForm :formList="addContractFormList" :itemList="[]"></ParkForm>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addContractVisible = false">取 消</el-button>
        <el-button type="primary" @click="addContractVisible = false">确 定</el-button>
      </span>
    </el-dialog>

<!--      设备详情-->
      <el-drawer
      title="设备详情"
      custom-class="drawer-r"
      :visible.sync="equipmentInfoState"
      size="1186px"
      direction="rtl">
      <HeaderCard :data="equipmentInfo_header"></HeaderCard>
      <HeaderInfo type=1 :data="equipmentInfo_info"></HeaderInfo>
      <div class="drawer-body" style="height: 700px;">
        <BodyCard type=1 :data="equipmentInfo_body1"></BodyCard>
        <BodyCard type=1 :data="equipmentInfo_body2"></BodyCard>
        <BodyCard type=1 :data="equipmentInfo_body3"></BodyCard>
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
      options: [
        {
          value: '选项2',
          label: '水表'
        }, {
          value: '选项3',
          label: '电表'
        }, {
          value: '选项4',
          label: '煤气'
        }, {
          value: '选项5',
          label: '其他'
        }
      ],
      value: '',
      addContractVisible: false,
      addContractFormList: [
        {
          title: '设备信息',
          children: [
            {
              type: 'select',
              label: '设备类型',
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
              label: '设备名称',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '设备单价',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '设备读数',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'input',
              label: '设备读数',
              key: 'tenantName',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'date-picker',
              label: '抄录时间',
              key: 'fr',
              placeholder: '请输入',
              rule: [
                { required: true, message: '请输入合同编号', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ]
            },
            {
              type: 'textarea',
              label: '备注',
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
      equipmentInfoState: false,
      equipmentInfo_header: {
        title: '',
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
      equipmentInfo_info: {},
      equipmentInfo_body1: {},
      equipmentInfo_body2: {},
      equipmentInfo_body3: {}

    }
  },
  methods: {
    handleAddContract () {
      this.addContractVisible = true
    },
    equipmentState (row) {
      console.log(row)
      this.equipmentInfo_header.title = row.d
      this.equipmentInfo_info = {
        label: [
          { prop: 'a', label: '设备类型' },
          { prop: 'b', label: '设备状态' },
          { prop: 'c', label: '设备单价' }
        ],
        tableData: [{
          a: row.e,
          b: row.f,
          c: row.g
        }]
      }
      this.equipmentInfo_body1 = {
        title: '所属资产',
        info: [
          { name: '楼宇名称', value: row.a },
          { name: '楼层', value: row.b },
          { name: '房号', value: row.c }
        ]
      }
      this.equipmentInfo_body2 = {
        title: '本期读数',
        info: [
          { name: '本期读数', value: row.n },
          { name: '本期录入时间', value: row.t }
        ]
      }
      this.equipmentInfo_body3 = {
        title: '上期读数',
        info: [
          { name: '上期读数', value: row.n },
          { name: '上期录入时间', value: row.t }
        ]
      }

      this.equipmentInfoState = true
    },
    handleClose () {}
  },
  created () {
    [1, 2, 3, 4, 5, 6, 7, 8].forEach(item => {
      this.tableData.push(
        {
          a: 'xxx-xx-' + item,
          b: '楼' + item,
          c: item + '01',
          d: item % 2 === 0 ? 'xxx型号' : 'yyy型号',
          e: '水表',
          f: item % 2 === 0 ? '启用' : '停用',
          g: '20000/度',
          n: 20000,
          t: '2017-01-02'
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
</style>
