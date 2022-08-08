<template>
  <div>
    <!-- 头部搜索框 Start -->
    <Search title="区域搜索"></Search>
    <!-- 头部搜索框 End -->

    <!-- 主体列表 Start -->
    <el-card class="box-card" shadow="never">
      <!-- 新建按钮 -->
      <Button
        icon="el-icon-circle-plus-outline"
        text="新建"
        color="linear-gradient(135deg,#ff9743,#ff5e20)!important"
      ></Button>
      <!-- 列表 -->
      <NList :tableData="areaInfo.currentPageRecords" :table="table">
        <template #operation="{ data }">
          <TextButton
            text="查看详情"
            @click.native="diaShow(data)"
          ></TextButton>
          <TextButton text="修改"></TextButton>
          <TextButton text="删除" color="red"></TextButton>
        </template>
      </NList>
      <!-- 分页 -->
      <Pagination
        :areaInfo="areaInfo"
        @nextPage="nextPage"
        @prevPage="prevPage"
        @currentPage="currentPage"
      ></Pagination>

      <!-- 详情弹窗 -->
    </el-card>

    <!-- 主体列表 End -->
    <Dialog title="区域详情" :dialogVisible="dialogVisible">
      <el-form>
        <el-form-item label="区域名称:">123123</el-form-item>
        <el-form-item label="包含点位:">
          <NList class="dialog" :table="areaTable" :show="false"></NList>
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
import { getLocationList, getAreaInfo } from '@/api'
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
          prop: '',
        },
        {
          label: '设备数量',
          prop: '',
        },
      ],
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
      console.log(val)
      this.getLocationList(val)
    },
    // 点击查看详情
    diaShow(data) {
      console.log(data)
      this.dialogVisible = true
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
}
</style>
