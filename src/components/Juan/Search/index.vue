<template>
  <div class="search">
    <el-form ref="form" :inline="true">
      <span><slot name="default"></slot></span>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
    }
  },

  created() {},

  methods: {},
}
</script>

<style lang="scss">
.search {
  display: flex;
  height: 64px;
  -webkit-box-align: center;
  align-items: center;
  margin-bottom: 20px;
  padding-left: 17px;
  background-color: #fff;
  .el-form--inline {
    .el-form-item {
      display: inline-block;
      margin-right: 10px;
      vertical-align: top;
      margin-bottom: 0px;
      .el-form-item__label {
        text-align: right;
        vertical-align: middle;
        font-size: 14px;
        color: #606266;
        padding: 0 12px 0 0;
        box-sizing: border-box;
        line-height: 36px;
      }
    }
    .el-form-item__content {
      display: inline-block;
      vertical-align: top;
      position: relative;
      font-size: 14px;
      .el-input__inner {
        height: 36px;
        line-height: 36px;
        padding-right: 30px;
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #d8dde3;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        outline: none;
        padding: 0 15px;
        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        width: 100%;
      }
    }
    .search-button {
      color: #fff;
      background-color: #5f84ff;
      border: none;
      transition: 0.1s;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      &:hover {
        background-color: #5974d9;
      }
    }
  }
}
</style>

<style lang="scss">
.el-input {
  outline-style: none;
  .el-input__inner:focus {
    border-color: #5f84ff !important;
  }
}
</style>
