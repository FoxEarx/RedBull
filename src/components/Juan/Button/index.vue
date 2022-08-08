<template>
  <el-button :icon="icon">
    <span><slot></slot></span>
  </el-button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      // default: false
    },
  },

  data() {
    return {}
  },

  created() {},

  methods: {},
}
</script>

<style scoped lang="scss">
.el-button--default {
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: 80px !important;
  height: 36px;
  padding: 0;
  border: none;
  color: #fff;
}
.xinjian {
  background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
  color: #fff;
  &:hover {
    background: linear-gradient(135deg, #ff7d43, #db3602) !important;
  }
}
</style>
