<template>
    <div class="goods">
      <!-- 两栏布局 -->
      <div class="menu-wrapper"></div>
      <div class="foods-wrapper"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  const ERR_OK = 0;

  export default { // 需要导出
    props: { // 接收传进来的数据（seller或goods,商家、商品数据）
      seller: {
        type: Object
      }
    },
    data() { // 添加data() 绑定goods，为goods添加get、set方法，操作DOM时用到
      return {
        goods: [] // 一开始为空
      };
    },
    created() { // 在created钩子函数里获取数据
      this.$http.get('/api/goods').then((response) => { // vue-resource里的$http下的get方法里的then()方法里获取数据
        response = response.body; // 返回一个数组
        if (response.errno === ERR_OK) { // 判断获取成功
          this.goods = response.data; // 把数据保存到goods里
          console.log(this.goods);
        }
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .goods
    display flex // flex布局，左侧固定80px,右侧自适应布局
    position absolute
    top 174px // header 134px 加 tab 40px来的
    bottom 46px // 底部footer高度46px
    width 100%
    overflow hidden //超出隐藏，内容超出手机高度
    .menu-wrapper // 左侧固定80px
      flex: 0 0 80px // flex三个属性：第一个：等分，第二个：内容不足缩放情况，第三个：占位，这里占80px，
      width 80px // Android浏览器兼容性问题，需要设置width
      background #f3f5f7
    .foods-wrapper
      flex 1 // 右侧自适应布局
</style>
