<template>
  <el-dialog title="工单详情" width="40%" :visible="visible" @close="onClose">
    <el-row>
      <el-col :span="3">
        <div class="grid-content bg-purple-dark">
          <i
            class="el-icon-s-finance"
            style="line-height: 54px; font-size: 50px; margin-left: 15px"
            v-show="clickrow.statusName === '已完成'"
          ></i>
          <i
            class="el-icon-success"
            style="
              line-height: 54px;
              font-size: 50px;
              margin-left: 15px;
              color: #79e192;
            "
            v-show="clickrow.statusName !== '已完成'"
          ></i>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple-dark" style="line-height: 54px">
          {{
            clickrow.statusName === '已完成'
              ? '完成'
              : clickrow.statusName === '进行中'
              ? '进行中'
              : clickrow.statusName === '已取消'
              ? '取消'
              : '待办中'
          }}
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple-dark">
          <img
            src="http://likede2-admin.itheima.net/img/pic_0.979e683d.png"
            alt=""
            v-show="clickrow.statusName === '已完成'"
          />
          <img
            src="http://likede2-admin.itheima.net/img/pic_2.3b5af41c.png"
            alt=""
            v-show="clickrow.statusName !== '已完成'"
          />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          设备编号：{{ clickrow.innerCode }}
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          创建日期：{{ clickrow.createTime }}
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          取消日期：{{ clickrow.createTime }}
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          运维人员：{{ clickrow.userName }}
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          工单类型：{{ clickrow.taskType }}
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          工单方式：{{ clickrow.Type }}
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">取消原因：{{ clickrow.Type }}</div>
      </el-col>
      <el-col :span="12"> </el-col>
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
    clickrow: {
      type: Object,
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
