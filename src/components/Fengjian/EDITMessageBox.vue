<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="isShow"
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
        <el-button @click="$emit('cancel')">取 消</el-button>
        <el-button type="primary" @click="editCommodity">确 定</el-button>
        <!-- dialogVisible = false -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getEditCommodity } from '@/api/CommodityType'
export default {
  props: {
    title: {
      type: String,
      default: '提示',
    },
    isShow: {
      type: Boolean,
      default: false,
    },
    edit: {
      type: String,
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
  created() {
    console.log(this.isShow)
  },
  methods: {
    // 编辑指令
    async getEditCommodity() {
      const id = this.$store.state.commodityType.ClickInformation.classId
      const name = this.className
      const res = await getEditCommodity(id, name)
      console.log(res)
      res.data === true
        ? this.$message.success('修改成功')
        : this.$message.error('修改失败')
    },
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
    async editCommodity() {
      this.$refs.form.validate()
      this.className = this.form.name
      await this.getEditCommodity()
      this.form.name = ''
      this.$emit('cancel')
      this.$emit('EnterEdit')
    },

    // async getAddCommodity() {
    //   const res = await getAddCommodity({
    //     className: this.className,
    //   })
    //   console.log(res)
    //   res.data === true
    //     ? this.$message.success('添加成功')
    //     : this.$message.error('添加失败')
    // },
    // async addCommodity() {
    //   this.$refs.form.validate()
    //   this.className = this.form.name
    //   await this.getAddCommodity()
    //   this.form.name = ''
    //   this.dialogVisible = false
    //   this.$emit('GetCommodity')
    // },
  },
}
</script>
<style scoped></style>
