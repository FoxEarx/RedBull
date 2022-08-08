<template>
  <div>
    <!-- 头部区域 Start -->
    <Search title="点位搜索">
      <!-- 下拉框 -->
      <div class="select">
        <span>区域搜索:</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </Search>
    <!-- 头部区域 End -->

    <!-- 列表区域 Start -->
    <el-card class="box-card">
      <!-- 新建按钮 -->
      <Button
        icon="el-icon-circle-plus-outline"
        text="新建"
        color="linear-gradient(135deg,#ff9743,#ff5e20)!important"
      ></Button>
      <!-- 主体内容 -->
      <NList :table="table" :tableData="position.currentPageRecords">
        <template #operation>
          <TextButton text="查看详情"></TextButton>
          <TextButton text="修改"></TextButton>
          <TextButton text="删除" color="red"></TextButton>
        </template>
      </NList>
      <!-- 分页 -->
      <Pagination
        :areaInfo="position"
        @nextPage="nextPage"
        @prevPage="prevPage"
        @currentPage="currentPage"
      ></Pagination>
    </el-card>
    <!-- 列表区域 End -->

    <!-- 弹出层 -->
    <Dialod :dialogVisible="dialogVisible"></Dialod>
  </div>
</template>

<script>
import Search from '@/components/Seartch'
import NList from '@/components/n-List'
import Button from '@/components/Button'
import Pagination from '@/components/Pagination'
import TextButton from '@/components/Text-Button'
import Dialod from '@/components/Dialod'
import { getPositionList, getLocationList } from '@/api'
export default {
  data() {
    return {
      position: {},
      table: [
        {
          label: '点位名称',
          prop: 'name',
        },
        {
          label: '所在区域',
          prop: 'region.name',
        },
        {
          label: '商圈类型',
          prop: 'businessType.name',
        },
        {
          label: '合作商',
          prop: 'ownerName',
        },
        {
          label: '详细地址',
          prop: 'addr',
        },
      ],
      value: '',
      options: [],
      dialogVisible: false,
    }
  },

  created() {
    this.getPositionList()
    this.getLocationList()
  },

  methods: {
    // 获取点位管理列表
    async getPositionList(pageIndex) {
      const res = await getPositionList(pageIndex)
      res.data.currentPageRecords.forEach((item) => {
        const arr = item.addr.split('-')
        item.addr = arr[arr.length - 1]
      })
      this.position = res.data
    },
    // 获取区域搜索信息
    async getLocationList() {
      const res = await getLocationList(1, '', 10000)
      res.data.currentPageRecords.forEach((item) => {
        this.options.push({ value: item.id, label: item.name })
      })
    },
    // 点击下一页
    nextPage() {
      this.getPositionList(++this.position.pageIndex)
    },
    // 点击上一页
    prevPage() {
      this.getPositionList(--this.position.pageIndex)
    },
    // 点击页数
    currentPage(val) {
      this.getPositionList(val)
    },
  },

  components: {
    Search,
    NList,
    Button,
    Pagination,
    TextButton,
    Dialod,
  },
}
</script>

<style scoped lang="less">
.select {
  width: 285px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 10px;
  span {
    font-size: 14px;
    margin-right: 12px;
  }
  .el-select {
    width: 203px;
  }
}
</style>
