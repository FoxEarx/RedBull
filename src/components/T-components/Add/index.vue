<template>
  <div>
    <el-button
      @click="$emit('addEquipment')"
      class="el-icon-circle-plus-outline el-button-1"
      >新建</el-button
    >
    <!-- 新增设备弹出层 -->
    <el-dialog
      :title="type"
      :visible="dialogVisible1"
      width="30%"
      :before-close="handleClose"
      @close="closeAdd"
      ><slot></slot>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAdd">取消</el-button>
        <el-button type="primary" @click="$emit('tureaddEquipment')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    dialogVisible1: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
    },
  },
  created() {},

  methods: {
    handleClose(done) {
      done()
    },
    closeAdd() {
      this.$emit('closeAdd')
    },
  },
}
</script>

<style scoped lang="scss">
.el-button-1 {
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: 80px !important;
  height: 36px;
  padding: 0;
  background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
  border: none;
  color: #fff;
  margin-right: 10px;
}
</style>
