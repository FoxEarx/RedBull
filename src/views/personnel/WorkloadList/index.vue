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
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  class="perple-see"
                  @click="onsSee(scope.row)"
                  >查看详情</el-button
                >
              </template>
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
        <!-- 弹层 -->
        <el-dialog width="80%" title="人员详情" :visible.sync="dialogVisible">
          <div class="descriptions">
            <el-row>
              <el-col :span="9"
                ><div class="grid-content bg-purple">
                  人员名称: {{ des.userName }}
                </div></el-col
              >
              <el-col :span="7"
                ><div class="grid-content bg-purple-light">
                  角色: {{ des.roleName }}
                </div></el-col
              >
              <el-col :span="8"
                ><div class="grid-content bg-purple">
                  联系电话: {{ des.mobile }}
                </div></el-col
              >
              <el-col :span="24"
                ><div class="grid-content bg-purple-dark">
                  负责区域: {{ des.regionName }}
                </div></el-col
              >
            </el-row>
          </div>
          <div class="user-work">
            <el-row class="user-work-1 work">
              <el-col :span="4"
                ><div class="grid-content bg-purple">99</div></el-col
              >
              <el-col :span="5"
                ><div class="grid-content bg-purple-light">
                  总工单数
                </div></el-col
              >
              <el-col :span="5"
                ><div class="grid-content bg-purple">拒绝工单</div></el-col
              >
              <el-col :span="5"
                ><div class="grid-content bg-purple-light">
                  完成工单
                </div></el-col
              >
              <el-col :span="5"
                ><div class="grid-content bg-purple">进行中工单</div></el-col
              >
            </el-row>
            <el-row class="work">
              <el-col :span="4"
                ><div class="grid-content bg-purple">本周</div></el-col
              >
              <el-col :span="5"
                ><div class="grid-content bg-purple-light">
                  {{ weekCount.total }}
                </div></el-col
              >
              <el-col :span="5"
                ><div class="grid-content bg-purple">
                  {{ weekCount.cancelCount }}
                </div></el-col
              >
              <el-col :span="5"
                ><div class="grid-content bg-purple-light">
                  {{ weekCount.workCount }}
                </div></el-col
              >
              <el-col :span="5"
                ><div class="grid-content bg-purple">
                  {{ weekCount.progressTotal }}
                </div></el-col
              >
            </el-row>
            <el-row class="work">
              <el-col :span="4"
                ><div class="grid-content bg-purple">本月</div></el-col
              >
              <el-col :span="5"
                ><div class="grid-content bg-purple-light">
                  {{ monthCount.total }}
                </div></el-col
              >
              <el-col :span="5"
                ><div class="grid-content bg-purple">
                  {{ monthCount.cancelCount }}
                </div></el-col
              >
              <el-col :span="5"
                ><div class="grid-content bg-purple-light">
                  {{ monthCount.workCount }}
                </div></el-col
              >
              <el-col :span="5"
                ><div class="grid-content bg-purple">
                  {{ monthCount.progressTotal }}
                </div></el-col
              >
            </el-row>
            <el-row class="work work-b">
              <el-col :span="4"
                ><div class="grid-content bg-purple">本年</div></el-col
              >
              <el-col :span="5"
                ><div class="grid-content bg-purple-light">
                  {{ yearCount.total }}
                </div></el-col
              >
              <el-col :span="5"
                ><div class="grid-content bg-purple">
                  {{ yearCount.cancelCount }}
                </div></el-col
              >
              <el-col :span="5"
                ><div class="grid-content bg-purple-light">
                  {{ yearCount.workCount }}
                </div></el-col
              >
              <el-col :span="5"
                ><div class="grid-content bg-purple">
                  {{ yearCount.progressTotal }}
                </div></el-col
              >
            </el-row>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Juan/Search'
import Table from '@/components/Juan/Table'
import { getPersonById, getUserWorkCount } from '@/api/person'
import dayjs from 'dayjs'
export default {
  components: {
    Search,
    Table,
  },
  data() {
    return {
      dialogVisible: false,
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
      des: [],
      weekCount: [],
      monthCount: [],
      yearCount: [],
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
      console.log(this.roleNameValue)
      this.getUserWorkList({
        userName: this.usernameValue,
        isRepair: this.isRepair,
      })
    },
    async onsSee(id) {
      this.des = id
      const { data } = await getPersonById(id.userId)
      this.des.regionName = data.regionName
      this.dialogVisible = true
      const date = new Date()
      const end = dayjs(date).format('YYYY-MM-DD hh:mm:ss')
      const week = await getUserWorkCount({
        userId: id.userId,
        start: '2022-08-08 00:00:00',
        end: end,
      })
      const month = await getUserWorkCount({
        userId: id.userId,
        start: '2022-08-01 00:00:00',
        end: end,
      })
      const year = await getUserWorkCount({
        userId: id.userId,
        start: '2022-01-01 00:00:00',
        end: end,
      })
      this.weekCount = week.data
      this.monthCount = month.data
      this.yearCount = year.data
    },
  },
}
</script>

<style scoped lang="scss">
.result {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
}
.el-col-24 {
  margin-top: 20px;
}
.descriptions {
  height: 86px;
  padding: 19px 19px 0;
  background: #f3f6fb;
}
.user-work {
  margin-top: 26px;
  .user-work-1 {
    background: #f3f6fb;
  }
}
.work {
  border-top: 1px solid #d8dde3;
  border-left: 1px solid #d8dde3;
  .grid-content {
    line-height: 40px;
    border-right: 1px solid #d8dde3;
    text-align: center;
  }
}
.work-b {
  border-bottom: 1px solid #d8dde3;
}
</style>
