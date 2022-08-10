<template>
  <div>
    <!-- 顶部 -->
    <div class="TopStatistical">
      <el-row>
        <el-col :span="12" class="leftDay">
          <p class="leftTop" style="font-weight: bold">日售统计表</p>
          <!-- 统计数字内容 -->
          <el-row class="StatisticalContent">
            <el-col :span="8" class="DayNum">
              <span class="num">{{ todayNumStatistics }}</span>
              <span class="text">当日销售量(个)</span>
            </el-col>
            <el-col :span="8" class="DayNum">
              <span class="num">{{ todayMoneyStatistics }}</span>
              <span class="text">当日销售量(元)</span>
            </el-col>
            <el-col :span="8" class="DayNum">
              <span class="num">{{ todayDivideStatistics }}</span>
              <span class="text">当日分成(元)</span>
            </el-col>
          </el-row>
          <!-- 统计数字内容 -->
        </el-col>
        <el-col :span="12" class="rightDay">
          <p class="leftTop" style="font-weight: bold">月售统计表</p>
          <!-- 统计数字内容 -->
          <el-row class="StatisticalContent">
            <el-col :span="8" class="DayNum">
              <span class="num">{{ OrderStatistics }}</span>
              <span class="text">当月销售量(个)</span>
            </el-col>
            <el-col :span="8" class="DayNum">
              <span class="num">{{ IncomeStatisticsWY }}</span>
              <span class="text">当月销售量(万元)</span>
            </el-col>
            <el-col :span="8" class="DayNum">
              <span class="num">{{ DivideStatistics }}</span>
              <span class="text">当月分成(元)</span>
            </el-col>
          </el-row>
          <!-- 统计数字内容 -->
        </el-col>
      </el-row>
    </div>

    <!-- 主体区域 -->
    <el-card class="box-card" shadow="never">
      <el-form ref="form" :model="form" label-width="80px" class="choice">
        <!-- 选择合作商 -->
        <el-form-item label="合作商">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option
              v-for="item in PartnList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 选择合作商 -->
        <!-- 选择日期 -->
        <div class="block">
          <span>日期：</span>
          <el-date-picker
            v-model="form.value"
            :picker-options="pickerOptions"
            type="daterange"
            range-separator="~"
            :default-value="monthOne"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
        </div>
        <Button class="btn" @Submit="submit"
          ><i class="el-icon-search"></i> 查询</Button
        >
        <!-- 选择日期 -->
      </el-form>

      <!-- 显示数据 -->
      <el-row class="showData">
        <el-col :span="3"
          ><span class="leftText">笔数统计：</span>
          <span class="red">{{ OrderStatistics }}</span>
          <span class="mini"> 个</span>
        </el-col>
        <el-col :span="4"
          ><span class="leftText">收入统计：</span>
          <span class="red">{{ IncomeStatistics }}</span>
          <span class="mini"> 元</span>
        </el-col>
        <el-col :span="3"
          ><span class="leftText">分成统计：</span>
          <span class="red">{{ DivideStatistics }}</span>
          <span class="mini"> 元</span>
        </el-col>
      </el-row>
      <!-- 显示数据 -->

      <!-- 表格区域 -->
      <Table
        :tableData="tableData"
        :table="table"
        class="istable"
        :isIndex="false"
        :isOeration="false"
      ></Table>
      <div class="block">
        <el-pagination
          hide-on-single-page
          :current-page.sync="currentPage1"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="totalCount"
          @next-click="nextData"
          @prev-click="prevClick"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import Table from '@/components/Fengjian/table.vue'
