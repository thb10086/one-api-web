<template>
  <div class="dashboard-container">
    <div class="dashboard-text">用户名称: {{ userData.username }}</div>
     <div class="dashboard-text">已经使用额度: {{ userData.quotaUsed }}</div>
    <div class="dashboard-text">总额度: {{ userData.quotaLimit }}</div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'userData'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
