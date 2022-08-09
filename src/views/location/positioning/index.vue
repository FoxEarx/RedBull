<template>
  <div>
    <!-- 头部区域 Start -->
    <Search title="点位搜索" @searchArea="search">
      <!-- 下拉框 -->
      <div class="select">
        <span>区域搜索:</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </Search>
    <!-- 头部区域 End -->

    <!-- 列表区域 Start -->
    <el-card class="box-card">
      <!-- 新建按钮 -->
      <Button
        icon="el-icon-circle-plus-outline"
        text="新建"
        color="linear-gradient(135deg,#ff9743,#ff5e20)!important"
        @click.native="addPosition"
      ></Button>
      <!-- 主体内容 -->
      <NList :table="table" :tableData="position.currentPageRecords">
        <template #operation>
          <TextButton text="查看详情" @click.native="positionInfo"></TextButton>
          <TextButton text="修改" @click.native="editPositionInfo"></TextButton>
          <TextButton text="删除" color="red"></TextButton>
        </template>
      </NList>
      <!-- 分页 -->
      <Pagination
        :areaInfo="position"
        @nextPage="nextPage"
        @prevPage="prevPage"
        @currentPage="currentPage"
      ></Pagination>
    </el-card>
    <!-- 列表区域 End -->

    <!-- 弹出层 -->
    <Dialod :dialogVisible="dialogVisible" :title="title" @close="onClose">
      <!-- 点位详情 -->
      <NList
        v-if="title === '点位详情'"
        class="dialod"
        :show="show"
        :table="positionTabel"
        :tableData="positionDetail"
      ></NList>
      <!-- 修改点位 -->
      <el-form v-else :model="formData" :rules="formRules" ref="form">
        <el-form-item label="点位名称:" prop="name">
          <el-input
            v-model="formData.name"
            placeholder="请输入点位名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="所在区域:" prop="regionId">
          <el-select v-model="formData.regionId" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在商圈:" prop="businessId">
          <el-select v-model="formData.businessId" placeholder="请选择">
            <el-option
              v-for="item in businessoptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属合作商:" prop="ownerId">
          <el-select
            v-model="formData.ownerId"
            placeholder="请选择"
            @change="owner"
            ref="select"
          >
            <el-option
              v-for="item in owneroptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址:" prop="addrInfo">
          <el-cascader
            ref="cascader"
            :options="addr"
            v-model="formData.addrInfo"
            :props="{ label: 'text', value: 'text' }"
            @change="getCheckedNodes"
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item prop="textarea">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="formData.textarea"
          >
          </el-input>
        </el-form-item>

        <!-- 确认按钮 -->
        <div class="button">
          <Button
            text="取消"
            @click.native="onClose"
            color="#fbf4f0"
            textColor="#655b56"
          ></Button>
          <Button
            text="确认"
            color="linear-gradient(135deg,#ff9743,#ff5e20)"
            class="el-button--primary1"
            @click.native="editPosition"
          ></Button>
        </div>
      </el-form>
    </Dialod>
  </div>
</template>

