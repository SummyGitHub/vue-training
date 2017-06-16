<template>
	<div class="articleT">
		<div>
			<div class="lists">
				<el-row class="el-col el-col-22 searchBar">
					<el-form ref="form" :inline="true">
						<!-- <el-col :lg="4"> -->
							<el-form-item>
								<el-select v-model="type" placeholder="请选择课程类型">
									<el-option value="必修课" label="必修课"></el-option>
									<el-option value="专业选修课" label="专业选修课"></el-option>
									<el-option value="公共选修课" label="公共选修课"></el-option>
								</el-select>
							</el-form-item>
						<!-- </el-col> -->
						<!-- <el-col :lg="4" :offset="1"> -->
							<el-form-item>
								<el-select v-model="filetype" placeholder="请选择资源类型">
									<el-option value="ppt" label="ppt"></el-option>
									<el-option value="word" label="word/pdf"></el-option>
								</el-select>
							</el-form-item>
						<!-- </el-col> -->
						<!-- <el-col :lg="3" :offset="1"> -->
						<!-- 	<el-form-item>
								<el-select v-model="selected1" placeholder="请选择学院">
									<el-option v-for="college in colleges" :value="college.collegeId" :label="college.collegeName"></el-option>
								</el-select>
							</el-form-item>	 -->						
						<!-- </el-col> -->
						<!-- <el-col :lg="3" :offset="1"> -->
						<!-- 	<el-form-item>
								<el-select v-model="selected2" placeholder="请选择专业">
									<el-option v-for="major in majors" :value="major.majorId" :label="major.majorName"></el-option>
								</el-select>
							</el-form-item> -->
						<!-- </el-col> -->
						<!-- <el-col :lg="3" :offset="1"> -->
							<el-form-item prop="course">
				      	<el-select v-model="selected1" name="course" placeholder="请选择课程" filterable>
				      		<el-option v-for="course in courses" :value="course.courseId" :label="course.courseName"></el-option>
				      	</el-select>
				      </el-form-item>
							<el-form-item>
								<el-input type="text" name="query" placeholder="关键字搜索" v-model="searchQ" style="width: 150px;"></el-input>
							</el-form-item>
						<!-- </el-col> -->
						<!-- <el-col :lg="1" :offset="1"> -->
							<el-form-item>
								<el-button type="primary" style="vertical-align: top;" @click="selectedLinks()">查询</el-button>
							</el-form-item>
						<!-- </el-col> -->
						
					</el-form>
				</el-row>
				<div class="el-col el-col-2">				
						<router-link to="/upload" class="upload pull-right">上传</router-link>
					</div>
				<el-row class="el-col el-col-24">
					<ul>
						<li v-for="item in items">
							<el-col class="article-title">
								<router-link :to="{path: '/Adetail',query: {sourceId: item.sourceId}}">{{item.filename}}</router-link>
								<a class="pull-right" :href="item.link" :download="item.filename" @click="down(item.sourceId)">下载</a>
							</el-col>
							<el-col :lg="3" :md="3" :sm="3" :xs="3">
								<img :src="item.img">
								<div class="toolbar" v-if="(isLoading && (user.sid == item.sid))">
									<!-- <router-link :to="{path: '/upload',query: {sourceId: item.sourceId}}">编辑</router-link> -->
									<a href="javascript:;" @click="delSource(item.sourceId)">删除</a>
								</div>
							</el-col>
							<el-col :lg="21" :md="21" :sm="21" :xs="21" class="intro">
								<div class="article-intro">
									<p class="intro-owner">
										<span>
											<router-link :to="{path: '/about',query: {userId: item.id}}">{{item.username}}</router-link>
										</span>
										<span style="color:#888888;">{{item.createDate}}</span>
										<span class="pull-right">下载量：{{item.downloadTimes}}</span>
									</p>
									<p class="intro-owner">
										<span>类型：{{item.filetype}}</span>
										<span>课程：{{item.course}}</span>
										<span>课程类型：{{item.type}}</span>
									</p>
									<p>说明：{{item.summary}}</p>
								</div>
							</el-col>
						</li>
					</ul>
				</el-row>
			</el-row>
			<pager class="pull-right pageClass" :pageSize="pageSettings.size"></pager>
		</div>
		
	</div>
	
