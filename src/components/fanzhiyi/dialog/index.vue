<template>
  <el-dialog title="订单详情" width="50%" :visible="visible" @close="onClose">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">未支付</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">订单编号：</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">商品名称：</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">订单编号：</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">商品名称：</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">订单编号：</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">商品名称：</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">订单编号：</div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">商品名称：</div>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {}
  },

  created() {},
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    onClose() {
      this.$emit('update:visible', false)
    },
  },
}
</script>

<style scoped lang="scss">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
</style>
