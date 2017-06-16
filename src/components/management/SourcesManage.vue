<template>
	<div class="sourcesManage">
		<div class="actionBar">
			<span class="pull-left">资源管理</span>
			<router-link :to="{path: '/console/sourcesAnalysic'}" class="btn pull-right">资源统计</router-link>
		</div>
		<el-table
    :data="items"
    style="width: 100%;height: 440px;margin-bottom: 15px">
    <el-table-column type="expand">
      <template scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="图片">
            <img class="item_portrait" :src="props.row.img"></img>
          </el-form-item>
          <el-form-item label="资源标题">
            <span>{{ props.row.filename }}</span>
          </el-form-item>
          <el-form-item label="格式">
            <span>{{ props.row.filetype }}</span>
          </el-form-item>
          <el-form-item label="所属课程">
            <span>{{ props.row.course }}</span>
          </el-form-item>
          <el-form-item label="上传时间">
            <span>{{ props.row.createDate }}</span>
          </el-form-item>
          <el-form-item label="上传者">
            <span>{{ props.row.username }}</span>
          </el-form-item>
          <el-form-item label="资源链接">
          	<span>{{ props.row.link}}</span>
          </el-form-item>
          <el-form-item label="QQ">
          	<span>{{ props.row.qq}}</span>
          </el-form-item>
          <el-form-item label="电话">
          	<span>{{ props.row.tel}}</span>
          </el-form-item>
          </el-form-item label="教授课程">
          	<span v-for></span>
          </el-form>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="资源标题"
      prop="filename">
    </el-table-column>
    <el-table-column
      label="类型"
      prop="filetype">
    </el-table-column>
    <el-table-column
    	label="所属课程"
    	prop="course">
    </el-table-column>
    <el-table-column
    	label="上传时间"
    	prop="createDate">
    </el-table-column>
    <el-table-column
    	label="上传者"
    	prop="username">
    </el-table-column>
    <el-table-column
    	label="操作">
    	 <template scope="scope">
        <el-button
          size="small"
          type="danger"
          @click="delById(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  	</el-table>
		<pager class="pull-right pageClass" :pageSize="pageSettings.size"></pager>
	</div>
</template>
<script>
	import pager from '../commons/Pager'
	import {mapState,mapGetters,mapActions} from 'vuex'
	export default {
		name: 'sourcesManage',
		data () {
			return {
				pageSettings: {
					curr: this.$route.query.curr ? this.$route.query.curr : 1,
					size: 10
				}
			}
		},
		created () {
			this.getAllLinks(this.pageSettings)
		},
		components: {
			pager
		},
		computed: {
			...mapState(['items'])
		},
		methods: {
			...mapActions(['getAllLinks']),
			delById(id,row) {
				
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	@import "../../style/management.common";
</style>