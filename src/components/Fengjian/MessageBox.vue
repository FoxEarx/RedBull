<template>
  <div>
    <AddButton color="orange" hover="orange:hover" @Add="Add"
      ><i class="el-icon-circle-plus-outline"></i> 新建</AddButton
    >
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="商品类型名称：">
          <el-input
            v-model="form.name"
            placeholder="请输入"
            style="width: 90%"
            class="isInput"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCommodity">确 定</el-button>
        <!-- dialogVisible = false -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AddButton from './Addbutton.vue'
import { getAddCommodity } from '@/api/CommodityType'
export default {
  props: {
    title: {
      type: String,
      default: '提示',
    },
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        name: '',
      },
      className: '',
    }
  },
  components: {
    AddButton,
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    Add() {
      this.dialogVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    async getAddCommodity() {
      const res = await getAddCommodity({
        className: this.className,
      })
      console.log(res)
      res.data === true
        ? this.$message.success('添加成功')
        : this.$message.error('添加失败')
    },
    async addCommodity() {
      this.$refs.form.validate()
      this.className = this.form.name
      await this.getAddCommodity()
      this.form.name = ''
      this.dialogVisible = false
      this.$emit('GetCommodity')
    },
  },
}
</script>
<style scoped></style>
