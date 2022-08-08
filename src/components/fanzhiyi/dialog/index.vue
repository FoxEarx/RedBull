<template>
  <el-dialog title="订单详情" width="40%" :visible="visible" @close="onClose">
    <el-row>
      <el-col :span="3">
        <div class="grid-content bg-purple-dark">
          <i
            class="el-icon-s-finance"
            style="line-height: 54px; font-size: 50px; margin-left: 15px"
            v-show="orderevent.status === 0"
          ></i>
          <i
            class="el-icon-success"
            style="
              line-height: 54px;
              font-size: 50px;
              margin-left: 15px;
              color: #79e192;
            "
            v-show="orderevent.status !== 0"
          ></i>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple-dark" style="line-height: 54px">
          {{
            orderevent.status === 0
              ? '未支付'
              : orderevent.status === 1
              ? '支付完成'
              : orderevent.status === 2
              ? '出货成功'
              : '出货失败'
          }}
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple-dark">
          <img
            src="http://likede2-admin.itheima.net/img/pic_0.979e683d.png"
            alt=""
            v-show="orderevent.status === 0"
          />
          <img
            src="http://likede2-admin.itheima.net/img/pic_2.3b5af41c.png"
            alt=""
            v-show="orderevent.status !== 0"
          />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          订单编号：{{ orderevent.orderNo }}
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          商品名称：{{ orderevent.skuName }}
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          设备编号：{{ orderevent.innerCode }}
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          订单金额：{{ orderevent.amount }}
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          完成时间：{{ orderevent.updateTime }}
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          创建时间：{{ orderevent.createTime }}
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          设备地址：{{ orderevent.addr }}
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          支付方式：{{ orderevent.payType === 1 ? '支付宝支付' : '微信支付' }}
        </div>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {}
  },

  created() {},
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    orderevent: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onClose() {
      this.$emit('update:visible', false)
    },
    // map() {
    //   const arr = orderevent.addr.split('-')
    //   const index = arr.length - 1
    //   console.log(arr[index])
    //   this.map = arr[index]
    // },
  },
}
</script>

<style scoped lang="less">
/deep/.el-dialog {
  border-radius: 10px;
  .el-dialog__title {
    font-weight: 700;
  }
}
.el-row {
  margin-bottom: 20px;
  align-items: center;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  .bg-purple-dark {
    // width: 600px;
    height: 54px;
    background-color: #f8f8f8;
    display: flex;
    img {
      // flex: 1;
      float: right;
      width: 88px;
      height: 68px;
      margin-bottom: 7px;
    }
  }
}
</style>
