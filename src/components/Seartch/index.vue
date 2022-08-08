<template>
  <div>
    <el-card class="box-card" shadow="never" :body-style="{ display: 'flex' }">
      <div class="input">
        <span>{{ title + ':' }}</span>
        <el-input v-model="input" placeholder="请输入"></el-input>
      </div>
      <slot />
      <Button icon="el-icon-search" text="查询"></Button>
    </el-card>
  </div>
</template>

<script>
import Button from '@/components/Button'
export default {
  data() {
    return {
      input: '',
    }
  },

  props: {
    title: {
      type: String,
      required: true,
    },
  },

  created() {},

  methods: {},

  components: {
    Button,
  },
}
</script>

<style scoped>
.el-card {
  border: unset;
  margin-bottom: 20px;
}

.input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 10px;
  width: 285px;
}
.input span {
  font-size: 14px;
  padding-right: 12px;
  white-space: nowrap;
}
.input .el-input {
  width: 203px;
}
</style>
