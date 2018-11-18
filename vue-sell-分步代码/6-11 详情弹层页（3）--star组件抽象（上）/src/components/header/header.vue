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
            <!-- @click添加点击事件，showDetail为函数名/方法名 -->
            <div v-if="seller.supports" class="support-count" @click="showDetail">
                <!-- 多少个（5个） -->
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail">
            <!-- 将span中间空格删掉 -->
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
        <div v-show="detailShow" class="detail">
            <div class="detail-wrapper clearfix">
                <div class="detail-main">
                    <h1 class="name">{{seller.name}}</h1>
                </div>
            </div>
            <div class="detail-close">
                <i class="icon-close"></i>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default{
      props: { // 通过props接收传过来的seller对象，从App.vue里
          seller: {
              type: Object
          }
      },
      data() { // 操作数据
          return {
              detailShow: false // 初始化为false，v-show隐藏
          };
      },
      methods: { // 方法放到 methods里
          showDetail() { // 方法名
              this.detailShow = true; // DOM跟着数据改变而改变
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
      position relative
      overflow hidden // 滤镜效果透下来一些
      color : #fff
      background : rgba(7,17,27,0.5)
      .content-wrapper
          position relative
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
          .support-count
            position absolute
            right 12px
            bottom 14px
            padding 0 8px
            height 24px
            line-height 24px
            border-radius 14px
            background rgba(0,0,0,0.2);
            text-align center
            .count
                vertical-align top
                font-size 10px
            .icon-keyboard_arrow_right
                margin-left 2px
                line-height 24px // 设置了公共 light-height 为 1
                font-size 10px // 因为父元素设置了font-size 0
      .bulletin-wrapper
        position relative
        height 28px
        line-height 28px
        padding 0 22px 0 12px
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        background-color rgba(7,17,27,0.2)
        // font-size 0
        .bulletin-title
          display inline-block
          vertical-align top
          margin-top 8px  // (28-12)/2
          width 22px
          height 12px
          bg-image ('bulletin')
          background-size 22px 12px
          background-repeat no-repeat
        .bulletin-text
            vertical-align top
            margin 0 4px
            font-size 10px
        .icon-keyboard_arrow_right
           position absolute
           font-size 10px
           right 12px
           top 9px
      .background
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        z-index -1
        filter blur(10px) // 滤镜效果，模糊
      .detail
        position fixed
        z-index 100
        top 0
        left 0
        width 100%
        height 100%
        overflow auto
        background rgba(7, 17 ,27, 0.8)
        .detail-wrapper
            width 100%
            min-height 100%
            .detail-main
                margin-top 64px
                padding-bottom 64px
                .name
                  line-height 16px
                  text-align center
                  font-size 16px
                  font-weight 700
        .detail-close
            position relative
            width 32px
            height 32px
            margin -64px auto 0 auto
            clear both
            font-size 32px


</style>

