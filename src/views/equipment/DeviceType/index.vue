<template>
  <div>
    <mainSearch :firstInput="'型号搜索：'" @search="search"></mainSearch>
    <div class="Main">
      <Add
        :type="layerHeader"
        :dialogVisible1="dialogVisible1"
        @addEquipment="addEquipment"
        @closeAdd="closeAdd"
        @tureaddEquipment="tureaddEquipment"
        ><el-form
          ref="formAdd"
          :model="formAdd"
          :rules="rulesADD"
          label-width="100px"
        >
          <el-form-item label="型号名称：" style="width: 100%" prop="name">
            <el-input
              size="medium"
              maxlength="10"
              type="text"
              show-word-limit
              placeholder="请输入"
              v-model="formAdd.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="型号编码：" style="width: 100%" prop="model">
            <el-input
              size="medium"
              maxlength="15"
              type="text"
              show-word-limit
              placeholder="请输入（限数字、字母、下划线、中划线）"
              v-model="formAdd.model"
            ></el-input>
          </el-form-item>
          <el-form-item label="货道行数：" style="width: 100%" prop="vmRow">
            <el-input
              size="medium"
              type="number"
              placeholder="请输入"
              v-model="formAdd.vmRow"
            ></el-input>
          </el-form-item>
          <el-form-item label="货道列数：" style="width: 100%" prop="vmCol">
            <el-input
              size="medium"
              type="number"
              placeholder="请输入"
              v-model="formAdd.vmCol"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="货道容量："
            style="width: 100%"
            prop="channelMaxCapacity"
          >
            <el-input
              size="medium"
              type="number"
              placeholder="请输入"
              v-model="formAdd.channelMaxCapacity"
            ></el-input>
          </el-form-item>
          <el-form-item label="设备图片：" style="width: 100%" prop="imageUrl">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="formAdd.imageUrl"
                :src="formAdd.imageUrl"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span>支持扩展名：jpeg，文件不得大于2M</span>
          </el-form-item>
        </el-form>
      </Add>
      <List
        :tableData="tableData"
        :table="table"
        :width="'230px'"
        @clickList="clickList"
      >
        <template #operation>
          <el-button type="text" @click="ModifyEquipment">修改</el-button>
          <el-button style="color: #ff5a7f" @click="open" type="text"
            >删除</el-button
          >
        </template>
      </List>
      <Paging
        :total="total"
        @nextClick="nextClick"
        @prevClick="prevClick"
        @changeCount="changeCount"
      ></Paging>
    </div>
  </div>
</template>

