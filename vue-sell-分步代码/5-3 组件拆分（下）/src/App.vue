<template> 
<!-- 每个组件依赖三个部分：template（模板）、script（行为/逻辑）、style（样式） -->
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">商品</div>
      <div class="tab-item">评价</div>
      <div class="tab-item">商家</div>
    </div>
    <div class="content">
      i am content
    </div>
  </div>
</template>

<script>
import header from './components/header/header.vue'; // 引入header

export default {
  components: {
    'v-header': header
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    .tab
      display :flex
      width :100%
      height :40px
      line-height :40px
      .tab-item
        flex: 1
        text-align :center

</style>
