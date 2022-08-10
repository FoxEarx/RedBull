<template>
  <div>
    <el-dialog
      title="货道设置"
      :visible="dialogVisibleHD"
      width="50%"
      :before-close="handleClose"
      @close="closeAdd"
    >
      <div>
        <!-- 头部 -->
        <div class="Header">
          <div>
            货道行数：{{
              $store.state.equipment.AllEquipment.currentPageRecords[
                this.ListId
              ].type.vmRow
            }}
          </div>
          <div>
            货道列数：{{
              $store.state.equipment.AllEquipment.currentPageRecords[
                this.ListId
              ].type.vmCol
            }}
          </div>
          <div>
            货道容量（个）：{{
              $store.state.equipment.AllEquipment.currentPageRecords[
                this.ListId
              ].type.channelMaxCapacity
            }}
          </div>
          <el-button size="medium" type="primary" @click="smart"
            >智能排货</el-button
          >
        </div>
        <!-- main -->
        <div class="block el-scrollbar">
          <!-- <el-carousel height="150px" :autoplay="false"> -->
          <el-row v-for="(item, index) in List" :key="index">
            <el-col v-for="item in List[index]" :key="item.channelId">
              <el-card :body-style="{ padding: '0px' }" class="card">
                <span class="number">{{ item.channelCode }}</span>
                <img
                  :src="
                    (item.sku && item.sku.skuImage) ||
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABOCAYAAAC+JjE8AAAIFElEQVR4Xu2da2xbZxnH/897HGdLl7W0s52A0qZpfEvoysY6cdHWFjFpjCEQ0jZVDATitiE0IRiMgsRl2piqdh+GhAZsH0CgdWsHG6i0mraxpBtlKmGlK4ntHF+KCnF83LUU2Jo457wPOm4Dqa/H9nHs2j4ffZ7rz++5vs/7HIKFLRxO95IDH5aQ24jxLgDrGbwSIKcF9UtQhDMEOgsgwYS/CIiXWMfvAgHXv8slQ6UEpqbS/cLJ9zH482D0lDPW0vsJbxHoMZmhnSMjrmSxXAsC3cusbIxq3wHwdQCXtzSoypM7B2DX8WH3/bcTGbnqeUDj8ZQnI2kPM2+r3Ff7aBDRS07B24eGPKmlWV8ENHuId8k/MLC+fdBUnykBCbkg3r/0FPA/oOaFhxUeB/iaMi5OAzgCcBKM/1QfThNrEq4AqB/A9QBWl46UjpJBWxYvWP8HGtWeYubbiyqTeIFgPPT6Bs94oXNHE+OpOjTzWnJ1LLWFoewAyw8WvRAR7Q0Mu+8w92eBRqLahyTzgSIKbwrgbr/X84uqI2sBxXD81J1sGD8GsKJQOoLoFv+w+2AWaDiq/YmZr8u7YhHmmOXNQW//eAswqTmFqbh2Ixn8HIDL8owRTQSH3ZspEklulkIcKeSNgC8FvJ5Ha46khQyEp1N3MaEgExJiM4Wj2gPM/O38+yk65h92XUtEsoV41JwKM4twVHsNwKb8I5oepJCqjQG8JW8n01cCPvcjNUfQggbC07P3MFEBNjROoaiWBHNfbt4ScnTU2z9VKY9Y7PTaOV1fpyiiSziQ9K5bE2m1UR5JnApI3QgVOI/OUkhNzQPIe8khV1LvqNtt6T5TVd+4UofxZYA/A2A4x9EpIvwKDt4ZGOxLVPoHNaP8sWOzK5w9VIhNxgTKhYIOej0lX5ws6kTi2g1S5ydBeHuZ5OcZ9LURr/tHzQip0pjCUU0ycx6jmoCG1PQWQJq3Ed3WA6JvBb3uh6zLN6ek7UATiTOr5vXMNAOuClM2/9itIz73oQr1mkrcdqAhVfsBwDuqzPLVoNfz3ip1m0KtDkBTJwCsqyY7ImLR5Rz2rVsVr0a/GXRsBaqqSZcOodWSmIS8Y9Tbv7cWG43UtRVoOJ72syHDtSREjLsDPo/5suGS3GwFejRxZtVleuZMLSSY8PGRYc8ztdhopK6tQM1EQmrqOIB3VpMUEYwFgXdszJk+qMZWo3RsBxqJpb8qpXy4uoRof9Dr/kh1us2hZTtQVVW7dVz5OgBfhSnOKV3Ktb7Bq/KfhSs01Ehx24FmD/tY2kdSvmL15t481CFoe2DIva+RMOzwXRegWaiJ5CB0sQfAe0oFSqAZkvJTfn/fi3Yk1GgbdQNqJmY+S07HtI8y8GkwfYDBved/hy4EXgVo34ru+ccGBgbMIoGW2OoKNJfQyZNnV/9Ln3dODrrSrTpDuqxAW2IIlkmiA/QCoElVu0YBPgfiq81ZdMl8gkgcEt10wD9w1T+sDoa2BzoxM9NzxVvKw8z44mI9Qg48JqJxgnjEt2HNb8tN27Q10NfUpKsHYj+fL60puxEoBMgdAW/fb4oJty3QycmTq0W3cwyMjWVJ5giYFXZMdFdwg2s6V7ctgR4+fPLyt7mcvy93j1waNM+REN/zD7l2LT0NtCXQsKo9xShRAFfRkKVxB5Q7vd41fzfV2g5oJKZ9U0q2dTKQgLRkfGLE53m+rYBOx9+4yTD0gwCUigahNWFDQHyDiXfbPo1szf/ySoVCyUEoNAGiNcvr+by3mublGxFwKZ8TEzM9K1Y5XgGXrcKuW+gtBTQUTT0Bxva60bJguGagqsrdC9A+S8AnAYxeqPA1CDjDQIKIjoPwR6nQwZHB4ut7LMRaUmQ6mr7XYLmrVju16tcENBxNbmMWjwMYshCIWWd6hEh5Bjr/MhBwzVjQsSQSiZ76mGTj6TpdhCzFsChUFVCzmH9TLH0/A/cxc8VX0ux7UsJ+EP3Ev8H1nFn4UFHUS4RVNb3VgDzATbJArWKg4XS6F2f5SWa+pVoIF+kRRQTzD+d6+eeb+vrerMTmdDx1k27gWULzLJusCKi5MIy6stV2FT8XlwPFwD8F6Gcs6NFCz84FnqXvYcZugLvK2V7O/ZaBZu/vHMrzAOcW1Nodr3n4vwyip0W3+HXuO8pIRLtBCjwA8I12O7bDniWg4fDselZoDMBaO5xatWGeW1ny3xiICWGuqSIvMw9Y1W+EXFmgf42dXqsYC+MgDDYiwEvNZ0mg0eisewHiZTBXWsxwqXGwLd6iQB1wrNRhmEtuyi2mtS2YVjBUFCgIL4BRdMFoKyRfjxyKA62Htzaw2QFq85/cAdoBajMBm811RmgHqM0EbDbXGaEdoDYTsNlcZ4R2gNpMwGZznRHaAWozAZvNFW2RYbOfdjGXKdrEpV0I2JonkdnEpXCbIVsdtY0xGi/aCKttGNiYKBE9WLJVm42+2sKUkPL6bJuckJqaAPDutsi6fkn+Oej1XGel3WX9Qmghyxe1u7wwSs3+H7e1UI7Lmcq+oNeTbWZ7UctgKPIQI9unvrNZJUB0lPQCLYNN/WztkkMe7hQ1WKTJOMG6eF/BptaLJiYntT7hxB6At1o026ZiNCYz2D466p5dCqBgw0Cz5jOiat9lwr2dDwPkjZdzxNjt97q/T1Y+DLBUfepEul/obBbVfqEDFueI6KfSQTtLlbZbammZ7XEvjFshaGv24yqE9cxYWajvaIsc/xkinAWf/7gKJI+RVPZb+bjKfwGFjihtQmXGoAAAAABJRU5ErkJggg=='
                  "
                  class="image"
                />
                <div style="padding: 14px">
                  <span>{{
                    (item.sku && item.sku.skuName) || '暂无商品'
                  }}</span>
                  <div class="bottom clearfix">
                    <!-- <time class="time">{{ currentDate }}</time> -->
                    <el-button
                      type="text"
                      class="button"
                      style="color: red"
                      @click="item.sku = ''"
                      :disabled="item.sku === null"
                      >删除</el-button
                    >
                    <el-button
                      type="text"
                      class="button"
                      @click="add(item.channelCode, index)"
                      >添加</el-button
                    >
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <!-- </el-carousel> -->
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisibleHD = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="智能排货"
      :visible.sync="dialogVisibleZNPH"
      width="52%"
      :before-close="handleClose"
    >
      <span
        >该区域属于{{
          $store.state.equipment.AllEquipment.currentPageRecords[ListId].node
            .businessType.name
        }}商圈适合销售一下商品：</span
      >
      <el-row class="row">
        <el-col :span="4.8" v-for="item in Top10" :key="item.skuId" class="clo"
          ><el-card :body-style="{ padding: '0px' }" class="card1">
            <img class="image" :src="item.image" />
            <div :style="{ padding: '14px', textAlign: 'center' }">
              <span>{{ item.skuName }}</span>
            </div>
          </el-card></el-col
        >
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisibleZNPH = false"
          >采纳建议</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="选择商品"
      :visible="dialogVisibleAdd"
      width="52%"
      :before-close="handleClose"
      @close="closechange"
    >
      <el-form ref="form" label-width="100px">
        <el-form-item label="商品查询：">
          <el-input
            @input="Search"
            :style="{ display: 'inline-block', width: '50%' }"
            v-model="value"
          ></el-input>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <el-row class="row">
        <el-col
          :span="4.8"
          v-for="(item, index) in addList"
          :key="index"
          class="clo"
          ><el-card
            :body-style="{ padding: '0px' }"
            class="card1"
            @click.native="addSku(item, index)"
          >
            <span
              :class="{
                trueChange: index123 === index,
                'el-icon-check': index123 == index,
              }"
            ></span>
            <img class="image" :src="item.skuImage" />
            <div :style="{ padding: '14px', textAlign: 'center' }">
              <span>{{ item.skuName }}</span>
            </div>
          </el-card></el-col
        >
      </el-row>
      <el-button type="primary" @click="ago" :disabled="index === 1"
        >上一页</el-button
      ><el-button type="primary" @click="next" :disabled="addList.length < 10"
        >下一页</el-button
      >
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="replace"
          :disabled="sku.skuName === ''"
          >确认</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { businessTop10, SearchSku } from '@/api'
