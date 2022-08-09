<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="index" label="序号" width="80" />
    <el-table-column
      v-for="(item, index) in table"
      :key="index"
      :label="item.label"
      :prop="item.prop"
      :style="{ width: isWidth }"
    >
    </el-table-column>
    <el-table-column label="操作">
      <!-- <template slot-scope="scope"> -->
      <el-button type="text" size="small">修改</el-button>
      <el-button type="text" size="small">删除</el-button>
      <!-- </template> -->
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    table: {
      type: Array,
    },
    tableData: {
      type: Array,
    },
    isWidth: {
      type: Number,
      default: 270 + 'px',
    },
  },
  data() {
    return {}
  },
}
</script>
