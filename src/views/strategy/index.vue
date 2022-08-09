<template>
  <div>
    <search @inpVal="getVal" />
    <div class="Main">
      <el-button
        type="primary"
        style="
          background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
          border: none;
          margin-bottom: 20px;
        "
        icon="el-icon-circle-plus-outline"
        @click="addStrategy"
        >新建</el-button
      >
      <List
        :tableData="tableData"
        :table="table"
        @strategyId="getStrategyId"
        v-loading="loading"
      >
        <template #operation>
          <span class="details" @click="lookinfo">查看详情</span>
          <span class="details" @click="Edit">修改</span>
          <span class="del" @click="delFn">删除</span>
        </template>
      </List>
      <!-- 分页 -->
      <div class="block">
        <turn-page
          :pageNum="+$store.state.strategy.AllList.totalCount"
          :currentPage="this.index"
          :sumPage="Math.ceil($store.state.strategy.AllList.totalCount / 10)"
          :total="+$store.state.strategy.AllList.totalCount"
          @prevClick="prevClick"
          @nextClick="nextClick"
        ></turn-page>
      </div>
      <div class="dialog">
        <Dialog
          ref="addDept"
          :visible.sync="dialogVisible"
          @getList="getList"
          :dialogTitle="dialogTitle"
          :evetnsj="evetnsj"
        />
        <infoDialog
          :visible.sync="infoVisible"
          :currentInfo="currentInfo"
          :currentEven="currentEven"
        />
      </div>
    </div>
  </div>
</template>

<script>
import search from '@/components/fanzhiyi/strategy/search'
import List from '@/components/fanzhiyi/List'
import turnPage from '@/components/fanzhiyi/turnPage'
import Dialog from '@/components/fanzhiyi/strategy/dialog'
import infoDialog from '@/views/strategy/component/infodialog'
import dayjs from 'dayjs'
import { delStrategyId, getStrategyInfo } from '@/api/strategy'
export default {
  data() {
    return {
      tableData: [],
      searchEvent: {},
      index: 1,
      table: [
        { prop: 'policyName', label: '策略名称' },
        { prop: 'discount', label: '策略方案' },
        { prop: 'createTime', label: '创建日期' },
      ],
      total: 0,
      currentPage: null,
      policyId: '', //点击的行事件id
      dialogVisible: false, //新增弹出框
      evetnsj: '', //点击的行事件
      loading: false,
      dialogTitle: '', //弹窗标题
      infoVisible: false,
      currentInfo: [],
      currentEven: '',
      searchVal: '',
    }
  },

  created() {
    this.getList()
  },

  methods: {
    // 获取点击事件id
    getStrategyId(id) {
      // console.log('事件', id)
      // console.log('id', id.policyId)
      this.evetnsj = id
      this.policyId = id.policyId
    },
    // 渲染列表
    getList() {
      this.loading = true
      const list = []
      this.$store.state.strategy.AllList.currentPageRecords.forEach((item) => {
        const time = dayjs(item.createTime).format('YYYY.MM.DD hh:mm:ss')
        list.push({
          policyName: item.policyName,
          discount: item.discount,
          createTime: time,
          policyId: item.policyId,
          operation: '查看详情',
        })
      })
      this.tableData = list
      this.loading = false
    },
    // 搜索
    getVal(val) {
      const arr = []
      this.$store.state.strategy.AllList.currentPageRecords.filter((item) => {
        if (item.policyName.indexOf(val) !== -1) {
          arr.push(item)
        }
      })
      // console.log(arr)
      this.tableData = arr
    },
    // 上下页
    async nextClick() {
      this.index++
      await this.$store.dispatch('strategy/getStrategy', this.index)
      this.getList()
    },
    async prevClick() {
      this.index--
      await this.$store.dispatch('strategy/getStrategy', this.index)
      this.getList()
    },
    // 新增策略
    addStrategy() {
      this.dialogTitle = '新增策略'
      this.dialogVisible = true
    },
    // 查看策略
    lookinfo() {
      this.infoVisible = true
      // console.log(1111)
      setTimeout(async () => {
        const res = await getStrategyInfo(this.policyId)
        // console.log(res)
        // console.log(res.data.currentPageRecords)
        this.currentInfo = res.data.currentPageRecords
        // console.log(this.currentInfo)
        // console.log(this.evetnsj)
        this.currentEven = this.evetnsj.policyName
        // res.data.currentPageRecords
        // console.log(res.data.currentPageRecords)
      })
    },

    // 修改策略
    Edit() {
      this.dialogVisible = true
      setTimeout(async () => {
        await console.log('ed', this.policyId)
        this.dialogTitle = '修改策略'
        this.$refs.addDept.ruleForm.policyName = this.evetnsj.policyName
        this.$refs.addDept.ruleForm.discount = this.evetnsj.discount
      })
    },

    // 删除策略
    async delFn() {
      setTimeout(async () => {
        await delStrategyId(this.policyId)
        await this.$store.dispatch('strategy/getStrategy')
        this.getList()
      })

      this.$message.success('删除策略成功')
    },
  },

  components: {
    search,
    List,
    turnPage,
    Dialog,
    infoDialog,
  },
}
</script>

<style scoped lang="less">
.search {
  display: flex;
  width: 100%;
  background-color: #fff;
  height: 64px;
  padding-left: 17px;
  margin-top: 20px;
  margin-bottom: 20px;
  align-items: center;
}
.Main {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
}
.details {
  color: #5f84ff;
  cursor: pointer;
  margin-left: 10px;
}
.del {
  color: #ff5a5a;
  cursor: pointer;
  margin-left: 10px;
}
</style>
