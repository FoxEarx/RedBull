<template>
  <div class="MainData">
    <template>
      <el-table
        :data="tableData"
        style="width: 100%"
        @row-click="click"
        @selection-change="selectionChange"
      >
        <el-table-column type="selection" v-if="checkShow"> </el-table-column>
        <el-table-column
          prop="index"
          label="序号"
          width="100px"
        ></el-table-column>
        <el-table-column
          v-for="(item, index) in table"
          :key="index"
          :label="item.label"
          :width="width"
        >
          <template slot-scope="{ row }">
            <div v-if="item.prop === 'image'">
              <img :src="row[item.prop]" class="img" />
            </div>
            <template v-else>
              {{ row[item.prop] }}
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <slot name="operation"></slot>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    click(row) {
      this.$emit('clickList', row)
    },
    selectionChange(val) {
      this.$emit('selectionChange', val)
      console.log(val)
    },
  },
  props: {
    //行数
    tableData: {
      type: Array,
    },
    //列数
    table: {
      type: Array,
    },
    //主体区域盒子宽度
    width: {
      type: String,
      default: '200px',
    },
    checkShow: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped lang="less">
.MainData {
  width: 100%;
}
.img {
  width: 35px;
  height: 35px;
}
</style>
