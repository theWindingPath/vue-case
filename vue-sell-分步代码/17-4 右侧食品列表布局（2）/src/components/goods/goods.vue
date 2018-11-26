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
      <div class="foods-wrapper">
        <ul>
          <!-- 和上面menu-wrapper里的li一样，先取得goods下的name -->
          <li v-for="item in goods" class="food-list">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <!-- 每个分类下都有商品，这个li遍历goods里的foods -->
              <li v-for="food in item.foods" class="food-item border-1px">
                <!-- food里的li左右两侧布局，左边是图片 -->
                <div class="icon">
                  <img width="57px" height="57px" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span>月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span>￥{{food.price}}</span>
                    <!-- 通过v-show判断，如果为空""不显示" -->
                    <span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
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
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147,153,159)
        background #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
          margin-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7, 17, 27)
</style>
