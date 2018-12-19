<template>
  <div class="cartcontrol">
      <!-- food.count大于0才显示，添加点击事件@click -->
      <!-- 平移动画：inner/move(transition/transform/translate3d()/rotate()) -->
      <div class="cart-decrease" v-show="food.count>0" @click="descreaseCart" transition="move">
          <span class="inner icon-remove_circle_outline"></span>
      </div>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click="addCart">
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'; // 将全局vue引进来
  export default {
      props: {
          food: { // 从父组件（good.vue）传进来的数据
              type: Object
          }
      },
      // created() {
      //   console.log(this.food);
      // },
      methods: {
        addCart(event) { // 增加+函数
          if (!event._constructed) { // 不是自己派发的，直接return
            return;
          }
          // console.log('click'); // 测试
          if (!this.food.count) { // 如果food.count为undefined
            // this.food.count = 1; // 初始化count，在vue里新增属性，需要用到set()接口
            Vue.set(this.food, 'count', 1); // 给this.food添加count属性，同时赋值为1；
          } else {
            this.food.count++; // count存在，则点击一次加1
          }
          // 点击加号时派发事件
          this.$dispath('cart.add', event.target); // 派发cart.add事件，在goods组件写一个事件events
        },
        descreaseCart(event) { // 减少count函数
          if (!event._constructed) { // 不是自己派发的，直接return
            return;
          }
          if (this.food.count) { // 大于0，
            this.food.count--; // 减1
          }
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
      // line-height 24px
      // font-size 24px
      // color rgb(0, 160, 220)
      transition all 0.5s linear // 线性缓动
      &.move-transition
        opacity 1
        transform translate3d(0, 0, 0) // 动画平移属性(x, y, z轴)，最终在当前位置
        .inner // inner 要在move-transition下
          display inline-block // 有宽高动画才能做起来
          line-height 24px
          font-size 24px
          color rgb(0, 160, 220)
          transition all 0.5s linear
          transform rotate(0)
      &.move-enter, &.move-leave
        opacity 0
        transform translate3d(24px, 0, 0) // 最初位置设在距离x轴右边的24px处
        .inner
          transform rotate(180deg) // 内层滚动180度
    .cart-count
      display inline-block
      vertical-align top
      padding-top 6px
      width 12px
      line-height 24px
      text-align center
      font-size 10px
      color rgb(147, 153, 159)
    .cart-add
      display inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color rgb(0, 160, 240)
</style>