<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-scrollbar
        style="height: 100%"
        class="default-scrollbar"
        wrap-class="default-scrollbar__wrap"
        view-class="default-scrollbar__view"
      >
        <section class="app-main">
          <el-row :gutter="10" style="margin-left: -10px; margin-right: -10px">
            <el-col :span="12" style="padding-left: 10px; padding-right: 10px"
              ><div class="box user-task-stats-chart bg1">
                <div class="peo-header">
                  <div class="title">运营人员(当天)</div>
                </div>
                <div class="peo-body">
                  <div class="stats">
                    <div class="item">
                      <div class="num color1 text-shadow1">
                        {{ yyWorkList.total }}
                      </div>
                      <div class="text color2">工单总数(个)</div>
                    </div>
                  </div>
                  <div class="stats">
                    <div class="item">
                      <div class="num color1 text-shadow1">
                        {{ yyWorkList.completedTotal }}
                      </div>
                      <div class="text color2">完成工单(个)</div>
                    </div>
                  </div>
                  <div class="stats">
                    <div class="item">
                      <div class="num color1 text-shadow1">
                        {{ yyWorkList.cancelTotal }}
                      </div>
                      <div class="text color2">拒绝工单(个)</div>
                    </div>
                  </div>
                  <div class="stats">
                    <div class="item">
                      <div class="num color1 text-shadow1">
                        {{ yyWorkList.workerCount }}
                      </div>
                      <div class="text color2">运营人员数(个)</div>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12"
              ><div class="box user-task-stats-chart bg2">
                <div class="peo-header">
                  <div class="title">运维人员(当天)</div>
                </div>
                <div class="peo-body">
                  <div class="stats">
                    <div class="item">
                      <div class="num color3 text-shadow2">
                        {{ ywWorkList.total }}
                      </div>
                      <div class="text color4">工单总数(个)</div>
                    </div>
                  </div>
                  <div class="stats">
                    <div class="item">
                      <div class="num color3 text-shadow2">
                        {{ ywWorkList.completedTotal }}
                      </div>
                      <div class="text color4">完成工单(个)</div>
                    </div>
                  </div>
                  <div class="stats">
                    <div class="item">
                      <div class="num color3 text-shadow2">
                        {{ yyWorkList.cancelTotal }}
                      </div>
                      <div class="text color4">拒绝工单(个)</div>
                    </div>
                  </div>
                  <div class="stats">
                    <div class="item">
                      <div class="num color3 text-shadow2">
                        {{ yyWorkList.workerCount }}
                      </div>
                      <div class="text color4">运营人员数(个)</div>
                    </div>
                  </div>
                </div>
              </div></el-col
            >
          </el-row>
          <el-row :gutter="10" style="margin-left: -10px; margin-right: -10px">
            <el-col :span="18" style="padding-left: 10px; padding-right: 10px"
              ><div class="box user-task-status">
                <div class="peo-header">
                  <div class="title">工单状态</div>
                  <el-date-picker
                    size="small"
                    v-model="formDate"
                    type="daterange"
                    range-separator="~"
                    :picker-options="pickerOptions"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  >
                  </el-date-picker>
                  <div class="week-month-year">
                    <div :class="className" @click="active">周</div>
                    <div :class="className1" @click="active1">月</div>
                    <div :class="className2" @click="active2">年</div>
                  </div>
                </div>
                <div class="peo-charts">
                  <div class="chart">
                    <div class="empty show">
                      <img
                        src="../../../assets/person_img/empty.87c4f71b.png"
                        alt=""
                      />
                      <div class="tips">暂无数据</div>
                    </div>
                  </div>
                </div>
              </div></el-col
            >
            <el-col :span="6" style="padding-left: 10px; padding-right: 10px"
              ><div class="box bg3 user-task-rank">
                <div class="peo-header">
                  <div class="title">人效排名（月度）</div>
                  <el-select
                    size="small"
                    v-model="peoArea"
                    placeholder="全部"
                    @change="seletChange"
                  >
                    <el-option
                      v-for="item in area"
                      :key="item.id"
                      :label="item.remark"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </div>
                <div class="role-group">
                  <div class="role-list">
                    <div :class="className3" @click="yyActive">运营人员</div>
                    <div :class="className4" @click="ywActive">运维人员</div>
                  </div>
                </div>
                <div class="empty">
                  <img
                    src="../../../assets/person_img/empty.87c4f71b.png"
                    alt=""
                  />
                  <div class="tips">暂无数据</div>
                </div>
              </div></el-col
            >
          </el-row>
        </section>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import {
  getTaskReportInfo,
  getAreaList,
  getCollectReport,
  getUserWorkTop10,
} from '@/api/person'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      isActive: 'false',
      className: 'item is-checked',
      className1: 'item',
      className2: 'item',
      className3: 'item is-checked',
      className4: 'item',
      value: '',
      formDate: {},
      pickerOptions: {
        disabledDate(time) {
          //选择今天以及今天之前的日期
          return time.getTime() > Date.now() - 8.64e7 //如果没有后面的-8.64e7就是不可以选择今天的
        },
      },
      yyWorkList: {},
      ywWorkList: {},
      peoArea: '0',
      area: [],
      isRepair: true,
    }
  },

  created() {
    this.formDate = this.getNowTime()
    this.getTaskReportInfo()
    this.getAreaList()
    this.yyActive()
  },

  methods: {
    //初始默认执行(重点)
    async active() {
      this.className = 'item is-checked'
      this.className1 = 'item'
      this.className2 = 'item'
      this.getNowTime()
      this.formDate = this.getNowTime()
      await getCollectReport(this.formDate[0], this.formDate[1])
    },
    async active1() {
      this.className1 = 'item is-checked'
      this.className = 'item'
      this.className2 = 'item'
      this.getNowTime1()
      this.formDate = this.getNowTime1()
      await getCollectReport(this.formDate[0], this.formDate[1])
    },
    async active2() {
      this.className2 = 'item is-checked'
      this.className1 = 'item'
      this.className = 'item'
      this.getNowTime2()
      this.formDate = this.getNowTime2()
      await getCollectReport(this.formDate[0], this.formDate[1])
    },
    async yyActive() {
      this.className3 = 'item is-checked'
      this.className4 = 'item'
      this.isRepair = true
      this.getNowTime1()
      this.formDate = this.getNowTime1()
      const res = await getUserWorkTop10(
        this.formDate[0],
        this.formDate[1],
        this.isRepair,
        this.peoArea,
      )
    },
    async ywActive() {
      this.className4 = 'item is-checked'
      this.className3 = 'item'
      this.isRepair = false
      this.getNowTime1()
      this.formDate = this.getNowTime1()
      const res = await getUserWorkTop10(
        this.formDate[0],
        this.formDate[1],
        this.isRepair,
        this.peoArea,
      )
    },
    getNowTime() {
      // const start = new Date(new Date().getTime() - 3600 * 1000 * 24 * 7)
      //   .toISOString()
      //   .replace('T', ' ')
      //   .split('.')[0] //默认开始时间7天前
      const start = '2022-08-06'
      const end = dayjs(new Date()).format('YYYY-MM-DD') //默认结束时间1天前
      return [start, end]
    },
    getNowTime1() {
      const start = '2022-08-01'
      const end = dayjs(new Date()).format('YYYY-MM-DD') //默认结束时间1天前
      return [start, end]
    },
    getNowTime2() {
      const start = '2022-01-01'
      const end = dayjs(new Date()).format('YYYY-MM-DD')
      return [start, end]
    },
    async getAreaList() {
      const res = await getAreaList({
        pageIndex: 1,
        pageSize: 10000,
      })
      this.area = res.data.currentPageRecords
      this.area.unshift({ id: '0', remark: '全部' })
    },
    seletChange() {
      if (this.isRepair) {
        this.yyActive()
      } else {
        this.ywActive()
      }
    },
    async getTaskReportInfo() {
      const date1 = new Date(
        new Date(new Date().toLocaleDateString()).getTime(),
      )
      const date2 = new Date(
        new Date(new Date().toLocaleDateString()).getTime() +
          24 * 60 * 60 * 1000 -
          1,
      )
      const start =
        date1.getFullYear() +
        '-' +
        (date1.getMonth() + 1 < 10
          ? '0' + (date1.getMonth() + 1)
          : date1.getMonth() + 1) +
        '-' +
        (date1.getDate() < 10 ? '0' + date1.getDate() : date1.getDate()) +
        ' ' +
        (date1.getHours() < 10 ? '0' + date1.getHours() : date1.getHours()) +
        ':' +
        (date1.getMinutes() < 10
          ? '0' + date1.getMinutes()
          : date1.getMinutes()) +
        ':' +
        (date1.getSeconds() < 10
          ? '0' + date1.getSeconds()
          : date1.getSeconds())
      const end =
        date2.getFullYear() +
        '-' +
        (date2.getMonth() + 1 < 10
          ? '0' + (date2.getMonth() + 1)
          : date2.getMonth() + 1) +
        '-' +
        (date2.getDate() < 10 ? '0' + date2.getDate() : date2.getDate()) +
        ' ' +
        date2.getHours() +
        ':' +
        date2.getMinutes() +
        ':' +
        date2.getSeconds()
      const res = await getTaskReportInfo(start, end)
      this.yyWorkList = res.data[0]
      this.ywWorkList = res.data[1]
    },
  },
}
</script>