import Button from '@/components/Fengjian/button.vue'
import {
  getTimerIn,
  getNum,
  getDivide,
  getPartner,
  getPartnerCollect,
  getPartnerCollectPartnerName,
} from '@/api/reconciliation'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      form: {
        region: '',
        value: '',
      },

      // 禁用日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7
        },
      },
      // 当月一号
      monthOne: '',
      // 当月一号 去除精确时间

      monthOnePreciseTime: '',
      // 当月当日日期 去除精确时间
      newDatePreciseTime: '',
      // 当月当日日期
      newDate: '',
      // 收入统计 小数点后两位
      IncomeStatistics: '',
      //收入统计 万元为单位
      IncomeStatisticsWY: '',
      // 订单统计
      OrderStatistics: '',
      // 分成统计
      DivideStatistics: '',
      // 当日零点零分
      newDateStart: '',
      // 当日收入统计
      todayMoneyStatistics: '',
      // 当日订单量统计
      todayNumStatistics: '',
      // 当日分成统计
      todayDivideStatistics: '',
      // 合作商列表
      PartnList: [],
      // 渲染列表
      tableData: [],
      table: [
        { prop: 'date', label: '订单日期' },
        { prop: 'ownerName', label: '合作商' },
        { prop: 'ratio', label: '分成比例' },
        { prop: 'orderTotalMoney', label: '收入(元)' },
        { prop: 'orderCount', label: '笔数' },
        { prop: 'totalBill', label: '分成金额(元)' },
      ],
      temporaryTableData: [],
      // 查询条件收集
      query: [],
      pageIndex: 0,
      totalCount: 0,
      pageSize: 10,
      totalPage: 0,
      currentPage1: 1,
      starttime: '',
      endtime: '',
    }
  },
  components: {
    Table,
    Button,
  },
  created() {
    this.getTimerIn()
    this.getNum()
    this.getDivide()
    this.getDayTimerIn()
    this.getDayNum()
    this.getDayDivide()
    this.getPartner()
    this.getPartnerCollect()
  },

  methods: {
    // 上一页
    prevClick() {
      this.pageIndex--
      this.tableData = []
      this.getCommodityList()
    },
    // 下一页
    nextData() {
      // if (this.totalCount < 10) return (this.disabled = true)
      this.pageIndex++
      this.tableData = []
      this.getCommodityList()
    },
    // 获取一定日期范围之内的合作商分成汇总数据
    async getPartnerCollect() {
      this.startTime()
      const res = await getPartnerCollect(
        this.monthOnePreciseTime,
        this.newDatePreciseTime,
      )
      const PartnList = res.data.currentPageRecords
      PartnList.forEach((item) => {
        this.tableData.push({
          date: item.date,
          ownerName: item.ownerName,
          ratio: item.ratio + '%',
          orderTotalMoney: item.orderTotalMoney,
          orderCount: item.orderCount,
          totalBill: '+' + item.totalBill / 100,
        })
      })
      console.log(this.tableData)
    },
    //获取合作商列表
    async getPartner() {
      const res = await getPartner()
      // console.log('合作商', res.data.currentPageRecords)
      const PartneData = res.data.currentPageRecords
      PartneData.forEach((item) => {
        this.PartnList.push({
          id: item.id,
          name: item.name,
        })
      })
    },
    // 获取一定时间范围之内的分成总数(月)
    async getDayDivide() {
      this.startTime()
      const res = await getDivide({
        start: this.newDateStart,
        end: this.newDate,
      })
      // console.log(res)
      this.todayDivideStatistics = res.data
    },
    //  获取一定时间范围之内的订单总数(日)
    async getDayNum() {
      this.startTime()
      const res = await getNum({
        start: this.newDateStart,
        end: this.newDate,
      })
      // console.log(res)
      this.todayNumStatistics = res.data
    },
    // 获取一定时间范围之内的收入(日)
    async getDayTimerIn() {
      this.startTime()
      const res = await getTimerIn({
        start: this.newDateStart,
        end: this.newDate,
      })
      // console.log(res)
      this.todayMoneyStatistics = res.data
    },
    // 获取一定时间范围之内的收入(月)
    async getTimerIn() {
      this.startTime()
      const res = await getTimerIn({
        start: this.monthOne,
        end: this.newDate,
      })
      this.IncomeStatistics = res.data / 100
      this.IncomeStatisticsWY = (res.data / 1000000).toFixed(2)
    },
    //  获取一定时间范围之内的订单总数(月)
    async getNum() {
      this.startTime()
      const res = await getNum({
        start: this.monthOne,
        end: this.newDate,
      })
      this.OrderStatistics = res.data
    },
    // 获取一定时间范围之内的分成总数(月)
    async getDivide() {
      this.startTime()
      const res = await getDivide({
        start: this.monthOne,
        end: this.newDate,
      })

      this.DivideStatistics = res.data / 100
    },
    startTime() {
      // 当月一号
      const monthDate = dayjs(new Date()).format('YYYY-MM-01 00:00:00')
      this.monthOne = monthDate
      // 今日日期
      const today = dayjs(new Date()).format('YYYY-MM-DD hh:mm:ss')
      this.newDate = today
      // zero
      const zero = dayjs(new Date()).format('YYYY-MM-DD 00:00:00')
      this.newDateStart = zero

      // 当月一号 去除精确时间
      const monthDatePreciseTime = dayjs(new Date()).format('YYYY-MM-01')
      this.monthOnePreciseTime = monthDatePreciseTime
      // 今日日期 去除精确时间
      const todaynewDatePreciseTime = dayjs(new Date()).format('YYYY-MM-DD')
      this.newDatePreciseTime = todaynewDatePreciseTime
      if (this.form.value === '') {
        this.form.value = [this.monthOnePreciseTime, this.newDatePreciseTime]
      }
      //this.form.value = [this.monthOnePreciseTime, this.newDatePreciseTime]
      // 今日零点
      // this.value = start
      // console.log(zero)
    },

    async getPartnerCollectPartnerName() {
      const res = await getPartnerCollectPartnerName(
        this.form.region,
        this.starttime,
        this.endtime,
      )
      //  starttime: '',
      // endtime: '',
      this.tableData = []
      const PartnList = res.data.currentPageRecords
      PartnList.forEach((item) => {
        this.tableData.push({
          date: item.date,
          ownerName: item.ownerName,
          ratio: item.ratio + '%',
          orderTotalMoney: item.orderTotalMoney,
          orderCount: item.orderCount,
          totalBill: '+' + item.totalBill / 100,
        })
      })
      // console.log(res)
    },
    // 提交查询
    async submit() {
      this.startTime()
      this.$refs.form.validate()
      const s = this.form.value[0]
      const e = this.form.value[1]
      // 计算开始时间
      const monthDatePreciseTime = dayjs(s).format('YYYY-MM-DD')
      this.starttime = monthDatePreciseTime
      // 计算结束时间
      const todaynewDatePreciseTime = dayjs(e).format('YYYY-MM-DD')
      this.endtime = todaynewDatePreciseTime
      // console.log('e', this.starttime, this.endtime)
      this.getPartnerCollectPartnerName()
      // console.log('选择的时间', this.query)
    },
  },
}
</script>

