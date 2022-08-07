<template>
  <div class="dashboard-container">
    <div class="app-container">
      <Search>
        <template #default>
          <el-form-item label="人员搜索：">
            <el-input placeholder="请输入" v-model="usernameValue" clearable></el-input>
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
        <div class="personnal">
          <Button icon="el-icon-circle-plus-outline" class="xinjian"
            >新建</Button
          >
        </div>
        <Table :tableData="tableData">
          <template #default>
            <el-table-column type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column
              v-for="(item, index) in personnelList"
              :key="index"
              :property="item.property"
              :label="item.label"
              :width="item.width"
            />

            <el-table-column label="操作">
              <span>修改</span>
              <span class="perple-del">删除</span>
            </el-table-column>
          </template>
        </Table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            :page-size="10"
            :total="+$store.state.person.personnelList.totalCount"
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
import Button from '@/components/Juan/Button'
import Table from '@/components/Juan/Table'
export default {
  components: {
    Search,
    Button,
    Table,
  },
  data() {
    return {
      usernameValue: '',
      pageIndex: 1,
      personnelList: [
        { property: 'userName', label: '人员名称', width: '200px' },
        { property: 'regionName', label: '归属区域', width: '200px' },
        { property: 'roleName', label: '角色', width: '200px' },
        { property: 'mobile', label: '联系电话', width: '200px' },
      ],
      tableData: [],
    }
  },

  created() {
    this.getPersonnelList()
  },

  methods: {
    async getPersonnelList(id) {
      await this.$store.dispatch('person/getPersonnelList', id)
      const list = []
      this.$store.state.person.personnelList.currentPageRecords.forEach(
        (item) => {
          list.push({
            userName: item.userName,
            regionName: item.regionName,
            roleName: item.role.roleName,
            mobile: item.mobile,
          })
        },
      )
      this.tableData = list
    },
    async nextClick() {
      this.pageIndex++
      this.getPersonnelList({
        pageIndex: this.pageIndex,
      })
    },
    async prevClick() {
      this.pageIndex--
      this.getPersonnelList({
        pageIndex: this.pageIndex,
      })
    },
    search() {
      this.getPersonnelList({
        userName: this.usernameValue,
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
.personnal {
  background-color: #fff;
  display: flex;
  margin-bottom: 20px;
}
</style>
