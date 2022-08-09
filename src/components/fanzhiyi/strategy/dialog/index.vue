<template>
  <el-dialog
    :title="dialogTitle"
    width="630px"
    :visible="visible"
    @close="onClose"
  >
    <div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="策略名称" prop="policyName">
          <el-input
            type="text"
            placeholder="请输入"
            v-model.trim="ruleForm.policyName"
            maxlength="15"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="策略方案" prop="discount">
          <el-input-number
            placeholder="请输入"
            v-model="ruleForm.discount"
            controls-position="right"
            @change="handleChange"
            :min="1"
            :max="100"
            style="width: 395px"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button
          type="primary"
          style="
            background: #fbf4f0 !important;
            border: none;
            color: #666;
            margin-bottom: 20px;
            width: 80px;
          "
          @click="cancel"
          >取消</el-button
        >
        <el-button
          type="primary"
          style="
            background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
            border: none;
            margin-bottom: 20px;
            width: 80px;
            margin-left: 30px;
          "
          @click="confirm"
          >确认</el-button
        >
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { addStrategy } from '@/api/strategy'
export default {
  data() {
    return {
      ruleForm: {
        policyName: '',
        discount: '',
      },
      createdTime: '',
      index: 2,
      rules: {
        policyName: [
          { required: true, message: '请输入策略名称', trigger: 'blur' },
          {
            min: 1,
            max: 15,
            message: '长度在 1 到 15 个字符',
            trigger: 'blur',
          },
        ],
        discount: [
          { required: true, message: '请选择策略方案', trigger: 'change' },
        ],
      },
    }
  },

  created() {},
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    evnt: {
      type: Object,
    },
  },
  computed: {
    dialogTitle() {
      return this.ruleForm.policyName ? '修改策略' : '新增策略'
    },
  },
  methods: {
    onClose() {
      this.$emit('update:visible', false)
    },
    handleChange(value) {
      // this.strategyScheme = value
      // console.log(this.strategyScheme)
    },
    // 确认
    async confirm() {
      try {
        if (this.ruleForm.policyName.length !== 0) {
          await addStrategy(this.ruleForm)
          await this.$store.dispatch('strategy/getStrategy')
          this.$emit('update:visible', false)
          this.$emit('getList')
          this.ruleForm = {
            policyName: '',
            discount: '',
          }
          this.$message.success('添加策略成功')
        } else {
          return this.$message.error('策略名称不能为空')
        }
      } catch (err) {
        this.$message.error('添加的策略名称已存在')
      }
    },
    // 取消
    cancel() {
      console.log('取消')
      this.$emit('update:visible', false)
      this.ruleForm = {
        policyName: '',
        discount: '',
      }
    },
  },
}
</script>

<style scoped lang="less">
/deep/.el-dialog {
  border-radius: 10px;
  .el-dialog__title {
    font-weight: 700;
  }
  .el-form-item {
    margin-left: 30px;
  }
  .el-input {
    width: 396px;
    align-items: center;
  }
  .el-form-item__content {
    /deep/.el-input-number {
      margin-left: 396px;
    }
  }
  .btn {
    text-align: center;
  }
}
</style>
