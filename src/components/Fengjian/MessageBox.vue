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
            style="width: 80%"
            class="isInput"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AddButton from './Addbutton.vue'
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
  },
}
</script>
<style scoped></style>