</template>
<script type="text/javascript">
	import Pager from '../commons/Pager'
	import {mapState,mapGetters,mapActions} from 'vuex'
	

	export default {
		name: 'articleT',
		data () {
			return {
				searchQ: '',
				selected1: '',
				filetype: '',
				type: '',
				pageSettings: {curr: this.$route.query.curr ? this.$route.query.curr : 1,size: 10}
			}
		},
		created () {
			this.init();	
			this.getCourses();
		},
		methods: {
			...mapActions(['getAllLinks','getCourses','getLinksByFilter','getLinkByType','downloadFile','deleteArticleById']),
			init () {
				var type = this.$route.params.type;
				if (!type) {
					this.getAllLinks(this.pageSettings);
				} else if (type == 'filter') {
					this.getLinksByFilter(this.$route.query);
				} else {
					if (type == 'must') {
					 	type = '必修课'
					}else if (type == 'poc') {
						type = '公共选修课'
					}else {
						type = '专业选修课'
					}
					this.getLinkByType({'type': type,'pageSettings':this.pageSettings});
				}
			},
			selectedLinks () {
				this.pageSettings.curr = 1;
				if ((!this.searchQ) && (!this.selected1) && (!this.type) && (!this.filetype)) {
					alert('查询参数不能为空！');
					return false;
				}
				var data = {
					'filetype': this.filetype,
					'type': this.type,
					'searchQ': this.searchQ,
					'courseId': this.selected1,
					'curr': this.pageSettings.curr,
					'size': this.pageSettings.size
				}
				// this.getLinksByFilter(data);
				this.$router.push({path: '/article/filter',query: data});
			},
			clearSearchStr () {

			},
			down (id) {
				this.downloadFile({sourceId: id})
				.then(data => {
					if (data.code === 100) {
						this.getAllLinks(this.pageSettings);
					}
				})
			},
			delSource (id) {
				this.deleteArticleById({id:id})
				.then(result => {
					if (result.code == 100) {
						alert(result.msg);
						this.getAllLinks(this.pageSettings);
					}else {
						alert(result.msg);
					}
					
				});
			}
		},
		computed: {
			...mapState(['isLoading','user','items','courses']),
			pageSettings () {
				return {
					curr: this.$route.query.curr ? this.$route.query.curr : 1,
					size: 10
				}
			}
		},	
		components: {
			Pager
		},
		watch: {
			$route() {
				this.init()
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	.articleT {
		overflow: hidden;
		a {
			color: #34AC81;
		}
		.searchBar {
			overflow: hidden;
			.form-group {
				overflow: hidden;
				margin-right: 10px;
				margin-bottom: 10px;
			}
			.glyphicon {
				color: #34AC81
			}
		}
		.upload {
				display:inline-block;
				padding: 4px 10px;
				margin-right: 15px;
				background-color: #34AC81;
				color: #ffffff;
				text-decoration: none;
			}
		.lists{
			min-height: 770px;
			ul {
				overflow: hidden;
			}
			li {
				margin-top: 10px;
				margin-bottom: 10px;
				overflow: hidden;
				border-bottom: 1px dotted #cccccc;
				div {
					overflow: hidden;
				}
				img {
					width: 100px;
					height: 100px;
					border: 1px solid #cccccc;
				}
				.toolbar {
					margin-top: 20px;
					color: #888888;
					font-size: 12px;
					text-align: center;
					a {
						padding-right:5px;
					}
				}
				.article-title{
					font-size: 16px;
					line-height: 32px;
				}
				.article-intro {
					margin-top: 6px;
					padding: 5px 10px;
					line-height: 38px;
					border: 1px solid #F3F3F3;
					border-radius: 4px;
					margin-bottom: 15px;
					.intro-owner {
						span {
							display: inline-block;
							padding-right: 25px;
						}
					}
				}
			}
			.el-pager {
	      li {
	        margin-top: 0px;
	      }
	    }
		}
		
	}
</style>