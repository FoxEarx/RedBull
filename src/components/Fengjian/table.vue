<template>
  <el-table :data="tableData" style="width: 100%">
    <!-- :data="titleBody" -->
    <el-table-column
      v-if="isIndex === true"
      type="index"
      label="序号"
      width="80"
    />
    <el-table-column
      v-for="(item, index) in table"
      :key="index"
      :label="item.label"
      :prop="item.prop"
      :style="{ width: isWidth }"
    >
    </el-table-column>
    <el-table-column
      label="操作"
      class="operation"
      width="100"
      v-if="isOeration === true"
    >
      <el-button
        type="text"
        size="small"
        @click.native="$emit('edit', tableData)"
        >修改</el-button
      >
      <el-button type="text" size="small" class="del" @click.native="open"
        >删除</el-button
      >
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
    isIndex: {
      type: Boolean,
      default: true,
    },
    isOeration: {
      type: Boolean,
      default: true,
    },
    isWidth: {
      type: Number,
      default: 270,
    },
  },
  data() {
    return {
      open() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
          })
          .catch(() => {})
      },
    }
  },
}
</script>
<style scoped>
.operation {
  display: flex;
}
.del {
  color: red;
}
</style>
