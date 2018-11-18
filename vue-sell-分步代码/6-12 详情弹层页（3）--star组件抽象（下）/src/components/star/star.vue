<template>
  <!-- starType可以是一个函数，动态返回一个类名，放到:class里 -->
  <div class="star" :class="starType">
      <!-- v-for遍历数组itemClasses(result=['on', 'on', 'half', 'off' ,'off'])，得到5个itemClass，动态放到:class里，一个span标签放一个:class，这里一共5个span -->
      <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
    
</template>

<script type="text/ecmascript-6">

  const LENGTH = 5; // 常量一共5颗星
  const CLS_ON = 'on'; // 定义常量，以后方便改,只改这个地方（一处）
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default {
      props: { // props接收传进来的参数，现在有两个，size和score，类型都为number（数字）
          size: { // size也会添加get，set方法，依赖跟踪的
              type: number 
          },
          score: {
              type: number
          }
      },
      computed: { // vue计算属性
        starType(){ // starType依赖size，计算出来
          return 'star-' + this.size; // 字符串拼接，结果是star-48/star-36/star-24中一个，
        },
        itemClasses() { // itemClasses函数，返回一个数组，数组里有5个item，on/off/half 3种状态中一个
          let result = []; // let定义一个变量， 为数组，返回数组result 
          // 获取score，向下取整，score可能为4.4(4.4*2=8.8, 8.8向下取整为8, 8/2=4, score取4) 或/ 4.6（4.6*2=9.2, 9.2向下取整为9, 9/2=4.5, score取4.5）等
          let score = Math.floor(this.score * 2) / 2; // 向下取0.5倍数的值（小算法）
          // hasDecimal是否有小数，有则为true，没有为false，有多少个半星（half状态）
          let hasDecimal = score % 1 !== 0; // 4.5%1=0.5, 0.5 !==0为true，则有小数, 4&1=0, 0!==0为false，则4没有小数
          // 取出整数部分，有多少个全星on状态
          let integer = Math.floor(score); // 4.5取出为4， 4.0取出为4

          // 往数组result里放东西push（on/half/off）
          // for放有多少个全星
          for (let i = 0; i < integer; i++) { // 变量integer，有多少个全星on状态
            result.push(CLS_ON); // 如果获得的integer为4，往result里 push 4次，数组result现在有4个on，result=['on', 'on', 'on', 'on']
          }
          // if判断是否有半星，hasDecimal为true则有一个，半星最多有一个，可以用if
          if(hasDecimal) { // hasDecimal为true执行
            result.push(CLS_HALF); // 添加半星，如：4.5有半星，hasDecimal为true，数组result现在有4个on，和一个half，result=['on', 'on', 'on', 'on' ,'half']
          }
          // 如果integer为2，result现在为['on', 'on']，数组result长度没有达到5，放off（无星/没有颜色星）
          while (result.length < LENGTH) { // 如果integer为2，result现在为['on', 'on']，result.length为2， 小于LENGTH（5），while一直push添加off，直到result.length为5
            result.push(CLS_OFF); // 如果integer为2，最终结果result=['on', 'on', 'off', 'off' ,'off']
          }
          return result; // 返回result，如果获取的this.score=2.6, 则hasDecimal为true，integer为2，结果result=['on', 'on', 'half', 'off' ,'off']
        }
      }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin"; // 引入mixin.styl文件，里面有bg-image函数

  .star
    font-size 0 // 消除span 之间的间隙
    .star-item // star共用样式，每个span都有
      display inline-block
      background-repeat no-repeat
    &.star-48 // starType函数计算后，返回 star-48、star-36、star-24中的一个（实现动态添加类，根据data.json里的数据score）
      .star-item
        width 20px
        height 20px
        margin-right 22px // 计算出来：总宽度- 5个×每个starwidth /4个间隔，总宽度为 22*4=88，20*5=100, 88+100=188(48图)
        background-size 20px 20px
        &.last-child // 最后一个星，没有margin-right，为0
          margin-right 0
        &.on // 动态添加，on状态， v-for遍历过程中，itemClass取on、off/half中一个，
          bg-image('star48_on') // 调用bg-image函数，动态添加图片(2×或 3×图)
        &.off // 
          bg-image('star48_off') // off没有颜色
        &.half
          bg-image('star48_half') // half 半星图
    &.star-36 // 图片用36的样式
      .star-item
        width 15px // 36图宽、高为 15, 36图(2×)的总宽度为200/2=100, 100-5*15=25, 25/4=6, 所有36图的margin-right为 6px
        height 15px
        margin-right 6px // 计算出来：总宽度- 5个×每个starwidth /4个间隔，（36图的margin-right为 188-5*15=110, 110/4=27.5（×）36图星总长和48不一样）
        background-size 15px 15px
        &.last-child // 最后一个星，没有margin-right，为0
          margin-right 0
        &.on // 3种不同状态
          bg-image('star36_on') // 图片用36的
        &.off
          bg-image('star36_off')
        &.half
          bg-image('star36_half')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &.last-child
          margin-right 0
        &.on
          bg-image('star24_on') // 图片用24的
        &.off
          bg-image('star24_off')
        &.half
          bg-image('star24_half')


</style>