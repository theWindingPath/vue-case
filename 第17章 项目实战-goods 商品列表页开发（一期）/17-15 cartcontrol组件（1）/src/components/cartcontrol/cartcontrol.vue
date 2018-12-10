<template>
  <div class="cartcontrol">
      <div class="cart-decrease">
          <span class="icon-remove_circle_outline"></span>
      </div>
      <div class="cart-count">1</div>
      <div class="cart-add icon-add_circle">
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
      props: {
          food: { // 从父组件（good.vue）传进来的数据
              type: Object
          }
      }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size 0 // 消除间隙
    .cart-decrease
      display inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color rgb(0, 160, 220)
    .cart-count
      display inline-block
      vertical-align top
      margin-top 6px
      width 12px
      line-height 24px
      font-size 14px
      color rgb(147, 153, 159)
    .cart-add
      display inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color rgb(0, 160, 240)
</style>