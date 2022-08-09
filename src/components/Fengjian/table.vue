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
      <template slot-scope="scope">
        <el-button
          type="text"
          size="small"
          @click.native="$emit('edit', scope.row)"
          >修改</el-button
        >
        <el-button
          type="text"
          size="small"
          class="del"
          @click.native="open(scope.row.classId)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getDeletCommodity } from '@/api/CommodityType'
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
      classId: '',
    }
  },
  methods: {
    async getDeletCommodity() {
      const res = await getDeletCommodity(this.classId)
      console.log(res)
      res.data === true
        ? this.$message.success('删除成功')
        : this.$message.error('删除失败')
      this.$emit('Delet')
    },
    open(val) {
      this.classId = val
      this.$confirm('是否删除该项', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          console.log(val)
          this.getDeletCommodity()
        })
        .catch(() => {})
    },
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
