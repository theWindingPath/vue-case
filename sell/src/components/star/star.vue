<template>
  <!-- starType可以是一个函数，动态返回一个类名，放到:class里 -->
  <div class="star" :class="starType">
      <!-- v-for遍历数组itemClasses，得到itemClass，动态放到:class里，一个span标签放一个:class，这里一共5个span -->
      <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
    
</template>

<script type="text/ecmascript-6">
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
        }
      }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .star
    font-size 0
    .star-item // star共用样式，每个span都有
      display inline-block
      background-repeat no-repeat
    &.star-48
    &.star-36
    &.star-24


</style>