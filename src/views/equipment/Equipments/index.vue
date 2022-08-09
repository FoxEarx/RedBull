<template>
  <div>
    <mainSearch :firstInput="'设备编号'" @search="search"></mainSearch>
    <div class="Main">
      <div class="MainNav">
        <!-- 按钮1 -->
        <Add
          :dialogVisible1="dialogVisible1"
          @addEquipment="addEquipment"
          @tureaddEquipment="tureaddEquipment"
          :type="'新增设备'"
          @closeAdd="closeAdd"
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
        <!-- 按钮2 -->
        <el-button @click="batchOperation" class="el-button-2"
          >批量操作</el-button
        >
        <!-- 批量操作弹出层 -->
        <el-dialog
          title="批量操作"
          :visible.sync="dialogVisible2"
          width="30%"
          :before-close="handleClose"
        >
          <el-form
            ref="formCL"
            :model="formCL"
            :rules="rules"
            label-width="100px"
          >
            <el-form-item label="选择策略：" prop="CLpolicyId">
              <el-select
                placeholder="请选择"
                style="width: 100%"
                v-model="formCL.CLpolicyId"
              >
                <el-option
                  v-for="item in AllDiscount"
                  :key="item.policyId"
                  :label="item.policyName"
                  :value="item.policyId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="batchOperationFn"
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
        @clickList="clickList"
        @selectionChange="selectionChange"
      >
        <template #operation>
          <span class="details" @click="aisleOpen">货道 </span>
          <span class="details" @click="OpenStrategy">策略 </span>
          <el-button type="text" @click="changeVm">修改</el-button>
        </template>
      </List>
      <!-- 货道 -->
      <Aisle
        :dialogVisibleHD="dialogVisibleHD"
        @closeAdd="closeAdd"
        :ListId="ListId"
      ></Aisle>
      <!-- 修改商品信息弹层 -->
      <ChangeEquipments
        :dialogVisibleXG="dialogVisibleXG"
        @closeAdd="closeAdd"
        :ListId="ListId"
        :AllPoint="AllPoint"
        @trueChange="trueChange"
        :nodeId="
          $store.state.equipment.AllEquipment.currentPageRecords[ListId].node
            .name
        "
      >
      </ChangeEquipments>
      <!-- 策略管理 -->
      <el-dialog
        title="策略管理"
        :visible.sync="dialogVisibleCL"
        width="30%"
        :before-close="handleClose"
      >
        <el-form label-width="100px" v-if="isDiscount">
          <el-form-item label="活动区域：">
            <el-select
              v-model="policyId"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in AllDiscount"
                :key="item.policyId"
                :label="item.policyName"
                :value="item.policyId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" v-if="isDiscount">
          <el-button @click="dialogVisibleCL = false">取 消</el-button>
          <el-button type="primary" @click="applicationStrategy"
            >确 定</el-button
          >
        </span>
        <el-form label-width="100px" v-if="!isDiscount">
          <el-form-item label="机器编号：">{{
            discountList.innerCode
          }}</el-form-item>
          <el-form-item label="策略名称：">{{
            discountList.policyName
          }}</el-form-item>
          <el-form-item label="策略方案：">{{
            discountList.discount + '%'
          }}</el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" v-if="!isDiscount">
          <el-button @click="cancleStrategy">取消策略</el-button>
        </span>
      </el-dialog>
      <!-- 分页 -->
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
import List from '@/components/T-components/List'
import Paging from '@/components/T-components/paging'
import Add from '@/components/T-components/Add'
import ChangeEquipments from './modules/change.vue'
import Aisle from './modules/aisle.vue'
import {
  addEquipmentType,
  addEquipmentNode,
  addEquipment,
  changeEquipmentPoint,
  discountListApi,
  cancleStrategy,
  AllStrategy,
  applicationStrategy,
} from '@/api'

