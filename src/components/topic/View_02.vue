<template>
	<div class="view">
		<div class="topicLists">
			<div v-for="item in topicLists" class="topic_item">
				<section>
					<div class="rank el-col el-col-2">
						<div class="answers">
							<span>{{item.answerCount}}</span><br/>
							<span>回答</span>
						</div>
					</div>
					<div class="summary el-col el-col-22">
						<div class="source">
							<span class="author"><a href="javascript:;">{{item.username}}</a></span>
							<span class="time">{{item.createDate}}</span>
						</div>
						<div class="question">
							<a href="javascript:;">{{item.question}}</a>
							<!-- <a class="types" href="javascript:;">{{item.courseName}}</a> -->
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
		computed: {
			...mapState(['topicLists'])
		},
		methods: {
			...mapActions(['getHotTopicLists'])
		},
		created() {
			this.getHotTopicLists({curr:1,size:6});
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
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