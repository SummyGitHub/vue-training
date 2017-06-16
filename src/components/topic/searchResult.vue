<template>
	<div class="container view">
		<div class="form-inline searchTool col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<input class="form-control" type="text" name="search" placeholder="搜索" v-model="message">
			<button class="btn btn-default" style="margin-left:15px;" @click="search()"><i class="glyphicon glyphicon-search"></i></button>
		</div>
		<h4 class="col-lg-12 col-md-12 col-sm-12 col-xs-12 resultCount">找到{{searchResult.length}}个结果</h4>
		<div class="topicLists">
			<div v-for="item in searchResult" class="topic_item">
				<section>
					<div class="summary col-lg-10 col-md-10 col-sm-10 col-xs-10">
						<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 question">
							<a href="javascript:;">{{item.question}}</a>
							<a class="types" href="javascript:;">{{item.courseName}}</a>
						</div>
						<div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 source">
							<span class="author"><a href="javascript:;">{{item.username}}</a></span>
							<span class="time">{{item.createDate}}</span>
						</div>
					</div>
				</section>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {mapState,mapGetters,mapActions} from 'vuex'
	export default {
		name: "view",
		data () {
			return {
				message: ''
			}
		},
		computed: {
			...mapState(['searchResult'])
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.resultCount {
		line-height: 40px;
	}
	.topicLists {
		section {
			overflow: hidden;
			border-bottom: 1px solid #eeeeee;
		}
		.rank {
			.answers {
				width: 45px;
				height: 40px;
				font-size: 13px;
				text-align: center;
				color: #999999;
				margin: 10px 6px;
			}	
		}
		.summary {		
			div{
				height: 30px;
				line-height: 30px;
			}
			a{
				color: #000000;
			}
			.source{
				.author {
					a {
						color: #999999;
						font-size: 13px;
					}				
				}
				.time {
					color: #999999;
					font-size: 13px;
					padding-left:15px;
				}
			}
			.question {
				font-size: 16px;
				.types {
					display: inline-block;
					padding: 4px;
					margin-left:10px;
					font-size: 10px;
					line-height: 13px;
					background-color: rgba(1,126,102,.08);
					color: #34AC81;
					text-decoration: none;
					&:hover {
						background-color: #34AC81;
						color: #ffffff;
					}
				}
			}
		}
	}
	
</style>