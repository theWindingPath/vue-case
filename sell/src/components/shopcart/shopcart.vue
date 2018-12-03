<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo">
                        <i class="icon-shopping_cart"></i>
                    </div>
                </div>
                <div class="price">￥0</div>
                <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right"></div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
      props: { // 通过props接收父组件（goods.vue）传过来的数组
          deliveryPrice: {
              type: Number,
              default: 0
          },
          minPrice: {
              type: Number,
              default: 0
          }
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
      position fixed
      left 0
      bottom 0
      z-index 50
      width 100%
      height 48px
      // background-color #000
      .content
          display flex
          background-color #141d27
          font-size 0 // display inline-block会有间隙，
          color rgba(255, 255, 255, 0.4)
          .content-left
              flex 1
              .logo-wrapper
                  display inline-block
                  vertical-align top
                  position relative
                  top -10px // 向上移10px(超出一些)，116-48*2=20,20/2=10px
                  margin 0 12px // 36-12=24,24/2=12px
                  padding 6px
                  width 56px // 44+6+6=56，IE盒模型，width包括padding（border-box）
                  height 56px
                  box-sizing border-box // IE盒模型
                  border-radius 50% // 变成正圆
                  background #141d27
                  .logo
                    width 100%
                    height 100%
                    text-align center
                    border-radius 50%
                    background #2b343c
                    .icon-shopping_cart
                        line-height 44px
                        font-size 24px
                        color #80858a
              .price
                  display inline-block
                  vertical-align top
                  margin-top 12px // 44-20=24,24/2=12px
                  padding-right 12px
                  line-height 24px
                  box-sizing border-box
                  border-right 1px solid rgba(255, 255, 255, 0.1)
                  font-size 16px
                  font-weight 700
              .desc
                  display inline-block
                  vertical-align top
                  margin 12px 0 0 12px
                  line-height 24px
                  font-size 10px
          .content-right
              flex 0 0 105px
              width 105px



</style>