<template>
  <div class="search">
    <el-form ref="form" :inline="true">
      <el-form-item label="策略搜索:">
        <el-input
          ref="id"
          v-model="search"
          placeholder="请输入"
          value=""
          clearable
        >
          ></el-input
        >
      </el-form-item>
      <!-- 查询按钮 -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="searchId"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      value1: '',
      search: '',
    }
  },

  created() {},

  methods: {
    searchId() {
      this.$emit('inpVal', this.search)
      // console.log(this.search)
    },
  },
}
</script>

<style scoped lang="scss">
.search {
  display: flex;
  width: 100%;
  background-color: #fff;
  height: 64px;
  padding-left: 17px;
  margin-bottom: 20px;
  align-items: center;
  font-weight: normal;
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>
