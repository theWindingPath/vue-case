<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <!-- v-if 判断它supports(数组)有没有，有可能是没有的 -->
                <div v-if="seller.supports" class="support">
                    <!-- 动态绑定class -->
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <!-- supports[0].description 取数组第一个对象的 description属性对应的值-->
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
        </div>
        <div class="bulletin-wrapper"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default{
      props: { // 通过props接收传过来的seller对象，从App.vue里
          seller: {
              type: Object
          }
      },
      created() {
          this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin";  // 这里不可以像引入js文件那样，使用别名common，

  .header
      color : #fff
      background : #111
      .content-wrapper
          padding : 24px 12px 18px 24px
          font-size : 0 // 消除avatar 和content之间的空白字符
          .avatar
              display : inline-block
              vertical-align top
              img 
                border-radius 2px
          .content
              display : inline-block
              margin-left : 16px
              // font-size : 14px
              .title
                margin 2px 0 8px 0
                .brand
                  display inline-block
                  vertical-align top // 设置对齐方式（和下面name），顶部对齐
                  width 30px
                  height 18px
                  bg-image('brand') // 添加图片，调用bg-image函数，传入brand去拼接，(mixin.styl里的)
                  background-size 30px 18px
                  background-repeat no-repeat
                .name
                    margin-left 6px
                    font-size 16px
                    line-height 18px
                    font-weight bold
              .description
                  margin-bottom 10px
                  line-height 12px
                  font-size 12px
              .support
                  .icon
                    display inline-block
                    vertical-align top 
                    width 12px
                    height 12px
                    margin-right 4px
                    background-size 12px 12px
                    background-repeat no-repeat
                    &.decrease
                        bg-image('decrease_1')
                    &.discount
                        bg-image('discount_1')
                    &.guarantee
                        bg-image('guarantee_1')
                    &.invoice
                        bg-image('invoice_1')
                    &.special
                        bg-image('special_1')
                  .text
                      line-height 12px
                      font-size 10px
                      


</style>

