<template>
	<div class="profile el-col el-col-22 el-col-offset-1">
		<div class="profile_header">
			<div class="container">
				<div class="el-row">
					<div class="el-col el-col-6">
						<img :src="info.portrait">
					</div>
					<div class="el-col el-col-7 el-col-offset-1">
						<h3 class="profile_header_name">{{info.username}}</h3>
						<div class="profile_header_info">
							<span>性别：{{info.sex}}</span>
							<span>学院：{{info.collegeName}}</span>
							<span v-if="info.majorName">专业：{{info.majorName}}</span>
							<span>QQ：{{info.qq ? info.qq : '未填写'}}</span>
						</div>
					</div>
					<div class="el-col el-col-8 el-col-offset-1">
						<div class="panel_active">
							<div class="panel_header">
								<h5 class="panel_header_title">个人箴言</h5>
							</div>
							<div class="panel_content" style="line-height:30px">
								{{info.info}}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="profile_content container">
			<div class="row">
				<div class="el-col el-col-5">
					<ul class="el-menu el-menu-vertical-demo">
						<li class="el-menu-item"><router-link :to="{path: '/about/questions',query: {userId: this.$route.query.userId}}">提问<span class="times pull-right">{{topicCount}}</span></a></li>
						<li class="el-menu-item"><router-link :to="{path: '/about/answers',query: {userId: this.$route.query.userId}}">回答<span class="times pull-right">{{answerCount}}</span></router-link></li>
						<li class="el-menu-item"><router-link :to="{path: '/about/source',query: {userId: this.$route.query.userId}}">上传资源<span class="times pull-right">{{sourceCount}}</span></router-link></li>
						<li class="el-menu-item" v-if="info.isTeacher"><router-link :to="{path: '/about/teach'}">教授课程<span class="times pull-right">{{coursesTeach.length}}</span></router-link></li>
					</ul>
				</div>
				<div class="el-col el-col-18 el-col-offset-1">
					<router-view></router-view>
				</div>
			</div>
		</div>
	</div>
	
</template>
<script type="text/javascript">
	import {mapState,mapActions} from 'vuex'
	import ECharts from 'vue-echarts'
	export default {
		name: 'about',
		data () {
			return {
				courseCount: 0
			}
		},
		created () {
			this.getUserInfoById({userId: this.$route.query.userId});
			this.getAnswerListById({userId: this.$route.query.userId,curr:1,size:5})
			this.getQuestionListById({userId: this.$route.query.userId,curr:1,size:5})
			this.getSourceListById({userId: this.$route.query.userId,curr:1,size:5})
		},
		computed: {
			...mapState(['info','topicCount','answerCount','sourceCount','coursesTeach']),
			courseCount () {
				this.getCoursesTeach({userId: this.$route.query.userId})
			}
		},
		methods: {
			...mapActions(['getUserInfoById','getAnswerListById','getQuestionListById','getSourceListById','getCoursesTeach'])
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" type="text/css">
	.profile{
		.profile_header {
			background-color: #f6f6f6;
			padding: 40px 0 30px;
			margin-bottom: 30px;
		}
		.profile_header_info {
			span {
				display: block;
				line-height: 34px;
			}
		}
		.profile_content {
			padding-bottom: 30px;
			.list-group-item{
				border-width: 0px;
				cursor: pointer;
				&:hover {
					background-color: #f6f6f6;
				}
				a {
					display: block;
					color: #000000;
					text-decoration: none;
				}
				.times {
					display: inline-block;
					color: #a9a9a9;
				}
			}		
		}
		.panel_active {
				border: 1px solid #dddddd;
				margin-bottom: 20px;
				.panel_header {
					overflow: hidden;
					padding: 10px 15px;
					background-color: #f6f6f6;
					border-bottom: 1px solid #dddddd;
	    		border-top-right-radius: 2px;
	    		border-top-left-radius: 2px;
	    		.options {
	    			text-align: right;
	    		}
				}
				.panel_content {
					padding: 15px;
					min-height: 250px;
					li {
						border-bottom-width: 1px;
						border-bottom-style: dashed;
						border-bottom-color: #dddddd;
						a {
							span {
								display: inline-block;
							}
						}
					}
				}
			}
	}
</style>