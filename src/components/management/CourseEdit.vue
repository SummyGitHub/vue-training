<template>
	<div class="courseEdit">
		<el-form :model="updateCourseForm" :rules="rules" ref="updateCourseForm" label-width="100px" id="updateCourseForm" v-on:submit.prevent>
			<el-form-item label="课程编码" prop="courseCode">
        <el-input v-model="updateCourseForm.courseCode" name="courseCode"></el-input>
      </el-form-item>
      <el-form-item label="课程名称" prop="courseName">
        <el-input v-model="updateCourseForm.courseName" name="courseName" placeholder="课程名称"></el-input>
      </el-form-item>
      <el-form-item label="课程类型" prop="type">
      	<el-select v-model="updateCourseForm.type" name="type" placeholder="请选择资源类型">
					<el-option value="必修课">必修课</el-option>
      		<el-option value="专业选修课">专业选修课</el-option>
      		<el-option value="公共选修课">公共选修课</el-option>
				</el-select>
      </el-form-item>
    <!--   <el-form-item label="专业" prop="majorId">
      	<el-select v-model="updateCourseForm.majorId" placeholder="专业" filterable>
					<el-option  v-for="major in majors" :value="major.majorId" :label="major.majorName"></el-option>
				</el-select>
      </el-form-item>  -->
      <el-form-item label="课程说明" prop="info">
      	<el-input type="textarea" v-model="updateCourseForm.info" name="info" placeholder="课程的详细介绍"></el-input>
      </el-form-item>  
      <el-form-item label="图片">
				<el-upload class="avatar-uploader" action="/api/savePic" :show-file-list="false" name="pic" :on-success="getPic">
				  <img v-if="picUrl" :src="picUrl" class="avatar">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item> 
      <el-form-item>
      	<el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
		</el-form>
	</div>
</template>
<script type="text/javascript">
	import {mapState,mapActions} from 'vuex'
	export default {
		name: "studentEdit",
		data () {
			return {
				updateCourseForm: {
					majorId: '',
					courseCode: '',
					courseName: '',
					info: '',
					type: ''
				},
				picUrl: '',
				rules: {}
			}
		},
		computed: {
			...mapState(['majors','updateInfo'])
 		},
		created () {
			if (this.$route.query.courseId) {
				this.getCourseById({id: this.$route.query.courseId});	
				this.updateCourseForm = {
					courseCode: this.updateInfo.courseCode ? this.updateInfo.courseCode : '',
					courseName: this.updateInfo.courseName ? this.updateInfo.courseName : '',
					majorId: this.updateInfo.majorId ? this.updateInfo.majorId : '',
					info: this.updateInfo.info ? this.updateInfo.info : '',
					type: this.updateInfo.type ? this.updateInfo.type : ''
				}
				this.picUrl = this.updateInfo.img ? this.updateInfo.img : '';
			}
			if (this.majors.length == 0) {
				this.getMajors();
			}
		},
		methods: {
			submit() {
				var form = document.getElementById('updateCourseForm');
				var formData = new FormData(form);
				formData.append('img',this.picUrl);
				if (this.$route.query.userId) {
					this.updateCourse(formData)
					.then(result => {
						if (result.code === 100) {
							alert(result.msg);
							this.$router.push({path: '/console/coursesManage'});
						}else {
							alert(result.msg);
						}
					});
				}else {
					this.saveCourse(formData)
					.then(result => {
						if (result.code === 100) {
							this.$router.push({path: '/console/coursesManage'});
						}else {
							alert(result.msg);
						}
					});
				}
			},
			getPic (response,file) {
				this.picUrl = response.data;
			},
			...mapActions(['getMajors','getMajorByColege','getCourses','getCourseByMajor','saveCourse','updateCourse','getCourseById'])
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.courseEdit {
		.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	  }
	  .avatar-uploader .el-upload:hover {
	    border-color: #20a0ff;
	  }
	  .avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 178px;
	    height: 178px;
	    line-height: 178px;
	    text-align: center;
	  }
	  .avatar {
	    width: 178px;
	    height: 178px;
	    display: block;
	  }	
	}
	
</style>