<style scoped lang="less">
.leftDay {
  position: relative;
  align-items: center;
  width: 49%;
  height: 200px;
  background-color: #ccc;
  border-radius: 30px;
  margin-right: 25px;
  background-color: #e9f3ff;
  background-image: url('../../assets/login_img/lefttop.png'),
    url('../../assets/login_img/tongji.png');
  background-repeat: no-repeat, no-repeat;
  background-position: 0 0, calc(100% - 12px) 100%;
  .leftTop {
    position: absolute;
    left: 0;
    top: 0;
    margin: 20px;
  }
  .StatisticalContent {
    margin-top: 9%;
    .DayNum {
      display: flex;
      flex-direction: column;
      align-items: center;
      // align-items: center;
      .num {
        color: #072074;
        font-size: 45px;
        text-shadow: 2px 4px 9px #072074;
      }
      .text {
        // margin-left: 55px;
        margin-top: 5px;
        font-size: 10px;
        color: #a8a7e3;
      }
    }
  }
}

.rightDay {
  position: relative;
  align-items: center;
  width: 49%;
  height: 200px;
  background-color: #ccc;
  border-radius: 30px;
  background-color: #fbefe8;
  background-image: url('../../assets/login_img/rightLou.png');
  background-repeat: no-repeat;
  background-position: calc(100% - 12px) 100%;
  .leftTop {
    position: absolute;
    left: 0;
    top: 0;
    margin: 20px;
  }
  .StatisticalContent {
    margin-top: 9%;
    .DayNum {
      display: flex;
      flex-direction: column;
      align-items: center;
      // align-items: center;
      .num {
        color: #ff5757;
        font-size: 45px;
        text-shadow: 2px 4px 9px #ff5757;
      }
      .text {
        // margin-left: 55px;
        margin-top: 5px;
        font-size: 10px;
        color: #de9690;
      }
    }
  }
}

.box-card {
  margin-top: 20px;
  .choice {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .el-form-item {
    margin-bottom: unset;
    margin-left: -25px;
  }

  .block {
    margin-left: 12px;
    span {
      font-weight: 700;
      font-size: 15px;
      color: #606266;
    }
  }
  .showData {
    margin-top: 25px;
    .leftText {
      font-size: 12px;
    }
    .red {
      color: red;
      font-size: 20px;
    }
    .mini {
      font-size: 12px;
    }
  }
}
.istable {
  margin-top: 20px;
}
.btn {
  margin-left: 15px;
}
</style>
