<template>
  <div class="btn" @click="$emit('Submit')" :class="[color, hover]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'default',
    },
    hover: {
      type: String,
      default: 'default',
    },
  },
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
.btn:hover {
  background-color: #5373e0;
}
.orange {
  background-image: linear-gradient(to right, #ff9240, #ff6222);
}
.orange:hover {
  background-image: linear-gradient(to right, #fc773d, #dd3905);
}
</style>
