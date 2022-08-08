<template>
  <div class="block">
    <el-pagination
      :page-count="areaInfo.totalPage - 1"
      layout="total, prev, pager, next, jumper"
      :total="areaInfo.totalCount - 0"
      @prev-click="prevPage"
      @next-click="nextPage"
      @current-change="currentPage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  props: {
    areaInfo: {
      required: true,
      type: Object,
    },
  },

  created() {},

  methods: {
    // 上一页按钮
    prevPage() {
      this.$emit('prevPage')
    },
    // 下一页按钮
    nextPage() {
      this.$emit('nextPage')
    },
    // 鼠标点击换页
    currentPage(val) {
      this.$emit('currentPage', val)
    },
  },
}
</script>

<style scoped lang="less">
.el-pagination {
  width: 100%;
  padding: 32px 16px;
}
</style>
