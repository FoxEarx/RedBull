<template>
  <el-button
    type="primary"
    :icon="icon"
    :style="{ background: color, color: textColor }"
    >{{ text }}</el-button
  >
</template>

<script>
export default {
  data() {
    return {}
  },

  created() {},

  methods: {},

  props: {
    text: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: () => '',
    },
    color: {
      type: String,
      default: () => '#5f84ff',
    },
    textColor: {
      type: String,
      default: () => '#ffffff',
    },
  },
}
</script>

<style scoped>
.el-button--primary {
  background-color: #5f84ff;
  padding: 12px 15.5px;
  border: unset;
}
</style>
