<template>
	<div class="studentEdit">
		<div class="actionBar">
			<router-link class="pull-left breadcrumb" :to= "{path: '/console/studentManage'}">学生管理</router-link>
			<span class = "pull-left">/</span>
			<router-link  class="pull-left breadcrumb" :to= "{path: '/console/studentEdit'}">修改增加</router-link>
		</div>
		<el-form :model="updateUserForm" :rules="rules" ref="updateUserForm" label-width="100px" id="uploadUpdate" v-on:submit.prevent>
			<el-form-item label="学号" prop="sid">
        <el-input v-model="updateUserForm.sid" name="sid" placeholder="学生学号"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="username">
        <el-input v-model="updateUserForm.username" name="username" placeholder="学生姓名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="updateUserForm.password" name="password" placeholder="登录密码"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
      	<el-select v-model="updateUserForm.sex" name="sex" placeholder="请选择性别">
					<el-option value="男">男</el-option>
					<el-option value="女">女</el-option>
				</el-select>
      </el-form-item>
      <el-form-item label="年级" prop="grade">
        <el-input v-model="updateUserForm.grade" name="grade"></el-input>
      </el-form-item>
      <el-form-item label="班级" prop="class">
        <el-input v-model="updateUserForm.Class" name="Class"></el-input>
      </el-form-item>
      <el-form-item label="学院" prop="collegeId">
      	<el-select v-model="updateUserForm.collegeId" placeholder="学院" filterable>
					<el-option v-for="college in colleges" :value="college.collegeId" :label="college.collegeName"></el-option>
				</el-select>
      </el-form-item>
      <el-form-item label="专业" prop="majorId">
      	<el-select v-model="updateUserForm.majorId" placeholder="专业" filterable>
					<el-option v-for="major in majors" :value="major.majorId" :label="major.majorName"></el-option>
				</el-select>
      </el-form-item>
    	<el-form-item label="电话" prop="tel">
        <el-input v-model="updateUserForm.tel" name="tel" placeholder="请填写电话号码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="updateUserForm.email" name="email" placeholder="请填写常用邮箱"></el-input>
      </el-form-item>
      <el-form-item label="QQ" prop="QQ">
        <el-input v-model="updateUserForm.qq" name="qq" placeholder="请填写QQ账号"></el-input>
      </el-form-item>
      <el-form-item label="头像">
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
				updateUserForm: {
					sid: '',
					username: '',
					password: '',
					sex: '',
					collegeId: '',
					majorId: '',
					grade: '',
					Class: '',
					tel: '',
					qq: '',
					email: '',
				
				},
				picUrl: '',
				rules: {}
			}
		},
		computed: {
			...mapState(['colleges','majors','courses','user','updateInfo'])
 		},
		created () {
			if (this.$route.query.userId) {
				this.getUserById({id: this.$route.query.userId,isTeacher:0});	
				this.updateUserForm = {
					sid: this.updateInfo.sid ? this.updateInfo.sid : '',
					username: this.updateInfo.username ? this.updateInfo.username : '',
					password: this.updateInfo.password ? this.updateInfo.password : '',
					sex: this.updateInfo.sex ? this.updateInfo.sex : '',
					collegeId: this.updateInfo.collegeId ? this.updateInfo.collegeId : '',
					majorId: this.updateInfo.majorId ? this.updateInfo.majorId : '',
					grade: this.updateInfo.grade ? this.updateInfo.grade : '',
					Class: this.updateInfo.class ? this.updateInfo.class : '',
					tel: this.updateInfo.tel ? this.updateInfo.tel : '',
					email: this.updateInfo.email ? this.updateInfo.email : '',
					qq: this.updateInfo.qq ? this.updateInfo.qq : ''
				},
				this.picUrl = this.picNew ? this.picNew : this.updateInfo.portrait ? this.updateInfo.portrait : '';
			}
			if (this.colleges.length == 0) {
				this.getColleges();
			}
			if(this.majors.length == 0) {
				this.getMajors();
			}
		},
		methods: {
			...mapActions(['getColleges','getMajors','getMajorByColege','getCourses','getCourseByMajor','saveUser','updateUser','getUserById']),
			getPic (response,file) {
				this.picNew = response.data;
			},
			submit() {
				 this.$confirm('此操作将永久删除该学生信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	var form = document.getElementById('uploadUpdate');
					var formData = new FormData(form);
					formData.append('portrait',this.picUrl);
					formData.append('majorId',this.updateUserForm.majorId);
					formData.append('collegeId',this.updateUserForm.collegeId);
					formData.append('isTeacher',0);
					if (this.$route.query.userId) {
						this.updateUser(formData)
						.then(result => {
							if (result.code === 100) {
								alert(result.msg);
								this.$router.push({path: '/console/studentManage'});
							}else {
								alert(result.msg);
							}
						});
					}else {
						this.saveUser(formData)
						.then(result => {
							if (result.code === 100) {
								this.$router.push({path: '/console/studentManage'});
							}else {
								alert(result.msg);
							}
						});
					}
        });
			},
			getPic (response,file) {
				this.picUrl = response.data;
			}
		},
		watch: {
			college () {
				if (this.college) {
					this.getMajorByColege({collegeId: this.college});
				}
			}
		} 
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.studentEdit {
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