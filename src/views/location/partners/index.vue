<template>
  <div>
    <!-- 头部搜索 Start -->
    <Search title="合作商搜索" @searchArea="searchPartners"></Search>
    <!-- 头部搜索 End -->

    <!-- 主体列表 Start -->
    <el-card class="box-card" shadow="never">
      <!-- 新增按钮 -->
      <Button
        @click.native="addPartners"
        text="新增"
        icon="el-icon-circle-plus-outline"
        color="linear-gradient(135deg, rgb(255, 151, 67), rgb(255, 94, 32))"
      ></Button>
      <!-- 列表 -->
      <NList
        :tableData="partnersList.currentPageRecords"
        :table="table"
        width="250px"
      >
        <template #operation>
          <TextButton text="重置密码" @click.native="resetPwd"></TextButton>
          <TextButton text="查看详情" @click.native="partnersInfo"></TextButton>
          <TextButton text="修改" @click.native="editPartnersInfo"></TextButton>
          <TextButton
            text="删除"
            color="red"
            @click.native="delPartners"
          ></TextButton>
        </template>
      </NList>
      <!-- 分页 -->
      <Pagination
        v-if="partnersList.totalCount > 10"
        :areaInfo="partnersList"
        @nextPage="nextPage"
        @prevPage="prevPage"
        @currentPage="currentPage"
      ></Pagination>
    </el-card>
    <!-- 主体列表 End -->

    <!-- 弹出层 -->
    <Dialod :title="title" :dialogVisible="dialogVisible" @close="onClose">
      <!-- 合作商详情 -->
      <el-row v-if="title === '合作商详情'">
        <el-col :span="12">
          <el-row>
            <el-col :span="12" class="col-left">合作商名称:</el-col>
            <el-col :span="12">{{ this.partnersDetail.name }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="12" class="col-left">联系人:</el-col>
            <el-col :span="12">{{ this.partnersDetail.contact }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="12" class="col-left">联系电话:</el-col>
            <el-col :span="12">{{ this.partnersDetail.mobile }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="12" class="col-left">分成比例:</el-col>
            <el-col :span="12">{{ this.partnersDetail.ratio }}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- 修改/新增 -->
      <el-form ref="form" :model="partnersDetail" :rules="formRules" v-else>
        <el-form-item label="合作商名称:" prop="name">
          <el-input
            v-model="partnersDetail.name"
            placeholder="请输入内容"
            maxlength="10"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人:" prop="contact">
          <el-input
            v-model="partnersDetail.contact"
            placeholder="请输入内容"
            maxlength="10"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话:" prop="mobile">
          <el-input
            v-model="partnersDetail.mobile"
            placeholder="请输入内容"
            maxlength="11"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="分成比例(%):" prop="ratio">
          <el-input-number
            v-model="partnersDetail.ratio"
            controls-position="right"
            :min="0"
            :max="100"
            placeholder="请输入"
          ></el-input-number>
        </el-form-item>
        <el-form-item
          label="账号:"
          prop="account"
          v-if="title === '新增合作商'"
        >
          <el-input
            v-model="partnersDetail.account"
            placeholder="请输入内容"
            maxlength="18"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item
          label="账号:"
          prop="password"
          v-if="title === '新增合作商'"
        >
          <el-input
            v-model="partnersDetail.password"
            placeholder="请输入内容"
            maxlength="18"
            show-word-limit
          ></el-input>
        </el-form-item>
        <!-- 取消/确定按钮 -->
        <div class="button">
          <Button
            text="取消"
            color="#fbf4f0"
            textColor="#655b56"
            @click.native="onClose"
          ></Button>
          <Button
            text="确定"
            color="linear-gradient(135deg,#ff9743,#ff5e20)"
            class="el-button--primary1"
            @click.native="editPartners"
          ></Button>
        </div>
      </el-form>
    </Dialod>
  </div>
</template>

<script>
import Search from '@/components/Seartch/'
import NList from '@/components/n-List'
import Button from '@/components/Button'
import TextButton from '@/components/Text-Button'
import Pagination from '@/components/Pagination'
import Dialod from '@/components/Dialod'
import {
  getPartnersList,
  resetPassword,
  editPartners,
  addPartners,
  delPartners,
} from '@/api'
export default {
  data() {
    return {
      partnersList: {},
      params: {
        pageSize: 10,
      },
      table: [
        {
          label: '合作商名称',
          prop: 'name',
        },
        {
          label: '账号',
          prop: 'account',
        },
        {
          label: '设备数量',
          prop: 'vmCount',
        },
        {
          label: '分成比例',
          prop: 'ratio',
        },
        {
          label: '联系人',
          prop: 'contact',
        },
        {
          label: '联系电话',
          prop: 'mobile',
        },
      ],
      dialogVisible: false,
      title: '',
      partnersDetail: {
        account: '',
        password: '',
      },
      formRules: {
        name: [
          {
            required: true,
            message: '请输入合作商名称',
            trigger: 'change',
          },
        ],
        contact: [
          {
            required: true,
            message: '请输入联系人',
            trigger: 'change',
          },
        ],
        mobile: [
          {
            required: true,
            message: '请输入联系电话',
            trigger: 'change',
          },
          {
            pattern:
              /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
            message: '请输入正确的手机号格式',
            trigger: 'change',
          },
        ],
        ratio: [
          {
            required: true,
            message: '请输入分成比例',
            trigger: 'blur',
          },
        ],
        account: [
          {
            required: true,
            message: '请输入联系人',
            trigger: 'change',
          },
        ],
        password: [
          {
            required: true,
            message: '请输入联系电话',
            trigger: 'change',
          },
        ],
      },
    }
  },

  created() {
    this.getPartnersList()
  },

  methods: {
    // 搜索供应商
    searchPartners(val) {
      this.params.name = val
      this.getPartnersList()
    },
    // 获取供应商列表
    async getPartnersList() {
      const res = await getPartnersList(this.params)
      console.log(res.data)
      res.data.currentPageRecords.forEach((item) => {
        item.ratio += '%'
      })
      this.partnersList = res.data
    },
    // 下一页
    nextPage() {
      this.params.pageIndex = ++this.partnersList.pageIndex
      this.getPartnersList()
    },
    // 上一页
    prevPage() {
      this.params.pageIndex = --this.partnersList.pageIndex
      this.getPartnersList()
    },
    // 点击页数
    currentPage(val) {
      this.params.pageIndex = val
      this.getPartnersList()
    },
    onClose() {
      this.dialogVisible = false
      if (this.title !== '合作商详情') {
        this.$refs.form.resetFields()
      }
    },
    // 重置密码
    resetPwd() {
      this.$msgbox({
        title: '确定要重置合作商密码吗？',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        type: 'error',
      })
        .then(async () => {
          await resetPassword(this.$store.state.location.columnInfo.id)
          this.$message.success('重置密码成功')
          this.getPartnersList()
        })
        .catch(() => {})
    },
    // 查看详情
    partnersInfo() {
      this.title = '合作商详情'
      this.dialogVisible = true
      setTimeout(() => {
        this.partnersDetail = this.$store.state.location.columnInfo
      })
    },
    // 点击修改
    editPartnersInfo() {
      this.title = '修改合作商'
      this.dialogVisible = true
      setTimeout(() => {
        this.partnersDetail = JSON.parse(
          JSON.stringify(this.$store.state.location.columnInfo),
        )
        if (typeof this.partnersDetail.ratio === 'string') {
          this.partnersDetail.ratio = this.partnersDetail.ratio.replace(
            /%/g,
            '',
          )
        }
        console.log(this.partnersDetail)
      })
    },
    // 删除供应商
    delPartners() {
      setTimeout(async () => {
        await delPartners(this.$store.state.location.columnInfo.id)
        this.$message.success('删除供应商成功')
        this.onClose()
        this.getPartnersList()
      })
    },
    // 点击新增按钮
    addPartners() {
      this.title = '新增合作商'
      this.dialogVisible = true
    },
    // 点击确定修改/新建合作商
    async editPartners() {
      try {
        await this.$refs.form.validate()
        if (this.title === '修改合作商') {
          await editPartners(this.partnersDetail)
          this.$message.success('修改信息成功')
        } else {
          await addPartners(this.partnersDetail)
          this.$message.success('新增合作商成功')
        }
        this.onClose()
        this.getPartnersList()
      } catch (error) {}
    },
  },

  components: {
    Search,
    NList,
    Button,
    TextButton,
    Pagination,
    Dialod,
  },
}
</script>

<style scoped lang="less">
.box-card {
  border: unset;
}
.el-col-12 {
  height: 36px;
  line-height: 36px;
}
.col-left {
  text-align: right;
  padding-right: 12px;
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
    .el-input-number {
      width: 100%;
    }
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
