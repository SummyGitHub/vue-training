<template>
	<div class="ask el-col el-col-22 el-col-offset-1">
		<el-form :model="askForm" ref="askForm" label-width="100px" v-on:submit.prevent id="upload">
			<el-form-item label="问题" prop="question">
				<el-input v-model="askForm.question" name="question"></el-input>
			</el-form-item>
			<el-form-item label="问题类别" prop="type">
      	<el-select v-model="askForm.type" name="course" placeholder="请选择课程" filterable>
      		<el-option v-for="course in courses" :value="course.courseId" :label="course.courseName"></el-option>
      	</el-select>
      </el-form-item>
      <el-form-item label="问题详述">
      	<vue-editor :editor-toolbar="customToolbar" :use-save-button="false" @editor-updated="handleUpdatedContent"></vue-editor>
      </el-form-item>
			<el-form-item>
				<el-button @click="submit">提交</el-button>
			</el-form-item>
		</el-form>
		
	</div>
</template>
<script type="text/javascript">
	import {mapState,mapActions} from 'vuex'
	import {VueEditor}  from 'vue2-editor'
	export default {
		name: "ask",
		data () {
			return {
				askForm: {
					content: '',
					question: '',
					questionInfo: '',
					type: ''
				},
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
		components: {
			VueEditor
		},
		computed: {
			...mapState(['isLoading','user','updateInfo','courses']),
			// question () {return this.updateInfo.courseId},
			// questionInfo () {return this.updateInfo.courseName},
			// college () {return this.updateInfo.collegeId},
			// major () {return this.updateInfo.majorId},
			// course () {return this.updateInfo.courseId},
 		},
		created () {
			if (this.courses.length == 0) {
				this.getCourses();
			}
		},
		methods: {
			...mapActions(['getCourses','saveQuestion']),

			handleUpdatedContent (data) {
				this.askForm.content = data
			},

			submit() {
				if (this.isLoading) {
					if (this.user.sid) {
						var form = document.getElementById('upload');
						var formData = new FormData(form);
						formData.append('userId',this.user.sid);
						formData.append('type',this.askForm.type);
						formData.append('createDate',new Date());
						formData.append('questionInfo',this.askForm.content);
						// if (this.$route.query.userId) {
						// 	this.updateQuestion(formData)
						// 	.then(result => {
						// 		if (result.code === 100) {
						// 			alert(result.msg);
						// 			this.$router.push({path: '/topic'});
						// 		}else {
						// 			alert(result.msg);
						// 		}
						// 	});
						// }else {
							this.saveQuestion(formData)
							.then(result => {
								if (result.code === 100) {
									this.$router.push({path: '/topic'});
								}else {
									alert(result.msg);
								}
							});
						// }
					}else {
						alert('上传发生错误，请检查是否已登录！')
					}
				}else {
					alert('请先登录！');
				}
				
			}
		},
		watch: {
			college () {
				if (this.college) {
					this.getMajorByColege({collegeId: this.college});
				}
			},
			major () {
				if (this.major) {
					this.getCourseByMajor({majorId: this.major});
				}
			}
		} 
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.ask {
		margin-top: 30px;
	}
	
</style>