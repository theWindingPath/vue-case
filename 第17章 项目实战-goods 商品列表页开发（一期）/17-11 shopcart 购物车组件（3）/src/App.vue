<template> 
<!-- 每个组件依赖三个部分：template（模板）、script（行为/逻辑）、style（样式） -->
  <div>
    <!-- :seller相当于 v-bind-seller，将seller传到header组件里 -->
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <a v-link="{path:'/goods'}">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/ratings'}">评价</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/seller'}">商家</a>
      </div>
    </div>
    <!-- 将seller传到子组件(goods.vue/ratings.vue/seller.vue) -->
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import header from './components/header/header.vue'; // 引入header

const ERR_OK = 0; // 定义一个常量，状态码

export default {
  data() {
    return {
      seller: {}
    };
  },
  created() {
    this.$http.get('/api/seller').then((response) => {
      // response = response.json();
      // console.log(response); // 返回一个promise对象，应该是json对象，查看官方文档
      response = response.body;
      if (response.errno === ERR_OK) {
        this.seller = response.data; // 真正数据在 data属性里，文件dev-server.js里配的
        // console.log(this.seller);
      }
    });
  },
  components: {
    'v-header': header
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  // 引入文件 @import
  @import "./common/stylus/mixin.styl" 
    .tab
      display :flex // css写法、规范：1、display、position等布局写到最前面
      width :100% // 2、width、height 等引起重绘的写在布局后面, 3、最后写字体、颜色等
      height :40px
      line-height :40px
      // border-bottom 1px solid rgba(7,17,27,0.2)
      border-1px(rgba(7,17,27,0.2)) // 调用函数
      .tab-item
        flex: 1
        text-align :center
        & > a // &为父类，这里为.tab-item
          display: block // 点击边上也会刷新
          font-size :14px  
          color :rgb(77,85,93) // 3、最后写字体、颜色等(可被继承写在最后)
          &.active // a.active 
            color :rgb(240,20,20)

</style>
