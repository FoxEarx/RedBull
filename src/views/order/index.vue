<template>
  <div>
    <SearchandDay></SearchandDay>
    <div class="Main">
      <List :tableData="tableData" :table="table">
        <template #operation>
          <span class="details" @click="viewDetails">查看详情</span>
        </template>
      </List>
      <!-- 分页 -->
      <div class="block">
        <turn-page
          :pageNum="+$store.state.order.AllList.totalCount"
          :currentPage="this.index"
          :sumPage="Math.round($store.state.order.AllList.totalCount / 10)"
          :total="+$store.state.order.AllList.totalCount"
          @prevClick="prevClick"
          @nextClick="nextClick"
        ></turn-page>
      </div>
      <!-- 弹出层 -->
      <div class="dialog">
        <Dialog ref="orderDialog" :visible.sync="dialogVisible" />
      </div>
    </div>
  </div>
</template>

<script>
import turnPage from '@/components/fanzhiyi/turnPage'
import SearchandDay from '@/components/fanzhiyi/SearchandDay'
import Dialog from '@/components/fanzhiyi/dialog'
import List from '@/components/fanzhiyi/List'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      index: 1,
      table: [
        { prop: 'orderNo', label: '订单编号' },
        { prop: 'skuName', label: '商品名称' },
        { prop: 'amount', label: '订单金额（元）' },
        { prop: 'innerCode', label: '设备编号' },
        { prop: 'status', label: '订单状态' },
        { prop: 'createTime', label: '订单日期' },
      ],
      total: 0,
      currentPage: null,
    }
  },

  created() {
    this.getList()
  },

  methods: {
    async getList() {
      const list = []
      await this.$store.state.order.AllList.currentPageRecords.forEach(
        (item) => {
          const time = dayjs(item.createTime).format('YYYY.MM.DD hh:mm:ss')
          list.push({
            orderNo: item.orderNo,
            skuName: item.skuName,
            amount: item.amount,
            status:
              item.status === 0
                ? '未支付'
                : item.status === 1
                ? '支付完成'
                : item.status === 2
                ? '出货成功'
                : '出货失败',
            innerCode: item.innerCode,
            userName: item.userName,
            createTime: time,
            operation: '查看详情',
          })
        },
      )
      this.tableData = list
      // console.log('11', this.tableData)
    },
    async nextClick() {
      this.index++
      await this.$store.dispatch('order/getOrder', this.index)
      this.getList()
    },
    async prevClick() {
      this.index--
      await this.$store.dispatch('order/getOrder', this.index)
      this.getList()
    },
    viewDetails() {
      ;(this.dialogVisible = true), console.log(11)
    },
  },
  components: {
    SearchandDay,
    List,
    turnPage,
    Dialog,
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
  .block {
    span {
      width: 50%;
      color: #dbdfe5;
      font-size: 20px;
      margin-left: 20px;
    }
  }
}
.details {
  color: #8384ff;
  cursor: pointer;
}
</style>
