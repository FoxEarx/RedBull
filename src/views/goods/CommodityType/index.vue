<template>
  <div>
    <!-- 顶部 -->
    <el-card class="box-card" shadow="never">
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
      <MessageBox></MessageBox>
      <Table :tableData="tableData" :table="table" :isWidth="300"></Table>
      <div class="block">
        <el-pagination
          v-if="this.tableData.length > 10"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="100"
          layout="total, prev, pager, next"
          :total="totalCount"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 主体区域 -->
  </div>
</template>

<script>
import Button from '@/components/Fengjian/button.vue'
import Table from '@/components/Fengjian/table.vue'
import MessageBox from '@/components/Fengjian/MessageBox.vue'
import { getCommodityList, getCommoditySearch } from '@/api/CommodityType'
export default {
  data() {
    return {
      form: {
        name: '',
      },
      index: 0,
      pageIndex: 1,
      // 总条数
      totalCount: 0,
      totalPage: 0,
      currentPage1: 5,
      query: [],
      // 渲染列表
      // 未筛选列表
      ToList: [],

      tableData: [],
      table: [{ prop: 'className', label: '商品类型名称' }],
    }
  },
  components: {
    Button,
    Table,
    MessageBox,
  },
  created() {
    this.getCommodityList()
  },

  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    // 获取所有商品类型
    async getCommodityList() {
      this.totalCount === 0 ? (this.totalCount = 150) : this.totalCount
      const res = await getCommodityList({
        pageIndex: this.pageIndex,
        pageSize: this.totalCount,
      })
      console.log(res.data)
      this.totalPage = res.data.totalPage
      // console.log(res.data.totalCount)
      this.totalCount = parseInt(res.data.totalCount)

      const List = res.data.currentPageRecords
      List.forEach((item) => {
        this.ToList.push({
          index: this.index + 1,
          className: item.skuClass.className,
        })
      })
      // brandName
      //  className: item.skuClass.className,
      console.log('1111', this.ToList)
      const ToList = this.ToList
      // ---------------------------------------------------------去重

      const result = []
      const obj = {}
      for (var i = 0; i < ToList.length; i++) {
        if (!obj[ToList[i].className]) {
          result.push(ToList[i])
          obj[ToList[i].className] = true
        }
      }

      this.tableData = result
      console.log(this.tableData)

      // ---------------------------------------------------------去重
    },
    async getCommoditySearch() {
      const res = await getCommoditySearch({
        className: this.query,
      })
      console.log(res)
      const currentPageRecords = res.data.currentPageRecords
      this.tableData = [
        { index: 1, className: currentPageRecords[0].className },
      ]
    },
    submit() {
      this.$refs.form.validate()
      this.query = this.form.name
      this.getCommoditySearch()
    },
  },
}
</script>

<style scoped lang="less">
.el-form-item {
  margin-bottom: unset;
}
.el-input {
  width: 280px;
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
}
</style>
