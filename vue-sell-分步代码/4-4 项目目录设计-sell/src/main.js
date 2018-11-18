// 页面入口是main.js
// 入口文件依赖两个文件一个 vue、./App
import Vue from 'vue'
import App from './App' // 写App.vue一样,简便写法

/* eslint-disable no-new */
new Vue({ // 通过new实例化一个Vue实例
  el: 'body', // el（element）是一个挂载点,挂载到body上
  // vue依赖App
  components: { App } // App是es6语法简写, components注册一个插件
  // components: { App：App }// 简写
})
