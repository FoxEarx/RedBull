<template>
  <div>
    <mainSearch :firstInput="'设备编号'" @search="search"></mainSearch>
    <div class="Main">
      <List
        :tableData="tableData"
        :table="table"
        :width="'280px'"
        @clickList="clickList"
      >
        <template #operation>
          <el-button type="text" @click="SalesDetails">查看详情</el-button>
        </template></List
      >
      <el-dialog
        title="设备详情"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
      >
        <div class="aisle">
          <div class="aisle_header">
            <ul>
              <li>销售量：{{ salesNum }}个</li>
              <li>销售额：{{ money }}元</li>
              <li>补货次数：{{ replenishmentNum }}次</li>
              <li>维修次数：{{ maintenanceNum }}次</li>
            </ul>
            <p>商品销量（月）</p>
            <div>
              <el-row v-if="isShow">
                <el-col
                  :span="6"
                  v-for="(item, index) in CommoditSales"
                  :key="index"
                  ><div class="grid-content bg-purple">
                    {{ item.skuName }}
                    ：{{ item.count }}
                  </div></el-col
                >
              </el-row>
              <div v-if="!isShow" class="noSP">{{ CommoditSales }}</div>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <Paging
        @nextClick="nextClick"
        @prevClick="prevClick"
        @changeCount="changeCount"
        :total="total"
      ></Paging>
    </div>
  </div>
</template>

<script>
import mainSearch from '@/components/T-components/mainSearch'
import Paging from '@/components/T-components/paging'
import List from '@/components/T-components/List'
import Add from '@/components/T-components/Add'
import {
  SalesDetailsNum,
  SalesDetailsMoney,
  replenishmentNum,
  maintenanceNum,
  CommoditSales,
} from '@/api'

export default {
  data() {
    return {
      total: '',
      table: [
        { prop: 'innerCode', label: '设备编号' },
        { prop: 'taskType', label: '设备型号' },
        { prop: 'address', label: '详细地址' },
        { prop: 'ownerName', label: '运营状态' },
        { prop: 'vmStatus', label: '设备状态' },
      ],
      dialogVisible: false,
      tableData: [],
      number: 1,
      index: 1,
      ListItemInfo: [],
      ListId: 0,
      salesNum: 0,
      money: 0,
      replenishmentNum: 0,
      maintenanceNum: 0,
      CommoditSales: '',
      isShow: false,
    }
  },

  async created() {
    await this.$store.dispatch('equipment/getEquipment', this.index)
    this.getList()
  },

  methods: {
    handleClose(done) {
      done()
    },
    clickList(row) {
      this.ListItemInfo = row
      if (row.index <= 10) {
        this.ListId = row.index - 1
      } else {
        if (row.index % 10 === 0) {
          return (this.ListId = 9)
        }
        this.ListId = (row.index % 10) - 1
      }
    },
    getList() {
      this.total = this.$store.state.equipment.AllEquipment.totalCount
      this.number = 1
      const list = []
      this.$store.state.equipment.AllEquipment.currentPageRecords.forEach(
        (item) => {
          let status = 0
          if (item.vmStatus === 0) {
            status = '未投放'
          } else if (item.vmStatus === 1) {
            status = '运营'
          } else if (item.vmStatus === 3) {
            status = '撤机'
          }
          list.push({
            index: (this.index - 1) * 10 + this.number,
            innerCode: item.innerCode,
            taskType: item.type.name,
            address: item.node.addr,
            ownerName: status,
            vmStatus: '离线 货道 传送轴',
          })
          this.number++
        },
      )
      this.tableData = list
      console.log(this.tableData)
    },
    async nextClick() {
      this.index++
      await this.$store.dispatch('equipment/getEquipment', this.index)
      this.getList()
    },
    async prevClick() {
      this.index--
      await this.$store.dispatch('equipment/getEquipment', this.index)
      this.getList()
    },
    async changeCount(index) {
      this.index = index
      await this.$store.dispatch('equipment/getEquipment', this.index)
      this.getList()
    },
    async search(value) {
      await this.$store.dispatch('equipment/getNumEquipment', value)
      this.getList()
    },
    async SalesDetails() {
      setTimeout(async () => {
        this.dialogVisible = true
        const data = {
          // partnerId:
          //   this.$store.state.equipment.AllEquipment.currentPageRecords[
          //     this.ListId
          //   ].ownerId,
          start: '2022-08-01 00:00:00',
          end: '2022-08-09 23:59:59',
          innerCode:
            this.$store.state.equipment.AllEquipment.currentPageRecords[
              this.ListId
            ].innerCode,
        }
        const Num = await SalesDetailsNum(data)
        const Money = await SalesDetailsMoney(data)
        const replenishment = await replenishmentNum(
          data.innerCode,
          '2022-08-01',
          '2022-08-09',
        )
        const maintenance = await maintenanceNum(
          data.innerCode,
          '2022-08-01',
          '2022-08-09',
        )
        const Commodit = await CommoditSales(
          data.innerCode,
          '2022-08-01',
          '2022-08-09',
        )
        let s = ''
        if (Money.data === '0') {
          s = Money.data
        } else {
          for (let i = 1; i < Money.data.length; i++) {
            if (i > 4) {
              s += '.'
            }
            s += Money.data[i]
          }
        }
        this.salesNum = Num.data
        this.money = s
        this.replenishmentNum = replenishment.data
        this.maintenanceNum = maintenance.data
        if (Commodit.data.length === 0) {
          this.isShow = false
          this.CommoditSales = '当前设备未销售商品'
        } else {
          this.isShow = true
          this.CommoditSales = Commodit.data
        }

        console.log(this.CommoditSales)
      })
    },
  },
  components: {
    mainSearch,
    List,
    Paging,
    Add,
  },
}
</script>

<style scoped lang="less">
* {
  list-style-type: none;
}
.Main {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
  .MainNav {
    margin-bottom: 20px;
    display: flex;
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

  .aisle {
    .aisle_header {
      margin: 0 50px;
      .el-row {
        border-top: 1px solid #d8dde3;
        border-left: 1px solid #d8dde3;
      }
      .el-col-6 {
        text-align: center;
        height: 40px;
        line-height: 40px;
        border-right: 1px solid #d8dde3;
        border-bottom: 1px solid #d8dde3;
      }
      .noSP {
        font-size: 16px;
        text-align: center;
      }
      ul {
        height: 54px;
        background-color: #f4f6fb;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 40px;
      }
    }
  }
}
/deep/.el-dialog__body {
  padding: 0;
}
</style>
