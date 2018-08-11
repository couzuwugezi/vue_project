<template>
  <div id="app">
    <loginDiv/>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view/>
  </div>
</template>

<script>
  import login from './components/login';

  export default {
    name: 'App',
    components: {
      'loginDiv': login
    }
  }
</script>

<style>
  #app {

  }
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    background-color: #F7FAF9;
  }
  html {
    height: 100%;
    width: 100%;
  }
</style>