<script>
import Search from '@/components/Seartch'
import NList from '@/components/n-List'
import Button from '@/components/Button'
import Pagination from '@/components/Pagination'
import TextButton from '@/components/Text-Button'
import Dialod from '@/components/Dialod'
import dayjs from 'dayjs'
import { cityData3 } from './city.data-3.js'
import {
  getPositionList,
  getLocationList,
  getPositionInfo,
  getBusinessList,
  getOwnerList,
  editPositionInfo,
  addPositionInfo,
} from '@/api'
export default {
  data() {
    return {
      params: {},
      position: {},
      table: [
        {
          label: '点位名称',
          prop: 'name',
        },
        {
          label: '所在区域',
          prop: 'region.name',
        },
        {
          label: '商圈类型',
          prop: 'businessType.name',
        },
        {
          label: '合作商',
          prop: 'ownerName',
        },
        {
          label: '详细地址',
          prop: 'addrInfo',
        },
      ],
      value: '',
      options: [],
      dialogVisible: false,
      title: '',
      positionTabel: [
        {
          label: '机器编号',
          prop: 'innerCode',
        },
        {
          label: '设备状态',
          prop: 'vmStatus',
        },
        {
          label: '最后一次供货时间',
          prop: 'lastSupplyTime',
        },
      ],
      show: false,

      // addrInfo: [],
      // textarea: '',
      // 所在区域
      positionDetail: [],
      // 所在商圈
      businessoptions: [],
      // 归属合作商
      owneroptions: [],
      // 城市数据
      addr: cityData3,

      formData: {
        // 点位名称
        name: '',
        // 所在商圈
        businessId: '',
        // 所在区域
        regionId: '',
        // 归属合作商
        ownerId: '',
        ownerName: '',
        // 详细地址
        addr: '',
        addrInfo: '',
        textarea: '',
        createUserId: 1,
      },
      formRules: {
        name: [
          {
            required: true,
            message: '请输入点位名称',
            trigger: 'change',
          },
        ],
        regionId: [
          {
            required: true,
            message: '请选择所属区域',
            trigger: 'change',
          },
        ],
        businessId: [
          {
            required: true,
            message: '请选择所属商圈',
            trigger: 'change',
          },
        ],
        ownerId: [
          {
            required: true,
            message: '请选择所属合作商',
            trigger: 'blur',
          },
        ],
        addrInfo: [
          {
            required: true,
            message: '请选择地址',
            trigger: 'change',
          },
        ],
        textarea: [
          {
            required: true,
            message: '请输入详细地址',
            trigger: 'change',
          },
        ],
      },
    }
  },

  created() {
    this.getPositionList()
    this.getLocationList()
  },

  methods: {
    // 搜索点位
    search(val) {
      this.params.name = val
      this.params.regionId = this.value
      this.getPositionList(this.params)
    },
    // 获取合作商名字
    owner(val) {
      let obj = {}

      obj = this.owneroptions.find((item) => {
        return item.id === val
      })
      this.formData.ownerName = obj.name
    },
    // 次级联选框获得数据
    getCheckedNodes(val) {
      if (val) {
        this.formData.addr = val
      }
      const aa = this.$refs.cascader.getCheckedNodes()
      if (aa) {
        this.formData.areaCode = aa[0].data.value
      }
    },
    // 获取点位管理列表
    async getPositionList(params) {
      const res = await getPositionList(params)
      res.data.currentPageRecords.forEach((item) => {
        const arr = item.addr.split('-')
        item.addrInfo = arr[arr.length - 1]
      })
      this.position = res.data
    },
    // 获取区域搜索信息
    async getLocationList() {
      const res = await getLocationList(1, '', 10000)
      res.data.currentPageRecords.forEach((item) => {
        this.options.push({ value: item.id, label: item.name })
      })
    },
    // 新增点位信息
    addPosition() {
      this.title = '新增点位'
      this.dialogVisible = true

      this.formData.createUserId =
        this.position.currentPageRecords[0].createUserId
      // 获取商圈
      this.getBusinessList()
      // 获取合作商
      this.getOwnerList()
      console.log(this.formData)
    },
    // 点击下一页
    nextPage() {
      this.params.pageIndex = ++this.position.pageIndex
      this.getPositionList(this.params)
    },
    // 点击上一页
    prevPage() {
      this.params.pageIndex = --this.position.pageIndex
      this.getPositionList(this.params)
    },
    // 点击页数
    currentPage(val) {
      this.params.pageIndex = val
      this.getPositionList(this.params)
    },
    // 点击获取点位信息详情
    positionInfo() {
      this.title = '点位详情'
      this.dialogVisible = true
      setTimeout(async () => {
        const res = await getPositionInfo(
          this.$store.state.location.columnInfo.id,
        )
        res.data.forEach((item) => {
          item.lastSupplyTime = dayjs(item.lastSupplyTime).format(
            'YYYY.MM.DD HH:mm:ss',
          )
          switch (item.vmStatus) {
            case 0:
              item.vmStatus = '未投放'
              return
            case 1:
              item.vmStatus = '运营'
              return
            default:
              item.vmStatus = '撤机'
          }
        })
        this.positionDetail = res.data
      })
    },
    // 修改点位信息
    async editPositionInfo() {
      this.title = '修改点位'
      this.dialogVisible = true
      // 获取商圈
      this.getBusinessList()
      // 获取合作商
      this.getOwnerList()
      setTimeout(() => {
        this.getCityInfo()
        console.log(this.$store.state.location.columnInfo)
        this.formData.name = this.$store.state.location.columnInfo.name
        this.formData.createUserId =
          this.$store.state.location.columnInfo.createUserId
        this.formData.areaCode = this.$store.state.location.columnInfo.areaCode
        this.$store.state.location.columnInfo.businessType.name
        this.formData.ownerId = this.$store.state.location.columnInfo.ownerId
        this.formData.regionId = this.$store.state.location.columnInfo.regionId
        this.formData.id = this.$store.state.location.columnInfo.id
      })
    },
    // 关闭弹层
    onClose() {
      this.dialogVisible = false
    },
    // 获取商圈
    async getBusinessList() {
      const res = await getBusinessList()
      this.businessoptions = res.data
      if (this.title !== '新增点位') {
        this.formData.businessId =
          this.$store.state.location.columnInfo.businessType.id
      }
    },
    // 获取合作商
    async getOwnerList() {
      const res = await getOwnerList(1000)
      this.owneroptions = res.data.currentPageRecords
      if (this.title !== '新增点位') {
        this.formData.ownerName =
          this.$store.state.location.columnInfo.ownerName
      }
    },
    // 获取城市数据
    getCityInfo() {
      const arr = this.$store.state.location.columnInfo.addr.split('-')
      if (arr[1] === '市辖区') {
        arr[1] = arr[0]
      }
      this.formData.textarea = arr[arr.length - 1]

      arr.splice(arr.length - 1, 1)
      this.formData.addrInfo = arr
      console.log(this.formData)
    },
    // 点击确定修改点位信息
    async editPosition() {
      try {
        await this.$refs.form.validate()
        this.formData.addr = this.formData.addrInfo
        this.formData.addr =
          this.formData.addr.join('-') + '-' + this.formData.textarea
        if (this.title === '新增点位') {
          const res = await addPositionInfo(this.formData)
          this.$message.success('添加成功')
        } else {
          await editPositionInfo(this.formData)
          this.$message.success('修改成功')
        }
        this.onClose()
        this.$refs.form.resetFields()
        this.getPositionList()
      } catch (error) {
        this.$message.error(error.response.data)
      }
    },
  },

  components: {
    Search,
    NList,
    Button,
    Pagination,
    TextButton,
    Dialod,
  },
}
</script>

<style scoped lang="less">
.select {
  width: 285px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 10px;
  span {
    font-size: 14px;
    margin-right: 12px;
  }
  .el-select {
    width: 203px;
  }
}
/deep/.dialod {
  .has-gutter {
    height: 42px;
  }
  .el-table td,
  .el-table th {
    padding: 0;
  }
  .el-table td,
  .el-table th.is-leaf {
    border-bottom: 0;
  }
  th.is-leaf {
    border-bottom: 0;
    background: rgb(243, 246, 251);
  }
  .el-table__row {
    height: 44px;
    border-top: 0;
  }
  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    background-color: #fff;
  }
}

/deep/.el-form {
  .el-form-item {
    display: flex;
    .el-form-item__label {
      width: 115px;
    }
    .el-form-item__content {
      width: 396px;
    }
    .el-select {
      width: 100%;
    }
    .el-cascader {
      width: 100%;
    }
  }
  .el-textarea {
    margin-left: 115px;
  }
  .button {
    display: flex;
    justify-content: center;
    .el-button {
      width: 80px;
    }
    .el-button--primary1 {
      margin-left: 34px;
    }
  }
}
</style>