<script>
import mainSearch from '@/components/T-components/mainSearch'
import Paging from '@/components/T-components/paging'
import List from '@/components/T-components/List'
import Add from '@/components/T-components/Add'
import {
  addEquipmentModel,
  changeEquipmentModel,
  delEquipmentModel,
} from '@/api'
export default {
  data() {
    return {
      layerHeader: '',
      total: '',
      formAdd: {
        name: '',
        model: '',
        vmRow: '',
        vmCol: '',
        channelMaxCapacity: '',
        imageUrl: '',
      },
      rulesADD: {
        name: [{ required: true, message: '请输入' }],
        model: [{ required: true, message: '请输入' }],
        vmRow: [{ required: true, message: '请输入' }],
        vmCol: [{ required: true, message: '请输入' }],
        channelMaxCapacity: [{ required: true, message: '请输入' }],
        imageUrl: [{ required: true, message: '请上传' }],
      },
      table: [
        { prop: 'name', label: '型号名称' },
        { prop: 'model', label: '型号编码' },
        { prop: 'image', label: '设备图片' },
        { prop: 'vmRow', label: '货道行' },
        { prop: 'vmCol', label: '货道列' },
        { prop: 'channelMaxCapacity', label: '设备容量' },
      ],
      tableData: [],
      number: 1,
      index: 1,
      ListItemInfo: [],
      ListId: 0,
      dialogVisible1: false,
      add: false,
    }
  },

  async created() {
    await this.$store.dispatch('equipment/getDeviceType')
    this.getList()
  },

  methods: {
    ModifyEquipment() {
      setTimeout(() => {
        this.dialogVisible1 = true
        this.layerHeader = '修改设备类型'
        console.log(this.ListItemInfo)
        this.formAdd.name = this.ListItemInfo.name
        this.formAdd.model = this.ListItemInfo.model
        this.formAdd.vmRow = this.ListItemInfo.vmRow
        this.formAdd.vmCol = this.ListItemInfo.vmCol
        this.formAdd.channelMaxCapacity = this.ListItemInfo.channelMaxCapacity
        this.formAdd.imageUrl = this.ListItemInfo.image
      })
    },
    handleAvatarSuccess(res, file) {
      this.formAdd.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPEG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPEG) {
        this.$message.error('上传图片只能是 JPEG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2M!')
      }
      return isJPEG && isLt2M
    },
    handleClose(done) {
      done()
    },
    clickList(row) {
      this.ListItemInfo = row
      if (row.index <= 10) {
        this.ListId = row.index - 1
      } else {
        if (row.index % 10 === 0) {
          return (this.ListId = 9)
        }
        this.ListId = (row.index % 10) - 1
      }
    },
    getList() {
      this.total = this.$store.state.equipment.DeviceType.totalCount
      this.number = 1
      const list = []
      this.$store.state.equipment.DeviceType.currentPageRecords.forEach(
        (item) => {
          list.push({
            index: (this.index - 1) * 10 + this.number,
            name: item.name,
            model: item.model,
            image: item.image,
            vmRow: item.vmRow,
            vmCol: item.vmCol,
            channelMaxCapacity: item.channelMaxCapacity,
          })
          this.number++
        },
      )
      this.tableData = list
      console.log(this.tableData)
    },
    async open() {
      // try {
      //   const id =
      //     this.$store.state.equipment.DeviceType.currentPageRecords[this.ListId]
      //       .typeId
      //   await delEquipmentModel(id)
      //   this.$message.success('删除成功')
      //   await this.$store.dispatch('equipment/getDeviceType', this.index)
      //   this.getList()
      // } catch (error) {
      this.$notify({
        title: '提示',
        message: '演示系统，不支持此操作',
        type: 'warning',
      })
      // }
    },
    addEquipment() {
      this.dialogVisible1 = true
      this.add = true
      this.layerHeader = '新增设备类型'
    },
    closeAdd() {
      this.dialogVisible1 = false
      this.add = false
      this.$refs.formAdd.resetFields()
    },
    async tureaddEquipment() {
      await this.$refs.formAdd.validate()
      if (this.add) {
        await addEquipmentModel(this.formAdd)
        this.$message.success('新增成功')
        await this.$store.dispatch('equipment/getDeviceType', this.index)
        this.getList()
      } else {
        const id =
          this.$store.state.equipment.DeviceType.currentPageRecords[this.ListId]
            .typeId
        await changeEquipmentModel(this.formAdd, id)
        this.$message.success('修改成功')
        await this.$store.dispatch('equipment/getDeviceType', this.index)
        this.getList()
      }

      this.dialogVisible1 = false
      this.add = false
    },
    async nextClick() {
      this.index++
      await this.$store.dispatch('equipment/getDeviceType', this.index)
      this.getList()
    },
    async prevClick() {
      this.index--
      await this.$store.dispatch('equipment/getDeviceType', this.index)
      this.getList()
    },
    async changeCount(index) {
      this.index = index
      await this.$store.dispatch('equipment/getDeviceType', this.index)
      this.getList()
    },
    async search(value) {
      await this.$store.dispatch('equipment/getSearchDeviceType', value)
      this.getList()
    },
  },
  components: {
    mainSearch,
    Paging,
    List,
    Add,
  },
}
</script>

<style scoped lang="less">
.Main {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
  .avatar-uploader .el-upload {
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    border-radius: 6px;
    border: 1px dashed #d9d9d9;
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .MainNav {
    margin-bottom: 20px;
    display: flex;
  }
  .el-button-2 {
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    width: 80px !important;
    height: 36px;
    padding: 0;
    background-color: #fbf4f0 !important;
    border: none;
    color: #655b56 !important;
  }
}
</style>
