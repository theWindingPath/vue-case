<template>
  <div class="hello">
    <!-- 这里msg对应下面script里data()里的msg -->
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default { // 一定要export导出，在其他部分才可以用import引入
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!3333'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
