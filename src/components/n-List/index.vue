<template>
  <div class="MainData">
    <template>
      <el-table :data="tableData" style="width: 100%" @cell-click="row">
        <el-table-column
          type="index"
          label="序号"
          width="100px"
        ></el-table-column>
        <el-table-column
          v-for="(item, index) in table"
          :key="index"
          :prop="item.prop"
          :label="item.label"
        >
        </el-table-column>
        <!-- <el-table-column label="图片">
          <slot name="img"></slot>
        </el-table-column> -->
        <el-table-column label="操作" v-if="show" :width="width">
          <slot name="operation"></slot>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  created() {
    this.row()
  },

  methods: {
    row(row) {
      this.$store.dispatch('location/getColumnInfo', row)
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
    show: {
      type: Boolean,
      default: true,
    },
    props: {
      tyep: String,
      default: '',
    },
  },
}
</script>

<style scoped lang="less">
.MainData {
  width: 100%;
}
</style>
