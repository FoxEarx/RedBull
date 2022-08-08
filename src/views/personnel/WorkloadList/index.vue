<template>
  <div class="dashboard-container">
    <div class="app-container">
      <Search>
        <template #default>
          <el-form-item label="人员搜索：">
            <el-input
              placeholder="请输入"
              v-model="usernameValue"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="角色：">
            <el-select v-model="roleNameValue" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              class="search-button"
              type="primary"
              icon="el-icon-search"
              @click="search"
              >查询</el-button
            >
          </el-form-item>
        </template>
      </Search>
      <div class="result">
        <Table :tableData="tableData">
          <template #default>
            <el-table-column type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column
              v-for="(item, index) in workLoadList"
              :key="index"
              :property="item.property"
              :label="item.label"
              :width="item.width"
            />

            <el-table-column label="操作">
              <span>查看详情</span>
            </el-table-column>
          </template>
        </Table>
        <!-- <Pagination :total="total" @pageChange="pageChange"></Pagination> -->
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            :page-size="10"
            :total="+$store.state.person.workList.totalCount"
            @next-click="nextClick"
            @prev-click="prevClick"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Juan/Search'
import Table from '@/components/Juan/Table'
export default {
  components: {
    Search,
    Table,
  },
  data() {
    return {
      usernameValue: '',
      roleNameValue: '',
      isRepair: false,
      pageIndex: 1,
      workLoadList: [
        { property: 'userName', label: '人员名称', width: '200px' },
        { property: 'roleName', label: '角色', width: '200px' },
        { property: 'mobile', label: '联系电话', width: '200px' },
        { property: 'workCount', label: '完成工单(本月)', width: '200px' },
        { property: 'progressTotal', label: '进行中工单', width: '200px' },
        { property: 'cancelCount', label: '拒绝工单(本月)', width: '200px' },
      ],
      tableData: [],
      options: [
        {
          value: '0',
          label: '运营员',
        },
        {
          value: '1',
          label: '维修员',
        },
      ],
    }
  },

  created() {
    this.getUserWorkList()
  },

  methods: {
    async getUserWorkList(id) {
      await this.$store.dispatch('person/getUserWorkList', id)
      this.tableData = this.$store.state.person.workList.currentPageRecords
    },
    async nextClick() {
      this.pageIndex++
      this.getUserWorkList({
        pageIndex: this.pageIndex,
      })
    },
    async prevClick() {
      this.pageIndex--
      this.getUserWorkList({
        pageIndex: this.pageIndex,
      })
    },
    search() {
      if (this.roleNameValue == 0) {
        this.isRepair = false
      } else if (this.roleNameValue == 1) {
        this.isRepair = true
      }
      console.log(this.roleNameValue);
      this.getUserWorkList({
        userName: this.usernameValue,
        isRepair: this.isRepair,
      })
    },
  },
}
</script>

<style scoped lang="scss">
.result {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
}
</style>
