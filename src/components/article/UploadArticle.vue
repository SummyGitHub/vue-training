<template>
	<div class="uploadAritle el-col el-col-22 el-col-offset-1">
		<el-form :model="uploadForm" :rules="rules" ref="uploadForm" label-width="100px" id="uploadForm" v-on:submit.prevent>
			<el-form-item label="标题" prop="title">
        <el-input v-model="uploadForm.title" name="title"></el-input>
      </el-form-item>
      <el-form-item label="格式类型" prop="filetype">
      	<el-select v-model="uploadForm.filetype" name="filetype" placeholder="请选择资源类型">
					<el-option value="ppt">ppt</el-option>
					<el-option value="word">word/pdf</el-option>
				</el-select>
      </el-form-item>
      <el-form-item label="所属课程名" prop="course">
      	<el-select v-model="uploadForm.course" name="course" placeholder="请选择课程" filterable>
      		<el-option v-for="course in courses" :value="course.courseId" :label="course.courseName"></el-option>
      	</el-select>
      </el-form-item>
      <el-form-item label="课程类别" prop="type">
      	<el-select v-model="uploadForm.type" name="type" placeholder="请选择课程类别">
      		<el-option value="必修课">必修课</el-option>
      		<el-option value="专业选修课">专业选修课</el-option>
      		<el-option value="公共选修课">公共选修课</el-option>
      	</el-select>
      </el-form-item>
      <el-form-item label="资源介绍" prop="summary">
      	<el-input type="textarea" v-model="uploadForm.summary" name="summary"></el-input>
      </el-form-item>
      <el-form-item label="文件上传" prop="file">
      	<el-upload class="upload-demo" drag action="/api/saveFile" :on-success="getFile" name="file">
				  <i class="el-icon-upload"></i>
				  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				  <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
				</el-upload>
				<!-- <el-input type="file"></el-input> -->
      </el-form-item>
      <el-form-item>
      	<el-button type="primary" @click="submit">上传</el-button>
      </el-form-item>
		</el-form>
	</div>
</template>
<script type="text/javascript">
	import {mapState,mapActions} from 'vuex'
	export default {
		name: "editSource",
		data () {
			return {
				uploadForm: {
					title: '',
					filetype:'word',
					type: '必修课',
					summary: '',
					course: '',
					file: [],
					picUrl: ''
				},
				filename: '',
				rules: {

				}
			}
		},
		computed: {
			...mapState(['isLoading','courses','user']),
		},
		created () {
			if (this.courses.length == 0) {
				this.getCourses();
			}
		},
		methods: {
			getFile(response,file) {
				this.filename = response.data;
			},
			submit() {
				if (this.isLoading) {
					var form = document.getElementById('uploadForm');
					var formData = new FormData(form);
					var current = new Date();
					formData.append('courseId',this.uploadForm.course);
					formData.append('author',this.user.sid);
					formData.append('createDate',current);
					formData.append('fileUrl',this.filename);
				 	this.saveArticle(formData)
				 	.then(result =>{
				 		if (result.code === 100) {
							this.$router.push({path: '/article'});
						}else {
							alert(result.msg);
						}
						
				 	});
					
				}else {
					alert('请先登录账号！');
					this.$router.push({path:'/login'});
				}	
			},
			...mapActions(['getCourses','getCourseByMajor','saveArticle'])
		} 
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.uploadAritle {
		margin-top: 30px;
	}
	
</style>