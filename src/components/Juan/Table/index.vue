<template>
  <el-table
    ref="singleTable"
    :data="tableData"
    highlight-current-row
    style="width: 100%"
    :header-cell-style="tableHeaderColor"
  >
   <slot name="default"></slot>
  </el-table>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
    },
  },
  data() {
    return {}
  },

  created() {},

  methods: {
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: rgb(243, 246, 251);rgb(102, 102, 102);font-weight: 500;'
      }
    },
  },
}
</script>

<style scoped lang="scss">
.el-table thead {
  color: #666;
  font-weight: 500;
  background-color: #666;
}
</style>
<style lang="scss">
.el-table td.el-table__cell {
  border-bottom: none;
}
.cell {
  span {
    color: #5f84ff;
    cursor: pointer;
  }
  .perple-del{
    color: red;
    margin-left: 3px;
  }
}
</style>
