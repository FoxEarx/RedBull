<template>
  <div class="block">
    <el-pagination
      :page-size="10"
      :total="+$store.state.equipment.AllEquipment.totalCount"
      @next-click="$emit('nextClick')"
      @prev-click="$emit('prevClick')"
      @current-change="changeCount"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    changeCount(index) {
      this.$emit('changeCount', index)
    },
  },
}
</script>

<style scoped lang="less"></style>
