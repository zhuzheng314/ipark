<template>
  <div>
    <el-card style="width: 100%">
      <!--      <div slot="header" class="clearfix">-->
      <!--        <span>条件筛选</span>-->
      <!--      </div>-->
      <el-select  size="small"
                  clearable
                  @change="fetchListSearch"
                  v-model="template_type" placeholder="合同模板类型">
        <el-option
          v-for="item in this.$store.state.dictionary.dictionaryType['template_type']"
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
        clearable
        @change="fetchListSearch"
        v-model="template_name">
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
      <GTable
        @current-change="handlePageClick"
        @prev-click="handlePageClick"
        @next-click="handlePageClick"
        @cell-click="download"
        :page="page"
        :tableLabel="$tableLabels.contractTamplate"
        :tableData="tableData">
        <template #renderButton="data">
          <span>
            <el-button type="text" @click="fetchGetBack(data.slotName)">修改</el-button>
            <el-button type="text" @click="download(data.slotName)">下载</el-button>
            <el-button type="text" @click="fetchRemove(data.slotName)">删除</el-button>
          </span>
        </template>
      </GTable>
    </el-card>
    <el-dialog
      :before-close="(done) => {
         this.$confirm('表单尚未提交确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        }"
      title="新建合同模板"
      :visible.sync="addVisible"
      width="600px">
      <div>
        <ParkForm
        @onSubmit="fetchAdd"
        @onCancel="() => {this.addVisible = false}"
        v-if="addVisible"
        :formList="$formsLabels.tamplateForm"
        :options="$store.getters.tamplateListOptions"
        :defaultValue="{}"
        :itemList="[]"
        ></ParkForm>
      </div>
    </el-dialog>
    <el-dialog
      :before-close="(done) => {
         this.$confirm('表单尚未提交确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        }"
      title="修改合同模板"
      :visible.sync="modifyVisible"
      width="600px">
      <div>
        <ParkForm
        @onSubmit="fetchModify"
        @onCancel="() => {this.modifyVisible = false}"
        v-if="modifyVisible"
        :formList="$formsLabels.tamplateForm"
        :options="$store.getters.tamplateListOptions"
        :defaultValue="defaultValue"
        :itemList="[]"
        ></ParkForm>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ParkForm from '@/components/ParkForm/index.vue'
export default {
  name: 'index',
  components: {
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
        }
      ],
      template_type: '',
      template_name: '',
      addVisible: false,
      modifyVisible: false,
      defaultValue: {},
      page: {
        page_no: 1,
        total: 0,
        page_size: 5
      },
      id: ''
    }
  },
  methods: {
    download (row) {
      if (row.attached) {
        let url = this.$urls.fileUrl + row.attached.upload[0].url
        window.open(url, '_blank')
      } else {
        this.$message.error('暂无可下载文件')
      }
    },
    handleClose () {

    },
    handleAddContract () {
      this.addVisible = true
    },
    fetchAdd (data) { // 添加合同模板
      let params = {
        ...data
      }
      this.$https.post(this.$urls.template.add, params)
        .then(res => {
          if (res.code === 1000) {
            this.fetchList()
            this.addVisible = false
            this.$message.success('添加成功')
          } else {
            this.$message.error('添加失败')
          }
        })
    },
    fetchRemove (data) { // 删除合同模板
      this.$confirm('此操作将永久删除该模板, 是否继续?', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        let params = {
          id: data.id
        }
        this.$https.post(this.$urls.template.remove, params).then((res) => {
          if (res.code === 1000) {
            this.fetchList()
            this.InfoState = false
            this.$message.success('删除成功')
          } else {
            this.$message.error('删除失败')
          }
        })
      })
    },
    fetchModify (data) { // 修改合同模板
      let params = {
        ...data,
        id: this.id
      }
      this.$https.post(this.$urls.template.modify, params).then((res) => {
        if (res.code === 1000) {
          this.$message.success('修改成功')
          this.defaultValue = {}
          this.fetchList()
          this.modifyVisible = false
        } else {
          this.$message.error('修改失败')
        }
      })
    },
    fetchList () { // 获取合同模板列表
      let params = {
        ...this.page,
        template_type: this.template_type,
        template_name: this.template_name
      }
      this.$https.post(this.$urls.template.get_list, params).then((res) => {
        if (res.code === 1000 && res.list.length) {
          let list = res.list
          let params = ['template_type']
          this.$dictionary.tableData(list, params)
          this.page.total = res.total
          this.tableData = []
          this.tableData = res.list
        } else {
          this.page.total = 0
          this.$message.warning('未找到相关数据')
          this.tableData = []
        }
      })
    },
    fetchListSearch () {
      this.page.page_no = 1
      this.fetchList()
    },
    fetchGetBack (data) {
      this.id = data.id
      let params = {
        id: this.id
      }
      this.$https.post(this.$urls.template.get_back, params).then(res => {
        if (res.code === 1000) {
          let data = res
          this.defaultValue = data
          this.modifyVisible = true
        } else {
          this.$message.error('获取信息失败')
        }
      })
    },
    handlePageClick (num) { // 点击页码时
      this.page.page_no = num
      this.fetchList()
    }
  },
  created () {
    this.fetchList()
  }
}
</script>

<style lang="less" scoped>
  .el-card{
    margin-bottom: 20px;
  }
</style>