<style lang="scss">
.bg1 {
  background-color: #e9f3ff;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMcAAABaCAYAAAAM/UJbAAAM50lEQVR4Xu2dW3MUxxXHf6dnVkIXxN02BiIJULhVJZWgGOJcqnhMnvLEh0jlQ/A58hH8mlTyyEOqXGBjjLEBc5WEwNzvuiDtTp9UD1oshMTuzs7Mzqx6q1Si2O5z+Xf/NdPdp8+Rs5P6D/zHI5AEAcMTUR4m6Vr0Pq+Vy+LJUfRhKq59anlhAn4qroXJLDPKs/EROS9nJvXvAiaZGN9rPSMgygyG6W7CwCo27OHs+KcyJ2cn9G8Iu7vJQe9LbgjMizCZm7YcFIUVbvz2U5lyquTMHT1OjcMC/Tno9iq6CAEVFg3c7BaXxPBqfDdfi4i+IceEHhehX+GQgHSLo96PHBBQamK4noOmzFWoolrl3PExeVlXFpMjZomwE9iVuRVeQdcgIEqE4Vo3OKTKrWMjMrHcl7fkiAliOICysRuc9T5kj4CARbiavaZsNQTw/Ogw5+HN69R7Tw73H0bpiYQjRgiyNcdL7wYEFNQIP5baF0ttFs6eGJXXK/1458kRfylsFdhbaoe98bkg0CXkuPTZqNxfDbD3yfGm1YgI23NB2CspLQJlf62ycO/4sFxeawBWJYdI/PLldq/89m5pp272hpd5QS4Rr8ZHOScitiVy1NcfKhxGCLOH2WsoJQJl3cqNqO4QvhpdZZ2x5oL8vQFShjCM+fOPUk7dzI0u4yGgO88YDLhwZI88bQTQWmuOt/0EPvHhJY1gXLffly58JLLc/P2oNBXy0pAcS8PuF+jrdv6v7XjZAg/tIveOj629AG+8lbsKFlENCQPGMAz5OeIRqCNQppB1UZ6OD3OhHjfVzCg2++RAIwITchDoa0awb7MOEFCeiCn+ZSdrmZ2f5NyJE1JrZVSaJkd9B0sCDlqlpxUlvm13IqDCfQPPiuydgYVXlnOrnYA3srslcsTChD5RDvgt3kbQdv/3qkwbw0xhPY2ozs5z/sQRSWRj6+R4E8Hbb5UDPgarsNMiF8NMwE21LOairFUlltrQIOcP7pBXrXatt09EDtdZDYOBMKbWBykmBb/M/VxcVSBcdb+L5odYItnEt+Nb5UU7tiUmh1MaKUOBYb+/g97OEJSzryqLxhTvFqC7A24Dvvu8iUO+Rsi3RY46QSoh+/wTpBHU3fW9VV4FhjtF8so9MaohF9MgRry8rt8EbMdJ94qFZcyvQdpBsVx9xfAI5XFhrLbUzCYutPsqtdyfVMgRs0zoR/ml38UqzHTJ1BBjmFaXmqcIn4jq0Ea+bWfxvZobqZEjFi70uUW6PwcpwozJ1gY1XDPuDnmHP/E5xgwXkm7Xfsj8dMmxdNVWDWP+JL3DsyZD9SIsALcyVNGU6PjkGy4kOeBrRkHq5HBK41ATwz4fi9XMEJSvjQrPDdzrpOUuVmpmgu9bDQlpxeZMyOEMcMGKQciwv27bynCUo63ATwhtnSG046mLrj22nyutBBEm0ZcZOerGuPsgKuzyF6aSDE9B+yjXxdBSEF8anriLSla51ex9jHZ1Zk6O2EBlSIS9fier3eEqRP/XIryT/CwXqyKqAxV+aOYGX1r25EOOpYW6fXOa7pM2pDV6HZCjhsdGeZSnapfDdnuNi43ufKdtU27kcIbHWU3Ur0PSHsQ85UXCZAjzeel06XOO/YIfP5QlJCtbciXHWyeErY4k/kQ9q2HNSK5SFcONjKS/K9bGa5qrayVcy8OGzpCjfh4SMOpz8+YxzCnpyOnmn8td+9JyKavzi2bR6Bg53u5mCTsVPvW7Wc0OWUfbTYjwXk7ZtCxyu1HAxLERVxDn3aTOaeloRU7HybG0FnH1QUb8Yr2Vocu3rbUsBEF2p+KRZUZqXFleHyNfD9/XVghyxGZVQKrxmYh7ivgahZ2eGSv0G+G+ZnBf3N2/UGXi+AhTWR/qtQppccixZLmBXjWM+LVIq0OZXXsxWFGuq6vHkeLHVOLkDD+64pQpik1NVOHIUfcssmwLQnaJz3SS2mAnFaTCC+NCRlL6WFhYVG7+eUQ6Gp/VyJ3CksMZbgVjiMuxfexftRoNZabfp7IQd69QkeH23TNMnjwpHQ93b4RYoclRN95VnFITl4Pe2sgh/326CKgyawy325VqDA+31bie9yl3O3aXghxvSWIYsG7bV9nUjtO+b/MIOGI4gjTfY0XLgCe2j1vHt/1cpTWxrJw7loocdWyW7qzvMuKLe2Y8XxIHGUbKs9fKrROj8jxjGzMTX0pyvEVD2SgBO13Ub2YIrWPBSTIaOlIMCBO/GpZCpwltZljLTY4lD6OI/jDgY31T7FOacdy3aYhA07U33Mm2CA8W57n9x4PJMww2tCjnBl1BjjpmkdITBHyklh0+qLG9mWQtt4OgwVrDUrOWn+YN052Og2rP29V7dxU56i7aCBOEbLEak2QwC+C6WWajojRa40UQcPfoMA86EUqeF/ZdSY7l4GnIBlNlB8I2fxOx8bSKc+DCLVfv753WEVVV7m8Y4O6vP5Hku1eNTShMi64nx9tXLledKmRIYYv78a9da87Bp279EH/rXpsMjyTgwWe7eFq02KesWbRuyLEcSHcjMaqxKQjYQsAmrC8nHeMj8dPhmhEemgoP/v1Pnp46tXad7qwnZ6flr0tyrARdLYMEDMWHi0L/etrxiksIKHMufspavvnDKLeRzt+l6DQx4r8VaSSSLoIjqdlgCYOAIRUGrVvMW/q6iSwxGQzzRplxC+8o4iWGmlieHtsn11LDsQsEeXI0GESXvVF6GDA2JsuAS3NapkjhpYW1I8OsNczoIrMSrMhxa6iGj7g4Pi7VLpjTqbngyZEESrdGEfoU+oKQPo3YIIYel0C7E08Z9zQwwqIrQSYBr6Ma8+IyhCjz7qnQyMV+w9VuONFu5Ger33tytIrYh9pXwNiYJL22Rm9gCNUQxgt+92/3W+PXNnEkshYTk8mlLCL+t3UrgHiyG6z7HUUoQi3OMOgycrx5BapFrh5FyIIRFqxhkYR/893O1LERyT9JW5q4ZyTLkyMjYMsgthIy96/d/HBK1u+O1IfGyZOjDLM4AxsjS7Ro+L4bwz7SgsuTIy0kSybHrzMaD5h8dUP32IBdjZv6Ft2CgIm4+9l+me4Wf7LyIw7vPnNTxzBsy0qJl1sgBCxPju+T6wWyqLCmxORQVfn6Bodt6G/WFXakUjDM1Hj1u/1cXm8xUkmhe3sx6PRpDfuHOaJCX1Jhvl9xERBlfm6KS1mWCSuu98kse+fW3BeXtGekn8MWNiQT53sVEQEDryfnuHzyiLwbhl5EYwtk03tXSv9zXXt3VDgcKb0FstObkhCBQFh4VOXyX8fEVYD1nxYQWPW+9ekJ3TAoHPIEaQHJAjZ1xJhRrvizjGSDs2YyAvcE2R5yyL9iJQO2073cq9TjGlf8EyP5SHwwU4dbgwz3ccgv0pMD3ImebvE9Nc8Vv8ZoD/2GaWzcLtbAbg74bd72gM6rt9uunb3DVb8r1T7iDcnhVLhzkLO32O8PCtsHPFMJlifH9nLDn2Okg3JT5Kir8qEm6YCehRQfEpI+qi2Rw6m/OKVbXtXYHxiC9M3xEltFwEXXbgy54S8rtYpc4/Ytk8OJdFu9/coBv1BvDHCWLdx9jJc1rvmt2mxQTkQOZ8opVfOXKYZV+Tgb07zUDyHgbvD9d5gpf1Epu3mSmBx1k9xr1hzsxbqSl/6TOQKGaj/c8q9RmSOdTkbyc+e0Em1hVI2vvJTlkLn0OcEzJnyWkCxR/ll220+O5WZ+eUm3ygAjZUpdkw/M7Wlx6XV0lsnPj8jT9iT53q0gkCo5nOIvVIM9k+xZKnKZuvxWnCt72zgBGzyYHmH6pBS/wGTZ8V5pf2aT98tp7aPGsIHN3QZaHv5YeE7I1Od7ZD4PfV7H+whkRo66qnM3dZNW2BNFvk5GMxMwCJiRKtPj++RFM+19m+wQyJwcddP/N6Vb+gy7a7U4pab/rEAgDJmdt9z5UxfU0uuWwc2NHHXAvp3QzVbYWfXlkmNIKsILo9z7TYmrrnYLGXJbczQC7Lv7OjA7w04MW41gGrXvpu+tYrE8HRjk3nqpklTG8cv9ybESpDgk/gjb7QwfudoYZQSxaZuVOTPIw9lLPPYh5U2j1rGGHSfHcs/d06QasU2rbOuWK7ruqqpUeFIJeOKfEh2b54kUF4ocyz04/VAHB6psqVk2m5It4m3IbGh4Plvh2YmPZCbRyPhOHUegsORYjsw51crcDTYHMETIxqBgqYMieE2NVxG87N/P83HxRWA6PrNTMKAU5Fjpp4vl6tnB4NwiA2Lodz8R9GZdOGapDPGCWubcT38Ps4uPmPGxTinMxAKKKCU5VsNRVc0337Bhfge9vZbeqtIrLlI4IKwEhFVLxe2KLVWSjX87OapoEGLdb7eLVDFUqxE1ImpqqFaEhQXDQt8jFo4e5XU3F6Uv4PzsqEn/B1VshFHJ0SGMAAAAAElFTkSuQmCC),
    url(data:image/png;base64,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);
  background-repeat: no-repeat, no-repeat;
  background-position: 0 0, calc(100% - 12px) 100%;
}

