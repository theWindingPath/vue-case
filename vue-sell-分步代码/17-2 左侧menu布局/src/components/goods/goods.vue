<template>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <!-- v-for遍历，goods是数组，有多少个元素，则添加多少个li标签，和goods.length(数组长度)对应 -->
          <li v-for="item in goods" class="menu-item">
            <span class="text border-1px">
              <!-- item.name前面有图标（type大于0才有）,小于0图标不显示 -->
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
            </span>
          </li>
        </ul>
      </div>
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
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

      this.$http.get('/api/goods').then((response) => { // vue-resource里的$http下的get方法里的then()方法里获取数据
        response = response.body; // 返回一个数组
        if (response.errno === ERR_OK) { // 判断获取成功
          this.goods = response.data; // 把数据保存到goods里
          // console.log(this.goods);
        }
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin";

  .goods
    display flex // flex布局，左侧固定80px,右侧自适应布局
    position absolute
    top 174px // header 134px 加 tab 40px来的
    bottom 46px // 底部footer高度46px
    width 100%
    overflow hidden //超出隐藏
    .menu-wrapper // 左侧固定80px
      flex: 0 0 80px // flex三个属性：第一个：等分，第二个：内容不足缩放情况，第三个：占位，这里占80px，
      width 80px // Android浏览器兼容性问题，需要设置width
      background #f3f5f7
      .menu-item // 能有class则用class，避免用标签，class性能好，标签（p/li等标签）效率低
        display table // table做垂直居中效果最好，无论一行还是两行都能做到垂直居中
        width 56px // 160-2*24=112,112/2=56
        height 54px
        padding 0 12px
        line-height 14px
        .icon
          display inline-block
          vertical-align top 
          width 12px
          height 12px
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
              bg-image('decrease_3')
          &.discount
              bg-image('discount_3')
          &.guarantee
              bg-image('guarantee_3')
          &.invoice
              bg-image('invoice_3')
          &.special
              bg-image('special_3')
        .text
          display table-cell
          width 56px
          vertical-align middle // table里垂直居中布局
          font-size 12px
          border-1px(rgba(7,17,27,0.1)) // 移动端一像素下边框

    .foods-wrapper
      flex 1 // 右侧自适应布局
</style>
