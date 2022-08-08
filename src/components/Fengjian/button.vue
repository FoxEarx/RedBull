<template>
  <div class="btn" @click="$emit('Submit')">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  created() {},

  methods: {},
}
</script>

<style scoped>
.btn {
  width: 90px;
  height: 40px;
  border-radius: 5px;
  background-color: #5f84ff;
  line-height: 40px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  color: #fff;
}
</style>
