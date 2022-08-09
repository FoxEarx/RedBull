<template>
  <el-dialog title="策略详情" :visible="visible" width="630px" @close="onClose">
    <el-row>
      <el-col :span="6"
        ><span style="margin-left: 70px">策略详情：</span></el-col
      >
      <el-col :span="18"
        ><span> {{ currentEven }}</span></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="6"
        ><span style="margin-left: 70px">策略方案：</span></el-col
      >
      <el-col :span="18"
        ><List :tableData="currentInfo" :table="table"
      /></el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import List from '@/views/strategy/component/list'
export default {
  data() {
    return {
      table: [
        { prop: 'nodeName', label: '点位名称' },
        { prop: 'innerCode', label: '设备编号' },
      ],
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    currentInfo: {
      type: Array,
      required: true,
    },
    currentEven: {
      type: String,
    },
  },
  methods: {
    onClose() {
      this.$emit('update:visible', false)
    },
  },
  components: {
    List,
  },
}
</script>

<style scoped lang="less">
/deep/.el-dialog {
  border-radius: 10px;
  .el-dialog__title {
    font-weight: 700;
  }
}
.el-row {
  padding-bottom: 30px;
}
</style>
