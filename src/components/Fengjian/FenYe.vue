<template>
  <div class="block">
    <el-pagination
      hide-on-single-page
      :current-page.sync="currentPage1"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="totalCount"
      @next-click="nextData"
      @prev-click="prevClick"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageIndex: 0,
      totalCount: 0,
      pageSize: 10,
      totalPage: 0,
      currentPage1: 1,
    }
  },

  created() {},

  methods: {
    // 上一页
    prevClick() {
      this.pageIndex--
      this.tableData = []
      this.getCommodityList()
    },
    // 下一页
    nextData() {
      this.pageIndex++
      this.tableData = []
      this.getCommodityList()
    },
  },
}
</script>

<style scoped></style>
