// 页面入口是main.js
// 入口文件依赖两个文件一个 vue、./App
import Vue from 'vue';
import VueRouter from 'vue-router'; // 引入vue-router
import App from './App'; // 写App.vue一样,简便写法
import goods from './components/goods/goods'; // 会自动添加后缀名.vue/(goods.vue),引入goods组件
import ratings from './components/ratings/ratings';
import seller from 'components/seller/seller'; // 在base下定义路径别名，在这里可以直接使用components

import 'common/stylus/index.styl';

Vue.use(VueRouter); // 安装插件，通过use()

let app = Vue.extend(App); // 将App挂载到这来

let router = new VueRouter({
  // 传一些配置options
  linkActiveClass: 'active' // 默认添加 v-link-active，我们配置为 active

}); // 实例化路由

router.map({ // 路由配置，router有一个方法map()
  '/goods': {
    component: goods// 路由到的组件，需要先创建组件
  },
  '/ratings': {
    component: ratings
  },
  '/seller': {
    component: seller
  }
});

// 启动router，使用挂载点
router.start(app, '#app'); // 这来的'#app'为App.vue里的   <div id="app">

// 需求进入页面，默认路由到商品页面
router.go('/goods');