export default {
  data() {
    return {
      dialogVisibleHD: false,
      total: '',
      form: {
        createUserId: this.$store.state.user.userId,
        vmType: '',
        nodeId: '',
      },
      policyId: '',
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisibleXG: false,
      dialogVisibleCL: false,
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
      ListItemInfo: [],
      ListId: 0,
      AllPoint: [],
      discountList: [],
      isDiscount: true,
      AllDiscount: [],
      selectedItem: [],
      formCL: {
        CLpolicyId: '',
      },
      rules: {
        CLpolicyId: [
          { required: true, message: '请选择策略', trigger: 'change' },
        ],
      },
    }
  },

  async created() {
    await this.$store.dispatch('equipment/getEquipment', this.index)
    this.getList()
  },

  methods: {
    aisleOpen() {
      setTimeout(() => {
        this.dialogVisibleHD = true
      })
    },
    handleClose(done) {
      done()
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
      const { data } = await addEquipmentType(1, 10000)
      const res = await addEquipmentNode()
      this.$store.commit('equipment/setEquipmentAllPoint', res.data)
      this.AllPoint = res.data.currentPageRecords
      // this.$store.commit()
      this.equipmentType = data.currentPageRecords
      this.equipmentNode = res.data.currentPageRecords
      console.log(data)
    },
    closeAdd() {
      this.dialogVisible1 = false
      this.dialogVisibleXG = false
      this.dialogVisibleHD = false
    },
    changeVm() {
      this.dialogVisibleXG = true
      this.addEquipment()
    },
    clickList(row) {
      console.log(row)
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
    async trueChange(val) {
      try {
        const id =
          this.$store.state.equipment.AllEquipment.currentPageRecords[
            this.ListId
          ].id
        await changeEquipmentPoint(id, val)
        this.dialogVisibleXG = false
        this.$message.success('修改成功')
        await this.$store.dispatch('equipment/getNumEquipment')
        this.getList()
      } catch (error) {
        this.dialogVisibleXG = false
      }
    },
    OpenStrategy() {
      setTimeout(async () => {
        this.dialogVisibleCL = true
        const res = await discountListApi(this.ListItemInfo.innerCode)
        if (res.data) {
          this.isDiscount = false
          this.discountList = res.data
        } else {
          const res = await AllStrategy()
          this.AllDiscount = res.data
          this.isDiscount = true
        }
      }, 1)
    },
    async cancleStrategy() {
      try {
        const res = await cancleStrategy(
          this.ListItemInfo.innerCode,
          this.discountList.policyId,
        )
        this.$message.success('取消成功')
        this.dialogVisibleCL = false
        await this.$store.dispatch('equipment/getNumEquipment')
        this.getList()
      } catch (error) {
        this.$message.error('取消失败，请重试')
        this.dialogVisibleCL = false
      }
    },
    async applicationStrategy() {
      try {
        await applicationStrategy(this.ListItemInfo.innerCode, this.policyId)
        this.$message.success('应用策略成功')
        this.dialogVisibleCL = false
        await this.$store.dispatch('equipment/getNumEquipment')
        this.getList()
      } catch (error) {
        this.$message.error('应用策略失败，请重试')
        this.dialogVisibleCL = false
      }
    },
    selectionChange(val) {
      this.selectedItem = val
      console.log(this.selectedItem)
    },
    async batchOperation() {
      if (this.selectedItem.length === 0) {
        return this.$message('请勾选')
      }
      this.dialogVisible2 = true
      const res = await AllStrategy()
      this.AllDiscount = res.data
      console.log(this.AllDiscount)
    },
    async batchOperationFn() {
      await this.$refs.formCL.validate()
      const arr = []
      this.selectedItem.forEach((item) => {
        arr.push(item.innerCode)
      })
      await applicationStrategy(arr, this.formCL.CLpolicyId)
      this.dialogVisible2 = false
      this.$message.success('批量操作成功')
      await this.$store.dispatch('equipment/getNumEquipment')
      this.getList()
    },
  },
  components: {
    mainSearch,
    List,
    Paging,
    Add,
    ChangeEquipments,
    Aisle,
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
