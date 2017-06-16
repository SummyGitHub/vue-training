<template>
	<div class="topicsManage">
		<div class="actionBar">
			<router-link class="pull-left breadcrumb" :to= "{path: '/console/topicsManage'}">问题管理</router-link>
			<router-link :to="{path: '/console/topicsAnalysic'}" class="btn pull-right">问题统计</router-link>
		</div>
		<el-table
    :data="topicLists"
    style="width: 100%;height: 440px;margin-bottom: 15px">
    <el-table-column type="expand">
      <template scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="问题">
            <span>{{ props.row.question }}</span>
          </el-form-item>
          <el-form-item label="问题详述">
            <span v-html="props.row.questionInfo"></span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="问题"
      prop="question">
    </el-table-column>
    <el-table-column
      label="提问者"
      prop="username">
    </el-table-column>
    <el-table-column
    	label="提问时间"
    	prop="createDate">
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
		name: 'topicsManage',
		data () {
			return {
				pageSettings: {
					curr: 1,
					size: 6
				}
			}
		},
		created () {
			this.getLastedTopicLists(this.pageSettings)
		},
		components: {
			pager
		},
		computed: {
			...mapState(['topicLists'])
		},
		methods: {
			...mapActions(['getLastedTopicLists'])
		},
		watch: {
			$route () {
				this.getLastedTopicLists({curr:1,size:6});
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	@import "../../style/management.common";
	.console {
		.topicsManage {
			.demo-table-expand {
				.el-form-item {
					width: 100%;
				}
			}
		}
	}
	
</style>