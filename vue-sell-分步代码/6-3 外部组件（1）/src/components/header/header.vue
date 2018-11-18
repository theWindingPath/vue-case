<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar">
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <!-- v-if 判断它supports(数组)有没有，有可能是没有的 -->
                <div v-if="seller.supports" class="support">
                    <span class="icon"></span>
                    <!-- supports[0].description 取数组第一个对象的 description属性对应的值-->
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
        </div>
        <div class="bulletin-wrapper"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default{
      props: { // 通过props接收传过来的seller对象，从App.vue里
          seller: {
              type: Object
          }
      }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .header
      color : #fff
      background : #111
      .content-wrapper
          padding : 24px 12px 18px 24px
          .avatar
              display : inline-block
          .content
              display : inline-block
</style>

