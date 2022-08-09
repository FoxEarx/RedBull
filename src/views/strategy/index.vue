<template>
  <div>
    <search />
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
      <List :tableData="tableData" :table="table" @strategyId="getStrategyId">
        <template #operation>
          <span class="details">查看详情</span>
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
        <Dialog :visible.sync="dialogVisible" @getList="getList" />
      </div>
    </div>
  </div>
</template>

<script>
import search from '@/components/fanzhiyi/strategy/search'
import List from '@/components/fanzhiyi/List'
import turnPage from '@/components/fanzhiyi/turnPage'
import Dialog from '@/components/fanzhiyi/strategy/dialog'
import dayjs from 'dayjs'
import { delStrategyId } from '@/api/strategy'
export default {
  data() {
    return {
      tableData: [],
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
    }
  },

  created() {
    this.getList()
  },

  methods: {
    getList() {
      console.log(11)
      console.log(this.$store.state.strategy.AllList.currentPageRecords)
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

      // console.log(list)

      // console.log('11', this.tableData)
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
      this.dialogVisible = true
    },
    Edit() {
      this.dialogVisible = true
    },
    // 获取点击事件id
    getStrategyId(id) {
      console.log('事件', id)
      console.log('id', id.policyId)
      this.evetnsj = id
      this.policyId = id.policyId
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
