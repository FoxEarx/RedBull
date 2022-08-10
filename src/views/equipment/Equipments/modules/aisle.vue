<template>
  <div>
    <el-dialog
      title="货道设置"
      :visible="dialogVisibleHD"
      width="50%"
      :before-close="handleClose"
      @close="closeAdd"
    >
      <div>
        <div class="Header">
          <div>
            货道行数：{{
              $store.state.equipment.AllEquipment.currentPageRecords[
                this.ListId
              ].type.vmRow
            }}
          </div>
          <div>
            货道列数：{{
              $store.state.equipment.AllEquipment.currentPageRecords[
                this.ListId
              ].type.vmCol
            }}
          </div>
          <div>
            货道容量（个）：{{
              $store.state.equipment.AllEquipment.currentPageRecords[
                this.ListId
              ].type.channelMaxCapacity
            }}
          </div>
          <el-button
            size="medium"
            type="primary"
            @click="dialogVisibleZNPH = true"
            >智能排货</el-button
          >
        </div>
        <div>
          <el-row>
            <el-col :span="2.4"
              ><div class="grid-content bg-purple-dark">1</div></el-col
            >
          </el-row>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAdd">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleHD = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisibleZNPH"
      width="30%"
      :before-close="handleClose"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleZNPH = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibleZNPH = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisibleZNPH: false,
    }
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
  props: {
    dialogVisibleHD: {
      type: Boolean,
      default: false,
    },
    ListId: {
      type: [Number, String],
    },
  },
}
</script>

<style scoped lang="less">
.Header {
  padding: 0 30px;
  display: flex;
  background-color: #f3f6fb;
  height: 56px;
  line-height: 56px;
  margin-bottom: 10px;
  div {
    flex: 1;
  }
}
</style>
