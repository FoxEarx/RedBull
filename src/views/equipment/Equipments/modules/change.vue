<template>
  <el-dialog
    title="提示"
    :visible="dialogVisibleXG"
    width="30%"
    :before-close="handleClose"
    @close="closeAdd"
  >
    <el-form ref="form" label-width="100px">
      <el-form-item label="机器编号：" value="1"
        >{{
          $store.state.equipment.AllEquipment.currentPageRecords[ListId]
            .innerCode
        }}
      </el-form-item>
      <el-form-item label="供货时间：" value="2">{{ timer }}</el-form-item>
      <el-form-item label="设备类型：" value="3">{{
        $store.state.equipment.AllEquipment.currentPageRecords[ListId].type.name
      }}</el-form-item>
      <el-form-item label="设备容量：" value="8">{{
        $store.state.equipment.AllEquipment.currentPageRecords[ListId].type
          .channelMaxCapacity
      }}</el-form-item>
      <el-form-item label="设备点位：" value="4">
        <el-select v-model="nodeIds" placeholder="请选择" style="width: 100%">
          <el-option
            v-for="item in AllPoint"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="合作商：" value="5">{{
        $store.state.equipment.AllEquipment.currentPageRecords[ListId].ownerName
      }}</el-form-item>
      <el-form-item label="所属区域：" value="6">{{
        $store.state.equipment.AllEquipment.currentPageRecords[ListId].region
          .name
      }}</el-form-item>
      <el-form-item label="设备地址：" value="7">{{
        $store.state.equipment.AllEquipment.currentPageRecords[ListId].node.name
      }}</el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeAdd">取 消</el-button>
      <el-button type="primary" @click="trueChange">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import dayjs from 'dayjs'
export default {
  data() {
    return {
      nodeIds: this.nodeId,
      time: '',
      name: '',
    }
  },

  props: {
    dialogVisibleXG: {
      type: Boolean,
      default: false,
    },
    ListId: {
      type: Number,
      required: true,
    },
    AllPoint: {
      type: Array,
    },
    nodeId: {
      type: String,
      default: '',
    },
  },
  computed: {
    timer() {
      this.time = dayjs(
        this.$store.state.equipment.AllEquipment.currentPageRecords[this.ListId]
          .createTime,
      ).format('YYYY.MM.DD hh:mm:ss')
      return this.time
    },
  },
  watch: {},

  methods: {
    handleClose(done) {
      done()
    },
    closeAdd() {
      this.$emit('closeAdd')
    },
    trueChange() {
      this.$emit('trueChange', this.nodeIds)
      console.log(this.ListId)
    },
  },
}
</script>

<style scoped lang="less"></style>
