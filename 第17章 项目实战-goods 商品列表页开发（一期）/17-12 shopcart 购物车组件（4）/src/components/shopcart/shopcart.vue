<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo">
                        <i class="icon-shopping_cart"></i>
                    </div>
                </div>
                <div class="price">￥{{totalPrice}} / {{totalCount}}个</div>
                <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right">
                <div class="pay">
                    ￥{{minPrice}}起送
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
      props: { // 通过props接收父组件（goods.vue）传过来的数组
          selectFoods: { // selectFoods和数据里goods里的foods数组对应
              type: Array,
              default() { // 在vue里props下，如果是数组Array，需要用default
                  return [ // 返回一个数组，利用从父组件（goods）传过来的数据，
                      { // 数组selectFoods里每个元素[ , ]是对象{},即selectFoods=[{}, {}, {}],每个元素{}有很多属性name、price、oldPrice、description等
                          price: 10, // price默认值为10，实质值为foods[i].price
                          count: 1 // 新增加的自定义属性count,data.json里没有的，用户点击加号+，计算出来的，购买商品个数(在父组件goods.vue里计算好后传进来的)
                      },
                      {
                          price: 20,
                          count: 2
                      }
                  ];
              }
          },
          deliveryPrice: {
              type: Number,
              default: 0
          },
          minPrice: {
              type: Number,
              default: 0
          }
      },
      computed: {
        totalPrice() { // 所有购买商品的总价，totalPrice依赖selectFoods
          let total = 0;
          this.selectFoods.forEach((food) => { // forEach遍历数组selectFoods，food为数组里每个元素(是对象{})
            total += (food.price * food.count); // 单价*数量, 累加
          });
          return total;
        },
        totalCount() {
            let count = 0;
            this.selectFoods.forEach((food) => {
                count += food.count;
            });
            return count;
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
              .pay
                height 48px
                line-height 48px
                text-align center
                font-size 12px
                font-weight 700
                background-color #2b333b




</style>