<template>
  <el-dialog title="新增工单" width="630px" :visible="visible" @close="onClose">
    <div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="设备编号" prop="policyName">
          <el-input
            type="text"
            placeholder="请输入"
            v-model.trim="ruleForm.innerCode"
            maxlength="15"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="工单类型" prop="discount">
          <el-select v-model="ruleForm.productType" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运维人员" prop="discount">
          <el-select v-model="ruleForm.policyName" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="discount">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="ruleForm.policyName"
            maxlength="40"
            show-word-limit
          >
          </el-input>
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
import { addRepairOrder, getRepairOrderInfo } from '@/api/repairOrder'
export default {
  data() {
    return {
      ruleForm: {
        innerCode: '',
        productType: '',
        userName: '',
        remark: '',
      },
      index: 2,
      rules: {
        innerCode: [
          { required: true, message: '请输入设备编号', trigger: 'blur' },
        ],
        productType: [
          { required: true, message: '请选择工单类型', trigger: 'change' },
        ],
      },
      options: [
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶',
        },
      ],
    }
  },

  created() {},
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    evetnsj: {
      type: [Object, String],
    },
  },
  methods: {
    // 关闭
    onClose() {
      this.$emit('update:visible', false)
      this.ruleForm = {
        policyName: '',
        discount: '',
      }
    },
    handleChange(value) {
      // this.strategyScheme = value
      // console.log(this.strategyScheme)
    },
    // 确认
    confirm() {
      console.log(11)
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
  .el-textarea__inner {
    width: 400px;
  }
  .el-textarea .el-input__count {
    right: 75px;
  }
}
</style>
