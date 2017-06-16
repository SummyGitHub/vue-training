<template>
	<div class="topic el-col el-col-22 el-col-offset-1">
		<el-form :inline="true" class="searchTool ">
			<el-form-item>
				<el-input class="form-control col-lg-10 col-md-10 col-sm-10 col-xs-10" type="text" name="search" placeholder="搜索" v-model="message"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" style="margin-left:15px;" @click="search()">搜索</el-button>
			</el-form-item>
		</el-form>
		<div class="el-col el-col-17" style="margin-top: 30px;">
			<tab :tabNames="tabNames" :viewContent="viewContent"></tab>
			<!-- <keep-alive> -->
				<component :is="currentTab" :class="active"></component>
			<!-- </keep-alive> -->
		</div>
		<div class="el-col el-col-6 el-col-offset-1">
			<div class="askArea">
				<p>你今天遇到问题了吗？</p>
				<router-link to="/ask" class="ask">提问</router-link>
			</div>
			<div class="rankLists">
				<div class="topic-header">
					<span>活跃排行榜</span>
				</div>
				<div class="topic-body" style="min-height:280px">
					<div v-for="(item,index) in rankLists">
						<div>
							<div class="summary el-col el-col-24">
								<div class="index el-col el-col-2">{{index+1}}</div>
								<div class="title el-col el-col-12">
									<span class="portrait"><img style="width:30px;height:30px;margin-top:5px" :src="item.portrait"></span>
									<span class="username" style="vertical-align: text-bottom;"><router-link :to="{path: '/about',query: {userId: item.sid}}">{{item.username}}</router-link></span>
								</div>
								<div class="grade el-col el-col-8 pull-right">{{item.grade}}</div>
							</div>
						</div>
					</div>
				</div>
				<div class="topic-footer"></div>
			</div>
		</div>	
	</div>
</template>
<script type="text/javascript">
	import Tab from '../commons/Tab'
	import View_01 from './View_01'
	import View_02 from './View_02'
	import View_03 from './View_03'
	import {mapState,mapActions} from 'vuex'
	export default {
		name: "topic",
		data () {
			return {
				message: '',
				active: 'active',
				tabNames: [
					{tabName: '最新的',index:'View_01'},
					{tabName: '热门的',index:'View_02'},
					{tabName: '未回答的',index:'View_03'}
				],
				viewContent: [
					'View_01',
					'View_02',
					'View_03'
				]
			}
		},
		created() {
			this.getRankLists();
		},
		components: {
			Tab,
			View_01,
			View_02,
			View_03
		},
		computed: {
			...mapState(['currentTab','rankLists'])
		},
		methods: {
			...mapActions(['getRankLists','getBySearch']),
			search () {
				if (this.message) {
					this.getBySearch({str:this.message});
					this.$router.push({path:'/searchResult'});
				}else {
					thia.$message({
						type: 'danger',
						message: '请输入要查询的字段！'
					});
					return;
				}
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	$base-color: #34AC81;
	$w-font: #ffffff;
	$font-h: 40px;
	.topic {
		margin-top: 30px;
		.tab {
			a {
				color: #000000;
			}
		}
		.askArea {
			margin-bottom: 30px;
			padding: 30px;
			border: 1px solid #ddd;
			border-radius: 3px;
			background-color: #f6f6f6;
			p {
				line-height: 36px;
			}
			.ask {
				width: 100%;
				display:inline-block;
				padding: 4px 15px;
				margin-right: 15px;
				background-color: #34AC81;
				color: #ffffff;
				text-align: center;
				text-decoration: none;
			}
		}	
		.rankLists {
			height: 350px;
			.topic-header{
				height: $font-h;
				background-color: $base-color;
				color: $w-font;
				font-size: 15px;
				line-height: $font-h;
				padding-left: 15px;
			}
			.topic-body {
				overflow: hidden;
				border-left: 1px solid $base-color;
				border-right: 1px solid $base-color;
			}
			.topic-footer {
				height: 20px;
				background-color: $base-color;
			}
			.summary {
				height: $font-h;
				padding-left: 0px;
				line-height: $font-h;
				font-size: 14px;
				overflow: hidden;
				border-bottom: 1px solid #eeeeee;
				div {
					padding-left: 15px;
				}
				.portrait {
					display: inline-block;
					width: 40px;
					height: $font-h;
					img{
						width: 100%;
					}
				}
				.grade{
					text-align: right;
				}
			}
		}
		
	}
</style>