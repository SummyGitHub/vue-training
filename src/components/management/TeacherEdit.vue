<template>
	<div class="teacherEdit">
		<div class="actionBar">
			<router-link class="pull-left breadcrumb" :to= "{path: '/console/teacherManage'}">教师管理</router-link>
			<span class = "pull-left">/</span>
			<router-link  class="pull-left breadcrumb" :to= "{path: '/console/teacherEdit'}">修改增加</router-link>
		</div>
		<el-form :model="updateTeacherForm" :rules="rules" ref="updateTeacherForm" @expand="click(scope.$row)" label-width="100px" id="updateTeacherForm" v-on:submit.prevent>
			<el-form-item label="工号" prop="sid">
        <el-input v-model="updateTeacherForm.sid" name="sid" placeholder="工号"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="username">
        <el-input v-model="updateTeacherForm.username" name="username" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="updateTeacherForm.password" name="password" placeholder="登录密码"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
      	<el-select v-model="updateTeacherForm.sex" name="sex" placeholder="请选择性别">
					<el-option value="男">男</el-option>
					<el-option value="女">女</el-option>
				</el-select>
      </el-form-item>
      <el-form-item label="职称" prop="rank">
      	<el-input v-model="updateTeacherForm.rank" name="rank" placeholder="职称"></el-input>
      </el-form-item>
      <el-form-item label="学院" prop="collegeId">
      	<el-select v-model="updateTeacherForm.collegeId" placeholder="学院" filterable>
					<el-option v-for="college in colleges" :value="college.collegeId" :label="college.collegeName"></el-option>
				</el-select>
      </el-form-item>
    	<el-form-item label="电话" prop="tel">
        <el-input v-model="updateTeacherForm.tel" name="tel" placeholder="请填写电话号码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="updateTeacherForm.email" name="email" placeholder="请填写常用邮箱"></el-input>
      </el-form-item>
      <el-form-item label="QQ" prop="QQ">
        <el-input v-model="updateTeacherForm.qq" name="qq" placeholder="请填写QQ账号"></el-input>
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
		name: "teacherEdit",
		data () {
			return {
				updateTeacherForm: {
					sid: '',
					username: '',
					password: '',
					sex: '男',
					collegeId: '',
					rank: '',
					tel: '',
					qq: '',
					email: '',
					portrait: ''
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
				this.getUserById({id: this.$route.query.userId,isTeacher:1});	
				this.updateTeacherForm = {	
					sid: this.updateInfo.sid ? this.updateInfo.sid : '',
					username: this.updateInfo.username ? this.updateInfo.username : '',
					password: this.updateInfo.password ? this.updateInfo.password : '',
					sex: this.updateInfo.sex ? this.updateInfo.sex : '',
					collegeId: this.updateInfo.collegeId ? this.updateInfo.collegeId : '',
					rank: this.updateInfo.rank ? this.updateInfo.rank : '',
					tel: this.updateInfo.tel ? this.updateInfo.tel : '',
					email: this.updateInfo.email ? this.updateInfo.email : '',
					qq: this.updateInfo.qq ? this.updateInfo.qq : ''
				},
				this.picUrl = this.updateInfo.portrait ? this.updateInfo.portrait : ''
			}
			if (this.colleges.length == 0) {
				this.getColleges();
			}
		},
		methods: {
			...mapActions(['getColleges','getMajors','getMajorByColege','getCourses','getCourseByMajor','saveUser','updateUser','getUserById']),
			submit() {
				var form = document.getElementById('updateTeacherForm');
				var formData = new FormData(form);
				formData.append('isTeacher',1);
				formData.append('collegeId',this.updateTeacherForm.collegeId);	
				formData.append('portrait',this.picUrl);
				if (this.$route.query.userId) {
					this.updateUser(formData)
					.then(result => {
						if (result.code === 100) {
							alert(result.msg);
							this.$router.push({path: '/console/teacherManage'});
						}else {
							alert(result.msg);
						}
					});
				}else {
					this.saveUser(formData)
					.then(result => {
						if (result.code === 100) {
							this.$router.push({path: '/console/teacherManage'});
						}else {
							alert(result.msg);
						}
					});
				}
			},
			getPic (response,file) {
				this.picUrl = response.data;
			},

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
	.teacherEdit {
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