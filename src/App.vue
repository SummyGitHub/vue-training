<template>
  <div id="app">
    <myHeader :name="title"></myHeader>
    <router-view keep-alive class="main"></router-view>
  </div>
</template>

<script>
// import Login from './components/Login'
import myHeader from './components/commons/MyHeader'
import {mapActions} from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      title: '课程分享系统'
    }
  },
  components: {
    myHeader
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  navbar {
    position: fixed;
    top: 0px;
    left: 0px;
  }
  .main {
    padding-top: 60px;
  }
}

</style>
