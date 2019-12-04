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
      <ParkForm
        style="margin: -10px"
        :formList="$formsLabels.addContractForm"
        :options="defaultOptions"
        :itemList="[]">
      </ParkForm>
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
