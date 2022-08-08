<template>
  <div>
    <!-- 头部搜索框 Start -->
    <Search title="区域搜索" @searchArea="searchArea"></Search>
    <!-- 头部搜索框 End -->

    <!-- 主体列表 Start -->
    <el-card class="box-card" shadow="never">
      <!-- 新建按钮 -->
      <Button
        icon="el-icon-circle-plus-outline"
        text="新建"
        color="linear-gradient(135deg,#ff9743,#ff5e20)!important"
        @click.native="addArea"
      ></Button>
      <!-- 列表 -->
      <NList :tableData="areaInfo.currentPageRecords" :table="table">
        <template #operation="{ data }">
          <TextButton
            text="查看详情"
            @click.native="diaShow(data)"
          ></TextButton>
          <TextButton text="修改" @click.native="editDialod"></TextButton>
          <TextButton
            text="删除"
            color="red"
            @click.native="delAreaInfo"
          ></TextButton>
        </template>
      </NList>
      <!-- 分页 -->
      <Pagination
        :areaInfo="areaInfo"
        @nextPage="nextPage"
        @prevPage="prevPage"
        @currentPage="currentPage"
      ></Pagination>
    </el-card>
    <!-- 主体列表 End -->

    <!-- 详情弹窗 -->
    <Dialog :title="title" :dialogVisible="dialogVisible" @close="onClose">
      <!-- 修改区域详情 -->
      <el-form
        :model="formData"
        :rules="formRules"
        v-if="title !== '区域详情'"
        ref="form"
      >
        <el-form-item label="区域名称:" prop="regionName">
          <el-input
            maxlength="15"
            v-model="formData.regionName"
            show-word-limit
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注说明:" prop="remark">
          <el-input
            type="textarea"
            maxlength="40"
            v-model="formData.remark"
            show-word-limit
            placeholder="请输入备注(不超过40字)"
          ></el-input>
        </el-form-item>
        <div class="flootButton">
          <Button
            text="取消"
            color="#fbf4f0"
            textColor="#333"
            @click.native="onClose"
          ></Button>
          <Button
            text="确认"
            @click.native="editAreaInfo"
            class="el-button--primary1"
            color="linear-gradient(135deg,#ff9743,#ff5e20)"
          ></Button>
        </div>
      </el-form>

      <!-- 区域详情查看 -->
      <el-form :model="formData" v-else>
        <el-form-item label="区域名称:">{{ columnInfo.name }}</el-form-item>
        <el-form-item label="包含点位:">
          <NList
            class="dialog"
            :table="areaTable"
            :tableData="nodeInfo"
            :show="false"
          ></NList>
        </el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>

<script>
import Dialog from '@/components/Dialod'
import Search from '@/components/Seartch'
import NList from '@/components/n-List'
import Button from '@/components/Button'
import TextButton from '@/components/Text-Button'
import Pagination from '@/components/Pagination'
import {
  getLocationList,
  getAreaInfo,
  editAreaInfo,
  delAreaInfo,
  addArea,
} from '@/api'
export default {
  data() {
    return {
      table: [
        {
          label: '区域名称',
          prop: 'name',
        },
        {
          label: '点位数',
          prop: 'nodeCount',
        },
        {
          label: '备注说明',
          prop: 'remark',
        },
      ],
      areaInfo: {},
      dialogVisible: false,
      areaTable: [
        {
          label: '点位名称',
          prop: 'name',
        },
        {
          label: '设备数量',
          prop: 'vmCount',
        },
      ],
      nodeInfo: [],
      columnInfo: {},
      formData: {
        regionName: '',
        remark: '',
      },
      formRules: {
        regionName: [
          {
            required: true,
            trigger: 'change',
            message: '请输入',
          },
        ],
        remark: [
          {
            required: true,
            trigger: 'change',
            message: '请输入',
          },
        ],
      },
      title: '',
    }
  },

  created() {
    this.getLocationList()
  },

  methods: {
    // 获取区域管理列表
    async getLocationList(pageIndex) {
      const res = await getLocationList(pageIndex)
      this.areaInfo = res.data
    },
    // 搜索区域
    async searchArea(val) {
      if (val === '') {
        return
      }
      const res = await getLocationList(this.areaInfo.pageIndex, val)
      this.areaInfo = res.data
    },
    // 新建区域
    addArea() {
      this.title = '新增区域'
      this.dialogVisible = true
    },
    // 获取上一页区域管理列表
    prevPage() {
      this.getLocationList(--this.areaInfo.pageIndex)
    },
    // 获取下一页区域管理列表
    nextPage() {
      this.getLocationList(++this.areaInfo.pageIndex)
    },
    // 鼠标点数换页
    currentPage(val) {
      this.getLocationList(val)
    },
    // 点击查看详情
    diaShow() {
      this.title = '区域详情'
      setTimeout(async () => {
        this.dialogVisible = true
        this.columnInfo = this.$store.state.location.columnInfo
        const res = await getAreaInfo(this.columnInfo.id)
        this.nodeInfo = res.data.currentPageRecords
      })
    },
    // 点击修改区域
    editDialod() {
      this.title = '修改区域'
      setTimeout(() => {
        this.dialogVisible = true
        const { name, remark, id } = this.$store.state.location.columnInfo
        this.formData.regionName = name
        this.formData.remark = remark
        this.formData.id = id
      })
    },
    // 点击确定 更新/添加 区域信息
    async editAreaInfo() {
      await this.$refs.form.validate()
      if (this.formData.id) {
        await editAreaInfo(this.formData)
        this.$message.success('修改成功')
      } else {
        await addArea(this.formData)
        this.$message.success('添加成功')
      }
      this.onClose()
      this.getLocationList(this.areaInfo.pageIndex)
    },
    // 点击删除当前区域信息
    async delAreaInfo() {
      try {
        await this.$confirm('是否确定删除该区域?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
        })
        const res = await delAreaInfo(this.$store.state.location.columnInfo.id)
        this.$message.success('删除成功')
        this.onClose()
        this.getLocationList(this.areaInfo.pageIndex)
      } catch (error) {
        this.$message.error(error.response.data)
      }
    },
    // 关闭弹窗
    onClose() {
      this.dialogVisible = false
      setTimeout(() => {
        this.formData = {
          regionName: '',
          remark: '',
        }
      }, 200)
    },
  },

  components: {
    Search,
    NList,
    Button,
    TextButton,
    Pagination,
    Dialog,
  },
}
</script>

<style scoped lang="less">
.el-card {
  border: unset;
}
/deep/.el-form-item__label {
  width: 130px;
  color: #606266;
  font-weight: 400;
}
/deep/.el-form-item__content {
  display: flex;
}
/deep/.dialog {
  .el-table td,
  .el-table th {
    padding: 0;
  }
  .el-table th {
    background: rgb(243, 246, 251);
  }
  .el-table::before {
    background-color: #fff;
  }
  .el-table__row {
    height: 44px;
    border-top: 0;
  }
  .el-table td,
  .el-table th.is-leaf {
    border-bottom: unset;
  }
}
/deep/.flootButton {
  display: flex;
  align-items: center;
  justify-content: center;
  .el-button--primary {
    width: 80px;
  }
  .el-button--primary1 {
    margin-left: 34px;
  }
}
</style>
