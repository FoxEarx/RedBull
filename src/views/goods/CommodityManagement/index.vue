<template>
  <div>
    <!-- 顶部 -->
    <el-card class="Top-box-card" shadow="never">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="商品类型搜索：" class="TypeSearch">
          <el-input
            v-model="form.name"
            placeholder="请输入"
            class="isInput"
          ></el-input>
          <Button class="btn" @Submit="submit"
            ><i class="el-icon-search"></i> 查询</Button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 顶部 -->

    <!-- 主体区域 -->
    <el-card class="main" shadow="never">
      <div class="button">
        <Addbutton color="orange" hover="orange:hover" @Add="Add"
          ><i class="el-icon-circle-plus-outline"></i> 新建</Addbutton
        >
        <Button fonsColor="black" class="Data" hover="black:hover"
          >导入数据</Button
        >
      </div>
      <Table
        :tableData="tableData"
        :table="table"
        :isWidth="150"
        :isImage="true"
        :isDelete="false"
        v-loading="loading"
        @edit="edit"
      ></Table>

      <div class="block">
        <el-pagination
          hide-on-single-page
          :current-page.sync="currentPage1"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="totalCount"
          @next-click="nextData"
          @prev-click="prevClick"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </el-card>
    <CommodityManagement
      :isShow="MessageShow"
      @cancel="cancel"
      title="新增商品"
      @NewList="NewList"
      :EditList="EditList"
    ></CommodityManagement>
    <!-- 修改 ---------------------------------------------------------------->
    <el-dialog title="修改商品信息" :visible.sync="dialogVisible" width="30%">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="120px"
        class="form-control"
      >
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
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改 ---------------------------------------------------------------->
  </div>
</template>

<script>
import {
  getAllCommodity,
  getCommodityList,
  getEditComm,
} from '@/api/CommodityType'
import Button from '@/components/Fengjian/button.vue'
import Addbutton from '@/components/Fengjian/Addbutton.vue'
import Table from '@/components/Fengjian/table.vue'
import CommodityManagement from '@/components/Fengjian/CommodityManagement.vue'
export default {
  data() {
    return {
      form: {
        name: '',
      },
      // 页码数
      pageIndex: 0,
      index: 0,
      tableData: [],
      search: '',
      // { prop: 'skuImage', label: '商品图片' },
      table: [
        { prop: 'skuName', label: '商品名称' },
        { prop: 'brandName', label: '品牌' },
        { prop: 'unit', label: '规格' },
        { prop: 'price', label: '商品价格' },
        { prop: 'className', label: '商品类型' },
        { prop: 'createTime', label: '创建时间' },
      ],
      pageIndex: 0,
      totalCount: 0,
      pageSize: 10,
      totalPage: 0,
      currentPage1: 1,
      MessageShow: false,
      className: [],
      loading: false,
      EditList: {},

      // 修改
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
      skuId: '',
      classId: '',
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
    }
  },
  components: {
    Button,
    Addbutton,
    Table,
    CommodityManagement,
  },
  created() {
    this.getAllCommodity()
    this.getCommodityList()
  },

  methods: {
    edit(val) {
      this.EditList = val
      this.form = {
        skuName: this.EditList.skuName,
        brandName: this.EditList.brandName,
        price: this.EditList.price,
        className: this.EditList.className,
        unit: this.EditList.unit,
      }
      this.imageUrl = this.EditList.skuImage
      this.skuId = this.EditList.skuId
      this.classId = this.EditList.classId
      this.dialogVisible = true

      console.log('EditList', this.EditList)
    },
    handleCurrentChange(val) {
      console.log(val)
      this.pageIndex = val
      this.tableData = []
      this.getAllCommodity()
    },
    NewList() {
      this.tableData = []
      this.getAllCommodity()
    },
    // 获取商品类型
    async getCommodityList() {
      this.loading = true
      const res = await getCommodityList()
      // console.log(res)
      this.loading = false
      const List = res.data.currentPageRecords
      List.forEach((item) => {
        this.className.push({
          className: item.className,
          classId: item.classId,
        })
      })
      // console.log(this.className)
      this.$store.dispatch('commodityType/getClassName', this.className)
    },
    cancel() {
      this.MessageShow = false
    },
    Add() {
      this.MessageShow = true
      this.NorE = 0
      console.log(this.NorE)
    },
    // 上一页
    prevClick() {
      this.pageIndex--
      this.tableData = []
      this.getAllCommodity()
    },
    // 下一页
    nextData() {
      this.pageIndex++
      this.tableData = []
      this.getAllCommodity()
    },
    // 搜索查询
    async submit() {
      this.$refs.form.validate()
      console.log(this.form.name)
      this.search = this.form.name
      this.tableData = []
      this.getAllCommodity()
    },
    // 获取商品列表
    async getAllCommodity() {
      this.pageIndex === 0 ? (this.pageIndex = 1) : this.pageIndex
      const res = await getAllCommodity({
        pageIndex: this.pageIndex,
        pageSize: 10,
        skuName: this.search,
      })
      console.log(res)
      this.totalPage = res.data.totalPage
      this.totalCount = parseInt(res.data.totalCount)
      const List = res.data.currentPageRecords
      List.forEach((item) => {
        this.tableData.push({
          index: this.index + 1,
          skuName: item.skuName,
          skuImage: item.skuImage,
          brandName: item.brandName,
          unit: item.unit,
          price: item.price,
          className: item.skuClass.className,
          createTime: item.createTime,
          skuId: item.skuId,
          classId: item.skuClass.classId,
        })
      })
      // console.log(this.tableData)
    },
    // 修改------------------------------------------------------------------------
    // async getAddComm() {
    //   const res = await getAddComm({
    //     skuName: this.form.skuName,
    //     skuImage: this.skuImage,
    //     price: this.form.price,
    //     classId: this.form.className,
    //     unit: this.form.unit,
    //     brandName: this.form.brandName,
    //   })
    //   console.log(res)
    //   res.data === true
    //     ? this.$message.success('新增成功')
    //     : this.$message.error('新增失败')
    //   this.$emit('cancel')
    //   this.$emit('NewList')
    //   this.form = {
    //     skuName: '',
    //     brandName: '',
    //     price: '',
    //     className: '',
    //     unit: '',
    //   }
    //   this.skuImage = ''
    // },
    async getEditComm() {
      const res = await getEditComm({
        skuId: this.skuId,
        skuName: this.form.skuName,
        skuImage: this.imageUrl,
        price: this.form.price,
        classId: this.classId,
        unit: this.form.unit,
        brandName: this.form.brandName,
        skuId: this.skuId,
      })
      console.log(res)
      res.data === true
        ? this.$message.success('修改成功')
        : this.$message.error('修改失败')
      this.dialogVisible = false
      this.tableData = []
      this.getAllCommodity()
    },
    onSave() {
      // this.$refs.form.validate()
      // this.skuImage = this.imageUrl
      // this.getAddComm()
      this.getEditComm()
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

<style scoped lang="less">
.Top-box-card {
  .el-input {
    width: 280px;
  }
}
.el-form-item {
  margin-bottom: unset;
}

.TypeSearch {
  position: relative;
  left: 0;
  top: 0;

  .btn {
    position: absolute;
    top: 0px;
    left: 300px;
  }
}
.main {
  margin-top: 20px;
  .button {
    display: flex;
    .Data {
      margin-left: 20px;
    }
  }
}
.form-control {
  width: 100%;
  .el-form-item {
    margin-bottom: 30px;
  }
}
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
