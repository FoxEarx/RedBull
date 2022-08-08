<template>
  <div>
    <mainSearch :firstInput="'设备编号'" @search="search"></mainSearch>
    <div class="Main">
      <div class="MainNav">
        <Add
          :dialogVisible1="dialogVisible1"
          @addEquipment="addEquipment"
          @tureaddEquipment="tureaddEquipment"
          :type="'新增设备'"
        >
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="设备编号："> 系统自动生成 </el-form-item>
            <el-form-item label="选择型号：" prop="vmType">
              <el-select
                placeholder="请选择"
                style="width: 100%"
                v-model="form.vmType"
              >
                <el-option
                  v-for="item in equipmentType"
                  :key="item.typeId"
                  :label="item.name"
                  :value="item.typeId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择点位：" prop="nodeId">
              <el-select
                placeholder="请选择"
                style="width: 100%"
                v-model="form.nodeId"
              >
                <el-option
                  v-for="item in equipmentNode"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </Add>
        <!-- 按钮1 -->

        <!-- 按钮2 -->
        <el-button @click="dialogVisible2 = true" class="el-button-2"
          >工单配置</el-button
        >
        <!-- 工单配置弹出层 -->
        <el-dialog
          title="工单配置"
          :visible.sync="dialogVisible2"
          width="30%"
          :before-close="handleClose"
        >
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible2 = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
      <List
        :tableData="tableData"
        :table="table"
        :width="'280px'"
        :checkShow="true"
      >
        <template #operation>
          <span class="details">货道 </span>
          <span class="details">策略 </span>
          <el-button type="text">修改</el-button>
        </template>
      </List>
      <!-- 分页 -->
      <Paging
        @nextClick="nextClick"
        @prevClick="prevClick"
        @changeCount="changeCount"
      ></Paging>
    </div>
  </div>
</template>

<script>
import mainSearch from '@/components/mainSearch'
import List from '@/components/List'
import Paging from '@/components/paging'
import Add from '@/components/Add'
import { addEquipmentType, addEquipmentNode, addEquipment } from '@/api'

export default {
  data() {
    return {
      form: {
        createUserId: this.$store.state.user.userId,
        vmType: '',
        nodeId: '',
      },
      dialogVisible1: false,
      dialogVisible2: false,
      tableData: [],
      index: 1,
      number: 1,
      table: [
        { prop: 'innerCode', label: '设备编号' },
        { prop: 'taskType', label: '设备型号' },
        { prop: 'address', label: '详细地址' },
        { prop: 'ownerName', label: '合作商' },
        { prop: 'vmStatus', label: '设备状态' },
      ],
      rules: {
        vmType: [{ required: true, message: '请输入', trigger: 'blur' }],
        nodeId: [{ required: true, message: '请输入', trigger: 'blur' }],
      },
      equipmentType: [],
      equipmentNode: [],
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
    getList() {
      this.number = 1
      const list = []
      this.$store.state.equipment.AllEquipment.currentPageRecords.forEach(
        (item) => {
          // const time = dayjs(item.createTime).format('YYYY.MM.DD hh:mm:ss')

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
            address: item.node.name,
            ownerName: item.node.ownerName,
            vmStatus: status,
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
    async tureaddEquipment() {
      await this.$refs.form.validate()
      await addEquipment(this.form)
      this.$message.success('新增成功')
      this.dialogVisible1 = false
      this.getList()
    },
    async addEquipment() {
      this.dialogVisible1 = true
      const { data } = await addEquipmentType()
      const res = await addEquipmentNode()
      this.equipmentType = data.currentPageRecords
      this.equipmentNode = res.data.currentPageRecords
      console.log(data)
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
