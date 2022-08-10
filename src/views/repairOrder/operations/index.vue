<template>
  <div>
    <search @inpVal="getVal" />
    <div class="Main">
      <div class="MainNav">
        <!-- 按钮1 -->
        <el-button
          @click="dialogVisible = true"
          class="el-icon-circle-plus-outline el-button-1"
          >新建</el-button
        >
      </div>
      <List :tableData="tableData" :table="table" @strategyId="getStrategyId">
        <template #operation>
          <span class="details" @click="infodialog = true">查看详情</span>
        </template>
      </List>
      <!-- 分页 -->
      <div class="block">
        <turn-page
          :pageNum="+$store.state.repair.ordList.totalCount"
          :currentPage="this.index"
          :sumPage="Math.ceil($store.state.repair.ordList.totalCount / 10)"
          :total="+$store.state.repair.ordList.totalCount"
          @prevClick="prevClick"
          @nextClick="nextClick"
          v-show="this.tableData.length !== 1 && this.tableData.length !== 0"
        ></turn-page>
      </div>
      <addDialog :visible.sync="dialogVisible" />
      <infoDialog :visible.sync="infodialog" :clickrow="clickrow" />
    </div>
  </div>
</template>

<script>
import turnPage from '@/components/fanzhiyi/turnPage'
import search from './component/search/index.vue'
import List from './component/list/index.vue'
import addDialog from './component/addDialog/index.vue'
import infoDialog from './component/infoDialog/index.vue'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      clickrow: {},
      index: 1,
      table: [
        { prop: 'taskCode', label: '工单编号' },
        { prop: 'innerCode', label: '设备编号' },
        { prop: 'taskType', label: '工单类型' },
        { prop: 'Type', label: '工单方式' },
        { prop: 'taskStatusTypeEntity', label: '工单状态' },
        { prop: 'userName', label: '维护人员' },
        { prop: 'createTime', label: '创建日期' },
      ],
      dialogVisible: false, //新增弹出框
      infodialog: false, //详情弹出框
    }
  },

  created() {
    this.getList()
  },
  updatad() {},

  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    getList() {
      const list = []
      console.log(this.$store.state.repair.ordList.currentPageRecords)
      this.$store.state.repair.ordList.currentPageRecords.forEach((item) => {
        const time = dayjs(item.createTime).format('YYYY.MM.DD hh:mm:ss')
        list.push({
          taskCode: item.taskCode,
          innerCode: item.innerCode,
          taskType: item.taskType.typeName,
          Type: item.createType === 0 ? '自动' : '手动',
          taskStatusTypeEntity: item.taskStatusTypeEntity.statusName,
          userName: item.userName,
          createTime: time,
          operation: '查看详情',
        })
      })
      this.tableData = list
      // console.log(this.tableData)
    },
    // 搜索
    getVal(val) {
      const arr = []
      this.$store.state.repair.ordList.currentPageRecords.filter((item) => {
        if (item.taskCode.indexOf(val) !== -1) {
          arr.push(item)
        }
      })
      // console.log(arr)
      this.tableData = arr
    },
    // 获取点击事件
    getStrategyId(id) {
      this.clickrow = id
      console.log('row', this.clickrow)
    },
    async nextClick() {
      this.index++
      await this.$store.dispatch('repair/getordList', this.index)
      this.getList()
    },
    async prevClick() {
      this.index--
      await this.$store.dispatch('repair/getordList', this.index)
      this.getList()
    },
  },
  components: {
    search,
    List,
    turnPage,
    addDialog,
    infoDialog,
  },
}
</script>

<style scoped lang="scss">
.search {
  display: flex;
  width: 100%;
  background-color: #fff;
  height: 64px;
  padding-left: 17px;
  margin-bottom: 20px;
  align-items: center;
  .el-form-item {
    margin-bottom: 0;
  }
}
.Main {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
  .MainNav {
    margin-bottom: 20px;
    display: flex;
  }
  .el-button-1 {
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    width: 80px !important;
    height: 36px;
    padding: 0;
    background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
    border: none;
    color: #fff;
    margin-right: 10px;
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
.details {
  color: #8384ff;
  cursor: pointer;
}
</style>
