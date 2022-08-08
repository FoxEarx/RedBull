<template>
  <el-button plain :style="{ color: color }">{{ text }}</el-button>
</template>

<script>
export default {
  data() {
    return {}
  },

  props: {
    text: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: () => '#5f84ff',
    },
  },

  created() {},

  methods: {},
}
</script>

<style scoped lang="less">
.el-button {
  border: unset;
  padding: 0;
  font-size: 14px;
  color: #5f84ff;
}
</style>
