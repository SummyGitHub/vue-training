<template>
	<div class="about_list">
		<div class="panel_active">
			<div class="panel_header">
				<h5 class="panel_header_title">{{title}}</h5>
			</div>
			<div class="panel_content">
				<ol class="el-menu el-menu-vertical-demo">
					<li class="el-menu-item" v-if="type == 'answers'" v-for="answer in answers">
						<router-link :to="{path: '/Tdetail',query: {questionId: answer.questionId}}">
						{{answer.question}}
						<span>&nbsp;&nbsp;{{answer.answerDate}}</span>
						<span class="pull-right">
							<i class="fa fa-thumbs-up fa-x" style="color: #34AC81">&nbsp;&nbsp;{{answer.praise}}</i>
						</span>
						</router-link>	
					</li>
					<li class="el-menu-item" v-if="type == 'questions'" v-for="item in topicLists">
						<router-link :to="{path: '/Tdetail',query: {questionId: item.questionId}}">
						{{item.question}}
						<span>&nbsp;&nbsp;{{item.createDate}}</span>
						</router-link>	
					</li>
					<li class="el-menu-item" v-if="type == 'source'" v-for="item in items">
						<router-link :to="{path: '/Tdetail',query: {questionId: item.sourceId}}">
						{{item.filename}}
						<span>&nbsp;&nbsp;{{item.createDate}}</span>
						</router-link>	
					</li>
					<li class="el-menu-item" v-if="type == 'teach'" v-for="item in coursesTeach">
						<span>{{item.courseCode}}</span>
						<span>{{item.courseName}}</span>
					</li>
				</ol>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {mapState,mapActions} from 'vuex'
	export default {
		name: 'about_list',
		data () {
			return {
				title: '',
				type: ''
			}
		},
		computed: {
			...mapState(['items','topicLists','answers','items','coursesTeach'])
		},
		created () {
			this.filterType();
		},
		watch: {
			$route() {
				this.filterType()
			}
		},
		methods: {
			filterType () {
				this.type = this.$route.params.id;
				if (this.type == 'answers') {
					this.title = '回答列表';
				} else if (this.type == 'questions') {
					this.title = '提问列表';
				}else if (this.type == 'source') {
					this.title = '上传列表';
				} else if (this.type == 'teach') {
					this.title = '教授课程';
				}
			}
		}
	}
</script>
