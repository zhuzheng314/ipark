<template>
  <div>
    <el-card style="width: 100%">
      <!--      <div slot="header" class="clearfix">-->
      <!--        <span>条件筛选</span>-->
      <!--      </div>-->
      <el-select  size="small"
                  v-model="value1" placeholder="合同模板类型">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-input
        placeholder="搜索合同模板"
        size="small"
        style="width: 220px; margin-left: 15px"
        prefix-icon="el-icon-search"
        v-model="value2">
      </el-input>

      <el-button
        style="float: right"
        type="primary"
        icon="el-icon-plus"
        size="small"
        @click="handleAddContract"
      >新建合同模板</el-button>
    </el-card>
    <el-card>
<!--      <el-table-->
<!--        :data="tableData"-->
<!--        style="width: 100%">-->
<!--        <el-table-column-->
<!--          prop="a"-->
<!--          label="模板编号">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="b"-->
<!--          label="模板名称">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="c"-->
<!--          label="模板类型">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="d"-->
<!--          label="状态">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="e"-->
<!--          label="模板描述">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="e"-->
<!--          label="操作">-->
<!--          <template>-->
<!--            <el-button type="text">下载</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table>-->
<!--      <div style="width: 100%; text-align: right; padding-top: 20px">-->
<!--        <el-pagination layout="prev, pager, next" :total="1000"> </el-pagination>-->
<!--      </div>-->

      <GTable
        @row-click="contractState"
        :tableLabel="$tableLabels.contractTamplate"
        :tableData="tableData">
      </GTable>
    </el-card>

    <el-dialog
      title="新建合同模板"
      :visible.sync="addContractVisible"
      width="600px"
      :before-close="handleClose">
      <div>
        <ParkForm :formList="[]" :itemList="$formsLabels.tamplateForm"></ParkForm>
      </div>
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
      yearList: [
      ],
      options: [{
        label: '房屋租赁',
        value: 's1'
      }, {
        label: '物业保洁',
        value: 's2'
      }, {
        label: '花木租赁',
        value: 's3'
      }, {
        label: '场地租赁',
        value: 's4'
      }, {
        label: '设备租赁',
        value: 's5'
      }, {
        label: '其他',
        value: 's6'
      }],
      value1: '',
      value2: '',
      addContractVisible: false
      // tamplateFormList: [
      //   {
      //     type: 'select',
      //     label: '模板类型',
      //     key: 'tamplate',
      //     placeholder: '请输入',
      //     rule: [
      //       { required: true, message: '请选择', trigger: 'change' }
      //     ],
      //     options: [
      //       {
      //         label: '房屋租赁',
      //         value: 's1'
      //       }, {
      //         label: '物业保洁',
      //         value: 's2'
      //       }, {
      //         label: '花木租赁',
      //         value: 's3'
      //       }, {
      //         label: '场地租赁',
      //         value: 's4'
      //       }, {
      //         label: '设备租赁',
      //         value: 's5'
      //       }, {
      //         label: '其他',
      //         value: 's6'
      //       }
      //     ]
      //   }, {
      //     type: 'input',
      //     label: '模板名称',
      //     key: 'i',
      //     placeholder: '请输入',
      //     rule: [
      //       { required: true, message: '请输入模板名称', trigger: 'blur' },
      //       { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //     ]
      //   }, {
      //     type: 'textarea',
      //     label: '模板描述',
      //     key: 'i11',
      //     placeholder: '请输入模板描述',
      //     rule: [
      //       { required: true, message: '请输入模板描述', trigger: 'blur' },
      //       { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //     ]
      //   }, {
      //     type: 'upload',
      //     label: '模板描述',
      //     key: 'i11',
      //     placeholder: '请输入模板描述',
      //     rule: [
      //       { required: true, message: '请输入模板描述', trigger: 'blur' },
      //       { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //     ]
      //   }
      // ]
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
          e: '这是销售类合同的描述xxx'
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
</style>
