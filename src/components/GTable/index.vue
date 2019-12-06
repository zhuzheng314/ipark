<template>
  <div>
    <el-table
      ref="table"
      :data="tableData"
      style="width:100%"
      @row-click="handleRowClick"
    >
      <el-table-column
        v-for="(item,index) in tableLabel"
        :width="item.width ? item.width : ''"
        :key="index"
        :label="item.label"
        :prop="item.prop">
        <template slot-scope="scope">
          <span v-if="item.renderTags">
            <el-tag size="mini">{{scope.row[item.prop]}}</el-tag>
          </span>
          <span v-else-if="item.renderButton">
            <slot name="renderButton" :slotName="scope.row"></slot>
            <!-- <el-button type="text">下载</el-button> -->
          </span>
          <span v-else>{{scope.row[item.prop]}}</span>
        </template>
      </el-table-column>
    </el-table>

    <div style="width: 100%; text-align: right; padding-top: 20px">
      <el-pagination
        @current-change="handleCurrentChange"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
        layout="prev, pager, next"
        :total="page.total"
        :current-page="page.page_no"
        :page-size="page.page_size"
      > </el-pagination>
    </div>
  </div>

</template>

<script>
export default {
  name: 'index',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableLabel: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableOption: {
      type: Object,
      default: () => {
        return {}
      }
    },
    page: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    handleSortChange (val) { // 排序
      this.$emit('handleSortChange', val)
    },
    handleSelectionChange (val) {
      this.$emit('handleSelectionChange', val)
    },
    handleRowClick (row, column, event) { // 表格
      this.$emit('row-click', row, column, event)
    },
    handleCurrentChange (page) { // 分页器
      this.$emit('current-change', page)
    },
    handlePrevClick (page) { // 分页器 上一页
      this.$emit('prev-click', page)
    },
    handleNextClick (page) { // 分页器 下一页
      this.$emit('next-click', page)
    }
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>
