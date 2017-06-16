<template>
  <div class="article">
    <div class="el-col el-col-5 el-col-offset-1">
      <sidemenu :list="sidebars"></sidemenu>
    </div>
    <div class="article-content el-col el-col-17">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import sidemenu from '../commons/Sidemenu'
import articleT from './Article_template'

export default {
  name: 'article',
  data () {
    return {
      sidebars: {
        title: '课程种类',
        childrens: [
          {name: '全部',path: '/article',index:"1"},
          {name: '必修课',path: '/article/must',index:"2"},
          {
            name: '公共选修课',
            path: '/article/poc',
            index:'3',
            // childrens: [
            //   {name: '人文社会科学类',path: '/acticle',index:"3-1"},
            //   {name: '自然科学类',path: '/acticle',index:"3-2"},
            //   {name: 'A系列',path: '/acticle',index:"3-3"}
            // ]
          },
          {name: '专业选修课',path: '/article/mec',index:"4"}
        ]       
      }
    }
  },
  components: {
    sidemenu,
    articleT
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .article {
    .article-content {
      padding: 25px;
    }
    
  }
  
</style>
