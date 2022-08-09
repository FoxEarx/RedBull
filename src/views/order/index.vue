<template>
  <div>
    <SearchandDay @inpVal="getVal"></SearchandDay>
    <div class="Main">
      <List :tableData="tableData" :table="table" @pushid="getorderId">
        <template #operation>
          <span class="details" @click="viewDetails">查看详情</span>
        </template>
      </List>
      <!-- 分页 -->
      <div class="block">
        <turn-page
          :pageNum="+$store.state.order.AllList.totalCount"
          :currentPage="this.index"
          :sumPage="Math.ceil($store.state.order.AllList.totalCount / 10)"
          :total="+$store.state.order.AllList.totalCount"
          @prevClick="prevClick"
          @nextClick="nextClick"
          v-show="this.tableData.length !== 1 && this.tableData.length !== 0"
        ></turn-page>
      </div>
      <!-- 弹出层 -->
      <div class="dialog">
        <Dialog
          ref="orderDialog"
          :visible.sync="dialogVisible"
          :orderevent="orderevent"
        />
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
      orderevent: {},
      searchEvent: {},
      orderid: '',
      searchId: '',
      dialogVisible: false, //弹出框
      pageVisible: true, //分页
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
    // 获取列表并渲染
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
    // 上下页
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
    // 弹出框
    viewDetails() {
      this.dialogVisible = true
      // , console.log(11)
    },
    // 获取点击的列表的总事件
    getorderId(val) {
      this.orderid = val
      // console.log(val)
      const list = this.$store.state.order.AllList.currentPageRecords
      // console.log('list', list)
      list.filter((item) => {
        if (item.orderNo === val) {
          this.orderevent = item
          // console.log('item', this.orderevent)
        }
        // console.log(arr)
      })
      const arr = this.orderevent.addr.split('-')
      const index = arr.length - 1
      // console.log(arr[index])
      this.orderevent.addr = arr[index]
    },
    // 搜索
    async getVal(val) {
      // console.log(val)
      const arr = []
      if (val.length !== 0) {
        this.searchId = val
        // const list = this.tableData
        await this.$store.state.order.AllList.currentPageRecords.filter(
          (item) => {
            const time = dayjs(this.searchEvent.createTime).format(
              'YYYY.MM.DD hh:mm:ss',
            )
            if (item.orderNo === val) {
              this.searchEvent = item
              console.log('event', this.searchEvent)
              arr.push({
                orderNo: this.searchEvent.orderNo,
                skuName: this.searchEvent.skuName,
                amount: this.searchEvent.amount,
                status:
                  this.searchEvent.status === 0
                    ? '未支付'
                    : this.searchEvent.status === 1
                    ? '支付完成'
                    : this.searchEvent.status === 2
                    ? '出货成功'
                    : '出货失败',
                innerCode: this.searchEvent.innerCode,
                userName: this.searchEvent.userName,
                createTime: time,
                operation: '查看详情',
              })
            }
          },
        )
        this.tableData = arr
        console.log('id', val)
        this.pageVisible = false
      } else {
        this.getList()
      }
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
