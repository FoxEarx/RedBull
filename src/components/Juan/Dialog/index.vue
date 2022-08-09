<template>
  <el-dialog
    :title="dialogTitle"
    :visible="visible"
    width="60%"
    @close="onClose"
  >
    <el-form
      :model="formData"
      :rules="formRules"
      ref="form"
      label-width="100px"
    >
      <el-form-item label=" 人员名称" prop="userName">
        <el-input
          v-model="formData.userName"
          placeholder="请输入"
          maxlength="12"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="roleId">
        <el-select
          v-model="formData.roleId"
          style="width: 100%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in employees"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话" prop="mobile">
        <el-input
          v-model="formData.mobile"
          placeholder="请输入"
          maxlength="11"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="负责区域" prop="regionName">
        <el-select
          v-model="formData.regionId"
          style="width: 100%"
          placeholder="请选择"
          @change="seletChange"
        >
          <el-option
            v-for="item in area"
            :key="item.id"
            :label="item.remark"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="头像" prop="image">
        <el-upload
          action="#"
          class="avatar-uploader"
          :show-file-list="false"
          :multiple="false"
          :http-request="httpRequest"
          :on-change="fileChange"
        >
          <img v-if="formData.image" :src="formData.image" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div class="el-upload__tip" slot="tip">
            支持扩展名：jpg、jpeg、png，文件不得大于100kb
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-checkbox v-model="formData.status">是否启用</el-checkbox>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button @click="onSave" type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getAreaList,
  getRoleList,
  updatImg,
  addPersonApi,
  editPersonApi,
} from '@/api/person'
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    dialogTitle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        userName: '',
        roleId: '',
        mobile: '',
        regionName: '',
        regionId: '',
        image: '',
        status: false,
      },
      loadingstate: false,
      formRules: {
        userName: [
          { required: true, message: '请输入名字', trigger: 'blur' },
          { min: 1, max: 5, message: '名字长度在5个字符以内', trigger: 'blur' },
        ],
        roleId: [{ required: true, message: '请选择角色', trigger: 'change' }],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' },
        ],
        regionName: [
          { required: true, message: '请选择区域', trigger: 'change' },
        ],
        image: [{ required: true, message: '请上传头像', trigger: 'change' }],
      },
      employees: [],
      area: [],
    }
  },
  computed: {},
  created() {
    this.getAreaList()
    this.getRoleList()
  },

  methods: {
    seletChange(val) {
      //选中的数据和options进行匹配
      var obj = {}
      obj = this.area.find(function (i) {
        return i.id === val
      }) //在change中获取到整条对象数据
      //   console.log(obj)
      this.formData.regionName = obj.remark
    },
    async getAreaList() {
      const res = await getAreaList({
        pageIndex: 1,
        pageSize: 10000,
      })
      this.area = res.data.currentPageRecords
      //   console.log(this.area)
    },
    async getRoleList() {
      const res = await getRoleList()
      //   console.log(res)
      this.employees = res.data
    },
    onClose() {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
      this.formData = {
        userName: '',
        roleId: '',
        mobile: '',
        regionName: '',
        regionId: '',
        image: '',
        status: false,
      }
    },
    async onSave() {
      await this.$refs.form.validate()
      try {
        if (this.formData.userId) {
          await editPersonApi(this.formData, this.formData.userId)
          this.$message.success('编辑成功')
          this.onClose()
          this.$emit('add-success')
        } else {
          await addPersonApi(this.formData)
          this.$message.success('新增成功')
          this.onClose()
          this.$emit('add-success')
          console.log(22)
        }
      } catch (err) {
        this.$message.error('操作失败')
      }
    },
    async httpRequest(file) {
      //   console.log(file)
      //   const formData = new FormData()
      //   formData.append('fileName', formData)
      //   const res = await updatImg(formData)
    },
    async fileChange(item, el) {
      var formdata = new FormData()
      if (item.size > 0.1 * 1024 * 1024) {
        return this.$message.error('图片大于100kb,上传失败')
      }
      if (
        !item.raw.type == 'image/jpeg' ||
        !item.raw.type == 'image/jpg' ||
        !item.raw.type == 'image/png'
      ) {
        return this.$message.error('仅支持扩展名：jpg、jpeg、png')
      } else {
        formdata.append('fileName', item.raw)
        await updatImg(formdata).then((res) => {
          if (res.status == 200) {
            this.formData.image = res.data
          }
        })
      }
    },
  },
}
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 18px;
  color: #8c939d;
  width: 78px;
  height: 78px;
  line-height: 78px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
