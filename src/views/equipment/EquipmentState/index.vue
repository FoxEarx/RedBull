<template>
  <div>
    <mainSearch :firstInput="'设备编号'" @search="search"></mainSearch>
    <div class="Main">
      <List
        :tableData="tableData"
        :table="table"
        :width="'280px'"
        @clickList="clickList"
        @selectionChange="selectionChange"
      >
        <template #operation>
          <el-button type="text">查看详情</el-button>
        </template></List
      >
      <Paging
        @nextClick="nextClick"
        @prevClick="prevClick"
        @changeCount="changeCount"
      ></Paging>
    </div>
  </div>
</template>

<script>
import mainSearch from '@/components/T-components/mainSearch'
import Paging from '@/components/T-components/paging'
import List from '@/components/T-components/List'
import Add from '@/components/T-components/Add'

export default {
  data() {
    return {
      table: [
        { prop: 'innerCode', label: '设备编号' },
        { prop: 'taskType', label: '设备型号' },
        { prop: 'address', label: '详细地址' },
        { prop: 'ownerName', label: '运营状态' },
        { prop: 'vmStatus', label: '设备状态' },
      ],
      tableData: [],
      number: 1,
      index: 1,
    }
  },

  async created() {
    await this.$store.dispatch('equipment/getEquipment', this.index)
    this.getList()
  },

  methods: {
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
    selectionChange() {},
    async search(value) {
      await this.$store.dispatch('equipment/getNumEquipment', value)
      this.getList()
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

<style scoped lang="scss">
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
}
</style>
