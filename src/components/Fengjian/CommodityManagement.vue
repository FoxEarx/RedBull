<template>
  <el-dialog
    title="新建商品信息"
    :visible.sync="isShow"
    width="30%"
    :before-close="handleClose"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="商品名称：" prop="skuName">
        <el-input
          v-model="form.skuName"
          placeholder="请输入"
          maxlength="15"
          show-word-limit
        ></el-input>
      </el-form-item>

      <el-form-item label="品牌：" prop="brandName">
        <el-input
          v-model="form.brandName"
          placeholder="请输入"
          maxlength="10"
          show-word-limit
        ></el-input>
      </el-form-item>

      <el-form-item label="商品价格(元)：" prop="price">
        <el-input
          v-model="form.price"
          placeholder="请输入"
          type="number"
          class="price"
        ></el-input>
      </el-form-item>

      <el-form-item label="商品类型：" prop="className">
        <el-select v-model="form.className" placeholder="请选择">
          <el-option
            :label="item.className"
            v-for="item in this.$store.state.commodityType.ClassName"
            :key="item.classId"
            :value="item.classId"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="规格：" prop="unit">
        <el-input
          v-model="form.unit"
          placeholder="请输入"
          maxlength="10"
          show-word-limit
        ></el-input>
      </el-form-item>

      <el-form-item label="商品图片：" prop="skuImage">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <p class="Tips">支持拓展名：jpg、png，文件不得大于100kb</p>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('cancel')">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getAddComm } from '@/api/CommodityType'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    EditList: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        skuName: '',
        brandName: '',
        price: '',
        className: '',
        unit: '',
      },
      imageUrl: '',
      skuImage: '',
      rules: {
        skuName: [{ required: true, message: '请输入商品名称', target: blur }],
        brandName: [{ required: true, message: '请输入品牌', target: blur }],
        price: [{ required: true, message: '请输入商品价格', target: blur }],
        className: [
          { required: true, message: '请输入商品类型', target: blur },
        ],
        unit: [{ required: true, message: '请输入规格', target: blur }],
        skuImage: [{ required: true, message: '请插入图片', target: blur }],
      },
      //   NewInformation: [],
      //   EditList: {},
    }
  },

  created() {},
  computed: {},
  methods: {
    async getAddComm() {
      const res = await getAddComm({
        skuName: this.form.skuName,
        skuImage: this.skuImage,
        price: this.form.price,
        classId: this.form.className,
        unit: this.form.unit,
        brandName: this.form.brandName,
      })
      console.log(res)
      res.data === true
        ? this.$message.success('新增成功')
        : this.$message.error('新增失败')
      this.$emit('cancel')
      this.$emit('NewList')
      this.form = {
        skuName: '',
        brandName: '',
        price: '',
        className: '',
        unit: '',
      }
      this.skuImage = ''
    },
    onSave() {
      this.$refs.form.validate()
      this.skuImage = this.imageUrl
      this.getAddComm()
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
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

<style scoped>
.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 0.5px solid #ccc;
  font-size: 28px;
  color: #8c939d;
  width: 110px;
  height: 110px;
  line-height: 110px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.Tips {
  text-align: center;
}
</style>
