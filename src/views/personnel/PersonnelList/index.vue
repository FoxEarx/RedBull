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
          <Button
            icon="el-icon-circle-plus-outline"
            class="xinjian"
            @click.native="showAddDept"
            >新建</Button
          >
        </div>
        <Table :tableData="tableData">
          <template #default>
            <el-table-column type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column
              v-for="item in personnelList"
              :key="item.id"
              :property="item.property"
              :label="item.label"
              :width="item.width"
            />

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="onEdit(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  class="perple-del"
                  @click="onRemove(scope.row)"
                  >删除</el-button
                >
              </template>
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
      <!-- 弹层 -->
      <Dialog
        :dialogTitle="dialogTitle"
        :editList.sync="editList"
        :visible.sync="dialogVisible"
        ref="addPerson"
        @add-success="loadDepts"
      ></Dialog>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Juan/Search'
import Button from '@/components/Juan/Button'
import Table from '@/components/Juan/Table'
import Dialog from '@/components/Juan/Dialog'
import { delPersonApi, getPersonById } from '@/api/person'
export default {
  components: {
    Search,
    Button,
    Table,
    Dialog,
  },
  data() {
    return {
      dialogVisible: false,
      usernameValue: '',
      pageIndex: 1,
      personnelList: [
        { property: 'userName', label: '人员名称' },
        { property: 'regionName', label: '归属区域' },
        { property: 'roleName', label: '角色' },
        { property: 'mobile', label: '联系电话' },
      ],
      tableData: [],
      editList: {},
      dialogTitle: '',
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
            id: item.id,
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
      if (this.usernameValue.trim() == '') {
        this.usernameValue = ''
        return this.$message.error('搜索词不能为空')
      }
      this.getPersonnelList({
        userName: this.usernameValue,
      })
    },
    showAddDept() {
      this.dialogVisible = true
      this.dialogTitle = '添加人员'
    },
    loadDepts() {
      this.getPersonnelList({
        pageIndex: this.pageIndex,
      })
    },
    async onRemove(id) {
      try {
        await this.$confirm('此操作将永久删除该人员, 是否确定?', '注意', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        await delPersonApi(id.id)
        this.$message.success('删除成功')
        this.loadDepts()
      } catch (err) {}
    },
    async onEdit(id) {
      this.dialogVisible = true
      this.dialogTitle = '编辑人员信息'
      const { data } = await getPersonById(id.id)
      ;(this.$refs.addPerson.formData.userName = data.userName),
        (this.$refs.addPerson.formData.regionName = data.regionName),
        (this.$refs.addPerson.formData.roleId = data.roleId),
        (this.$refs.addPerson.formData.mobile = data.mobile),
        (this.$refs.addPerson.formData.regionId = data.regionId),
        (this.$refs.addPerson.formData.image = data.image),
        (this.$refs.addPerson.formData.status = data.status),
        (this.$refs.addPerson.formData.userId = data.userId)
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
