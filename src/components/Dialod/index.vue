<template>
  <el-dialog :title="title" :visible="dialogVisible" width="33%">
    <slot />
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {}
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    dialogVisible: {
      type: Boolean,
      default: false,
      required: true,
    },
  },

  created() {},

  methods: {},
}
</script>

<style scoped lang="less">
/deep/.el-dialog {
  border-radius: 10px;
}
</style>