export default {
  data() {
    return {
      value: '',
      dialogVisibleAdd: false,
      dialogVisibleZNPH: false,
      Top10: [],
      index: 1,
      addList: [],
      sku: {
        skuImage: '',
        skuName: '',
      },
      index123: '',
      id: '',
      List: this.AisleDetails,
      channelCode: '',
    }
  },

  created() {},

  methods: {
    replace() {
      this.List = this.AisleDetails
      this.dialogVisibleAdd = false
      this.List[this.channelCode].forEach((item) => {
        if (item.channelCode === this.id) {
          item.sku = this.sku
        }
        this.List[this.channelCode].push(item)
      })
    },
    addSku(item, index) {
      this.sku.skuImage = item.skuImage
      this.sku.skuName = item.skuName
      this.index123 = index
    },
    async Search() {
      const res = await SearchSku(this.index, 10, this.value)
      this.addList = res.data.currentPageRecords
    },
    async ago() {
      this.index--
      const res = await SearchSku(this.index, 10)
      this.addList = res.data.currentPageRecords
    },
    async onSubmit() {
      const res = await SearchSku(this.index, 10, this.value)
      this.addList = res.data.currentPageRecords
    },
    async next() {
      this.index++
      const res = await SearchSku(this.index, 10)
      this.addList = res.data.currentPageRecords
    },
    async add(id, index) {
      this.dialogVisibleAdd = true
      const res = await SearchSku()
      this.id = id
      this.channelCode = index
      console.log(index)
      this.addList = res.data.currentPageRecords
      console.log(res)
    },
    async smart() {
      this.dialogVisibleZNPH = true
      const res = await businessTop10(
        this.$store.state.equipment.AllEquipment.currentPageRecords[this.ListId]
          .businessId,
      )
      this.Top10 = res.data
      console.log(res)
    },
    handleClose(done) {
      done()
    },
    closechange() {
      this.dialogVisibleAdd = false
      this.index123 = ''
    },
    closeAdd() {
      this.$emit('closeAdd')
    },
  },
  props: {
    dialogVisibleHD: {
      type: Boolean,
      default: false,
    },
    ListId: {
      type: [Number, String],
    },
    AisleDetails: {
      type: Object,
      // default: [],
    },
  },
}
</script>

<style scoped lang="less">
.trueChange {
  position: absolute;
  display: inline-block;
  color: #000;
  text-align: center;
  line-height: 50px;
  font-size: 30px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: yellow;
}
.el-row {
  display: flex;
}
.row {
  display: flex;
  flex-wrap: wrap;
}

.card1 {
  margin: 10px;
}
.Header {
  padding: 0 30px;
  display: flex;
  background-color: #f3f6fb;
  height: 56px;
  line-height: 56px;
  margin-bottom: 10px;
  div {
    flex: 1;
  }
}
.el-card__body {
  height: 207px;
}
.el-col-24 {
  margin: 10px;
}
.block {
  overflow-y: scroll;
  overflow-x: scroll;
  height: 550px;
}

.card {
  position: relative;
  text-align: center;
  .number {
    position: absolute;
    top: 10px;
    left: -10px;
    display: inline-block;
    width: 60px;
    height: 24px;
    background-color: #829bed;
    border-radius: 12px;
    line-height: 24px;
    text-align: center;
  }
}

.el-card {
  width: 166px;
  // height: 180px;
  // margin: 0 8px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 164px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
