<template>
	<el-col class="home" :lg="20" :offset="2">
		<swipe :picObj="picObj"></swipe>
		<el-col class="list" :lg="20" :offset="2">
			<div class="list_header">
				<h4>资源列表</h4>
			</div>
			<el-row :gutter="30" class="list_content">						
				<el-col :span="6" v-for="item in items" class="items">
					<div class="course_type">
						<img style="height:370px;height:100%;" :src="item.img">
					</div>
					<div class="list_title">
						<router-link :to="{path: '/Adetail',query:{sourceId: item.sourceId}}">{{item.filename}}</router-link>
					</div>
					<div class="list_info">
						<span class="list_info_time">{{item.createDate}}</span>
						<span class="list_info_author">{{item.username}}</span>
						<!-- <span class="pull-right">More</span> -->
					</div>
				</el-col>	
			</el-row>		
		</el-col>
	</el-col>
</template>
<script type="text/javascript">
	import Swipe from './commons/Swipe'
	import {mapState,mapActions} from 'vuex'
	export default {
		name: "home",
		data () {
			return {
				msg: 'home',
				picObj: {
					items:['../../static/images/windows.jpg','../../static/images/java.jpg','../../static/images/timg.jpg']
				}
			}
		},
		computed: {
			...mapState(['items'])
		},
		created () {
			this.getAllLinks({curr:1,size: 6})
		},
		components: {
			Swipe
		},
		methods : {
			...mapActions(['getAllLinks'])
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.home {
		.list {
			margin-top: 30px;
			h4 {
				color: #34AC81;
				font-weight: 700;
			}
			.items {
				margin: 20px 0;
				line-height: 30px;
			}
		}
	}
</style>