.bg2 {
  background: #fbefe8 url('../../../assets/person_img/operation.4120cc58.png')
    no-repeat calc(100% - 12px) 100%;
}
.user-task-stats-chart {
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  height: calc(25vh - 30px);
  min-height: 166px;
}
.box {
  padding: 20px;
  border-radius: 20px;
  .peo-header {
    display: flex;
    align-items: center;
    .title {
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-flex: 1;
      flex: 1;
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333;
    }
    .el-date-editor {
      width: 230px;
      margin-right: 21px;
    }
    .el-input__inner {
      height: 32px;
      display: inline-flex;
      -webkit-box-align: center;
      align-items: center;
      padding: 3px 10px;
      .el-range-input {
        font-size: 12px;
        line-height: 1;
      }
    }
    .week-month-year {
      display: flex;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      width: 129px;
      height: 34px;
      background: rgba(233, 243, 255, 0.37);
      border-radius: 10px;
      .item {
        width: 37px;
        height: 25px;
        font-size: 14px;
        color: #9ca3b4;
        cursor: pointer;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
      }
    }
    .el-select {
      display: inline-block;
      position: relative;
      width: 88px;
      .el-input--small {
        font-size: 13px;
        width: 88px;
      }
    }
  }
  .peo-body {
    display: flex;
    -webkit-box-flex: 1;
    flex: 1;
    align-items: center;
    .stats {
      flex: 3;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      .item {
        display: inline-flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        .text-shadow1 {
          text-shadow: 2px 4px 7px rgb(85 132 255 / 50%);
        }
        .text-shadow2 {
          text-shadow: 2px 4px 7px rgb(255 99 85 / 50%);
        }
        .color1 {
          color: #072074;
        }
        .color2 {
          color: #91a7dc;
        }
        .color3 {
          color: #ff5757;
        }
        .color4 {
          color: #de9690;
        }
        .text {
          height: 17px;
          margin-top: 3px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          line-height: 17px;
        }
        .num {
          height: 50px;
          font-size: 36px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          line-height: 50px;
        }
      }
    }
  }
}
.user-task-status {
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  height: calc(75vh - 90px);
  min-height: 542px;
  margin-top: 20px;
  background: #fff;
  .peo-charts {
    display: flex;
    flex: 1;
    .chart {
      position: relative;
      width: 100%;
      height: 100%;
      .show {
        visibility: visible;
      }
      .empty {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        .tips {
          margin-top: 25px;
          color: #20232a;
          font-size: 14px;
        }
      }
    }
  }
}
.user-task-rank {
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  height: calc(75vh - 90px);
  min-height: 542px;
  margin-top: 20px;
  background: #fff;
  .empty {
    -ms-flex: 1;
    flex: 1;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    .tips {
      margin-top: 25px;
      color: #20232a;
      font-size: 14px;
    }
  }
  .role-group {
    width: 177px;
    margin: 15px auto 0;
    .role-list {
      display: flex;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      height: 34px;
      background: rgba(233, 243, 255, 0.37);
      border-radius: 10px;
      .item {
        width: 78px;
        height: 25px;
        font-size: 14px;
        color: #9ca3b4;
        cursor: pointer;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
      }
    }
  }
}
.is-checked {
  background: #fff;
  box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
  border-radius: 7px;
  font-weight: 600;
  color: #333 !important;
}
</style>
