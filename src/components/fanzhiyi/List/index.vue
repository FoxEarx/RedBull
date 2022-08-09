<template>
  <div class="MainData">
    <template>
      <el-table :data="tableData" style="width: 100%" @row-click="currentId">
        <el-table-column type="index" label="序号" min-width></el-table-column>
        <el-table-column
          v-for="(item, index) in table"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          min-width
        >
        </el-table-column>
        <!-- <el-table-column label="图片">
          <slot name="img"></slot>
        </el-table-column> -->
        <el-table-column label="操作">
          <slot name="operation"></slot>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderId: '',
    }
  },

  created() {},

  methods: {
    currentId(row) {
      this.order = row.orderNo
      this.$emit('pushid', this.order)
    },
  },
  props: {
    //行数
    tableData: {
      type: Array,
    },
    //列数
    table: {
      type: Array,
    },
    //主体区域盒子宽度
    width: {
      type: String,
      default: '200px',
    },
  },
}
</script>

<style scoped lang="less">
.MainData {
  width: 100%;
}
</style>
