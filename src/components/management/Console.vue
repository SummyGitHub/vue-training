<template>
  <div class="console el-col el-col-22 el-col-offset-1" id="console">
    <div class="el-col el-col-5">
      <sidemenu :list="sidebars"></sidemenu>
    </div>
    <div class="el-col el-col-18 el-col-offset-1">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import sidemenu from '../commons/Sidemenu'
import {mapActions} from 'vuex'

export default {
  name: 'console',
  data () {
    return {
      sidebars: {
        title: '后台管理列表',
        childrens: [
          {name: '用户管理',childrens: [
            {name: '学生管理',path: '/console/studentManage',index:"1-1"},
            {name: '教师管理',path: '/console/teacherManage',index:"1-2"},
          ],index:"1"},
          {name: '课程管理',path: '/console/coursesManage',index:"2"},
          {name: '资源管理',path: '/console/sourcesManage',index:"3"},
          {name: '问题管理',path: '/console/topicsManage',index:"4"}
        ]
      }
    }
  },
  components: {
    sidemenu
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  #app {
    #console {
      padding-top: 75px;
    }
  }
  
</style>
