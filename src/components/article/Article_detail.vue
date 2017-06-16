<template>
	<div class="article_detail el-col el-col-20 el-col-offset-2">
		<div class="article_detail_header">
			<div class="container">
				<div class="panel_header">
					<h2>{{article.filename}}</h2>
				</div>
				<div class="panel_content">
					<div class="el-col el-col-6">
						<div class="row">
							<img :src="article.img">
						</div>
					</div>
					<div class="el-col el-col-6 el-col-offset-1">
						<div class="row detail">
							<p>所属课程：{{article.course}}</p>
							<p>类型：{{article.filetype}}</p>
							<p>课程类型：{{article.type}}</p>
							<p>上传时间：{{article.createDate}}</p>
							<p>下载量：{{article.downloadTimes}}</p>
							<p>资源详情：{{article.summary}}</p>
						</div>
					</div>
					<div class="el-col el-col-8">
						<div class="row detail">
							<p>上传者：<router-link :to="{path: '/about',query: {userId: article.sid}}">{{article.username}}</router-link></p>
							<p>性别：{{article.sex}}</p>
							<p v-if="article.qq">qq：{{article.qq}}</p>
							<p>邮箱：{{article.email}}</p>
						</div>	
					</div>
					<div class="el-col el-col-2">
						<a :href="article.link" :download="article.filename" @click="down(article.sourceId)">下载</a>
					</div>
				</div>
			</div>
		</div>
		<div class="article_detail_content">
			<div class="container">
				<div class="panel_header">
					<h4>热门资源下载</h4>
				</div>
				<div class="hotList">
					<ul>
						<li v-for="item in items" class="el-col el-col-12">
							<div class="el-col el-col-4">
								<img :src="item.img">
							</div>
							<div class="el-col el-col-8 el-col-offset-1">
								<router-link :to="{path:'/Adetail',query:{sourceId: item.sourceId}}">{{item.filename}}</router-link>
								<span>{{item.username}}</span>
							</div>	
						</li>
					</ul>
				</div>
			</div>
			
		</div>
	</div>
	
</template>
<script type="text/javascript">
	import {mapState,mapActions} from 'vuex'
	export default {
		name: 'article_detail',
		data () {
			return {
				article: {}
			}
		},
		methods: {
			...mapActions(['getLinkById','getHotLinks','downloadFile']),
			down (id) {
				this.downloadFile({sourceId: id})
				.then(data => {
					if (data.code === 100) {
						alert('下载成功！');
					}
				})
			},
		},
		computed : {
			...mapState(['items'])
		},
		created () {
			this.getLinkById({sourceId: this.$route.query.sourceId})
			.then(data => {
				console.log(data);
				this.article = data[0];
				this.getHotLinks({curr:1,size:2})
			});
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" type="text/css">
	.article_detail {
		.panel_header {
			padding: 25px 35px 25px 35px;
			background-color: #f6f6f6;
		}
		.panel_content {
			overflow: hidden;
			padding: 40px 15px 30px;
		}
		.detail {
			p {
				padding: 5px 0px;
				font-size: 16px;
			}
			a {
				color: #000000;
				&:hover,&:active,&visited {
					color: #000000;
				}
			}
		}
		.hotList {
			padding: 5px 35px;
			line-height: 35px;
			font-size: 16px;
		}
		.article_detail_header {
			
			margin-bottom: 30px;
		}
	}
</style>