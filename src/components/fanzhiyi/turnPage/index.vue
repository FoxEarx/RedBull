<template>
  <div class="page">
    <span v-show="pageNum >= 11">
      共{{ pageNum }}条记录 第 {{ currentPage }}/{{ Math.ceil(sumPage) }}
      页
    </span>
    <el-pagination
      background
      :current-page="currentPage"
      :total="total"
      layout="prev, next"
      prev-text="上一页"
      next-text="下一页"
      @prev-click="prevClick"
      @next-click="nextClick"
      v-show="pageNum >= 11"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    pageNum: {
      type: Number,
      default: 1,
    },
    sumPage: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    prevClick(val) {
      this.$emit('prevClick', val)
    },
    nextClick(val) {
      this.$emit('nextClick', val)
    },
  },
}
</script>

<style lang="less" scoped>
.page {
  display: flex;
  span {
    color: #dbdfe5;
    font-size: 20px;
    margin-left: 20px;
    margin-top: 20px;
  }

  .el-pagination {
    flex: 1;
    text-align: right;
    margin-top: 20px;
    margin-right: 20px;

    /deep/button {
      background-color: #d5ddf8;
      width: 70px;
      height: 32px;
    }
  }
}
</style>
