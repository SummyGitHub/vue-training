<template>
	<div class="topic_detail el-col el-col-22 el-col-offset-1">
		<div class="question_header">
			<div class="container">
				<div class="el-row">
					<div class="el-col el-col-18">
						<span class="question_header_symbol">问</span>
						<div class="question_header_info">
							<h3 class="question_header_info_question">{{questionItem.question}}</h3>
							<div class="question_header_info_author">
								<span><router-link :to="{path: '/about',query: {userId: questionItem.questioner}}"><strong>{{questionItem.username}}</strong></router-link></span>
								<span>{{questionItem.createDate}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="question_info container">
			<div class="row">
				<div class="question_info_content">
					<article>
						<div class="question_info_content_symbol question_header_symbol el-col el-col-2">
							问
						</div>
						<div class="question_info_content_content el-col el-col-22" v-html="questionItem.questionInfo">
							
						</div>
					</article>
				</div>
			</div>
			<div class="el-row">
				<div class="question_info_answer">
					<div class="question_info_answer_size">
						<h3>{{answers.length}}个回答</h3>
					</div>
					<article class="question_info_answer_list" v-for="answer in answers">
						<div class="question_info_content_symbol question_header_symbol el-col el-col-2">
							答
						</div>
						<div class="question_info_content_content el-col el-col-22">
							<div class="el-col el-col-19">
								<div class="el-row">
									<div class="question_info_answer_content_content el-col el-col-24" v-html="answer.content">
									</div>		
								</div>
							</div>
							<div class="el-col el-col-3  el-col-offset-2">
								<div class="el-col el-col-8"><img style="width:40px;height: 40px;border-radius:40px;" :src="answer.portrait"></div>
								<router-link :to="{path: '/about',query: {userId: answer.observerId}}" style="padding-left:10px;">{{answer.username}}</router-link>
							</div>
							<div class=" el-col el-col-24">
								<div class="el-col el-col-2 answer_date">{{answer.answerDate}}</div>
								<div class="el-col el-col-2 answer_bar" v-if="isLoading && answer.observerId !=user.sid">
									<VueStar animate="animated rubberBand" color="#34AC81">
										<i slot="icon" class="fa fa-thumbs-up fa-x" @click="doLike(answer.answerId,answer.questionId)"></i>
								  </VueStar>
								  <span class="answer_bar_info">赞</span>
								</div> 
								<!-- <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1 answer_bar">
									<VueStar animate="animated rubberBand" color="#34AC81">
										<i slot="icon" class="fa fa-heart fa-x" @click="doFavorite(answer.answerId)"></i>
								  </VueStar>
								  <span class="answer_bar_info">收藏</span>
								</div> -->
							</div>
							
						</div>
					</article>
				</div>
			</div>
			<div class="el-row">
				<div class="question_info_editor">
					<div class="question_info_editor_header">
						<h3>撰写答案</h3>
					</div>
					<vue-editor :editor-toolbar="customToolbar" :use-save-button="false" @editor-updated="handleUpdatedContent"></vue-editor>
					<el-button class="pull-right uploadAnswer" @click="uploadAnswer">提交答案</el-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {mapState,mapActions} from 'vuex'
	import {VueEditor}  from 'vue2-editor'
	import VueStar from 'vue-star'
	export default {
		name: 'topic_detail',
		data () {
			return {
				content: '',
				customToolbar: [
					['bold', 'italic', 'underline', 'strike'],
				  ['blockquote', 'code-block'],
				  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
				  [{ 'indent': '-1'}, { 'indent': '+1' }],
				  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
				  [{ 'font': [] }],
				  [{ 'color': [] }, { 'background': [] }],
				  [{ 'align': [] }],				   
          ['image','link'],
          ['clean']
        ]
			}
		},
		computed: {
			...mapState(['isLoading','questionItem','answers','user'])
		},
		components: {
			VueEditor,
			VueStar
		},
		created () {
			this.getTopicById({'questionId': this.$route.query.questionId});
		},
		methods: {
			...mapActions(['getTopicById','saveAnswer','addPraise']),
			handleUpdatedContent (data) {
				this.content = data
			},
			uploadAnswer () {
				//判断是否已经登录
				if (this.isLoading && this.user.username) {
					var data = {
						'questionId' : this.questionItem.questionId,
						'observerId' : this.user.sid,
						'content': this.content,
						'answerDate' : new Date()
					}
					this.saveAnswer(data).then(result=> {
						if (result.code === 100) {
							this.$message({
								type: 'success',
								message: '答案已上传'
							});
							this.getTopicById({'questionId': this.$route.query.questionId});
							this.content = '';
						}else {
							console.log(result);
							alert(result.msg)
						}
					})
					
				}else {
					alert('请先登录！');
				}
				
			},
			doLike (answereId,questionId) {
				this.addPraise({answereId:answereId,userId:this.user.name,questionId:questionId});
			},
			doFavorite (id) {
				alert('收藏');
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" type="text/css">
	.topic_detail {
		margin-top: -20px;
		article {
			overflow: hidden;
		}
		a {
			color: #34AC81;
			&:hover,&:active,&:visited {
				color: #34AC81;
			}
		}
		.question_header {
			padding: 60px 0;
			background: #f6f6f6;
			.question_header_info {
				margin-left: 50px;
				.question_header_info_question {
					margin: 0px 0px 15px 0px;
				}
			}
		}
		.question_header_symbol {
				display: inline-block;
				float: left;
				width: 28px;
				height: 28px;
				padding: 4px;
				border: 1px solid #34AC81;
				border-radius: 50%;
				font-size: 14px;
				color: #34AC81;
				text-align: center;
			}
		.question_info_content {
			padding: 15px 0px 15px 0px;
		}
		.question_info_content_content {
			margin-left: 20px;
			font-size: 16px;
			line-height: 26px;
			.answer_date {
				margin-top: 10px;
				font-size: 13px;
				color: #666666;
			}
			.answer_bar {
				position: relative;
				float: left;
				height: 20px;
				margin-top: 10px;
				padding-right: 0px;
				.answer_bar_info {
					display: inline-block;
					margin-top: 20px;
					font-size: 12px;
					color: #34AC81;
				}
				.VueStar__ground,.VueStar__decoration {
					width: 16px;
					height: 16px;
				}

			}		
		}
		.question_info_answer_size {
			border-bottom: 2px solid #cccccc;
		}
		.question_info_answer_list {
			padding: 15px 0px 15px 15px;
			padding-bottom: 20px;
			border-bottom: 1px solid #cccccc;
		}
		.question_info_editor {
			margin-top: 50px;
			.uploadAnswer {
				margin: 20px 0;
				background-color: #34AC81;
				color: #ffffff;
			}
		}
		
	}
</style>