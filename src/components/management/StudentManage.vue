<template>
	<div class="studentsManage">
		<div class="actionBar">
			<span class="pull-left">学生管理</span>
			<router-link :to="{path: '/console/studentEdit'}" class="btn pull-right">添加</router-link>
			<a href="javascript:;" class="btn pull-right" @click="clickInput">批量添加</a>
			<form @submit.prevent id="uploadExcel">
				<input type="file" name="excel" accept="application/vnd.ms-excel" id="inputExcel" class="inputExcel" @change="submitUpload">
			</form>
		</div>
		<el-table
    :data="manageList"
    style="width: 100%;height: 440px;margin-bottom: 15px">
    <el-table-column type="expand">
      <template scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="头像">
            <img class="item_portrait" :src="props.row.portrait"></img>
          </el-form-item>
          <el-form-item label="姓名">
            <span>{{ props.row.username }}</span>
          </el-form-item>
          <el-form-item label="学号">
            <span>{{ props.row.sid }}</span>
          </el-form-item>
          <el-form-item label="密码">
            <span>{{ props.row.password }}</span>
          </el-form-item>
          <el-form-item label="学院">
            <span>{{ props.row.collegeName }}</span>
          </el-form-item>
          <el-form-item label="专业">
            <span>{{ props.row.majorName }}</span>
          </el-form-item>
          <el-form-item label="年级">
            <span>{{ props.row.grade }}级</span>
          </el-form-item>
          <el-form-item label="班级">
          	<span>{{ props.row.class}}班</span>
          </el-form-item>
          <el-form-item label="邮箱">
          	<span>{{ props.row.email}}</span>
          </el-form-item>
          <el-form-item label="QQ">
          	<span>{{ props.row.qq}}</span>
          </el-form-item>
          <el-form-item label="电话">
          	<span>{{ props.row.tel}}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="学号"
      prop="sid">
    </el-table-column>
    <el-table-column
      label="姓名"
      prop="username">
    </el-table-column>
    <el-table-column
      label="学院"
      prop="collegeName">
    </el-table-column>
    <el-table-column
    	label="专业"
    	prop="majorName">
    </el-table-column>
    <el-table-column
    	label="操作">
    	 <template scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="delById(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  	</el-table>
		<pager class="pull-right pageClass" :pageSize="pageSettings.size"></pager>
	</div>
</template>
<script>
	import pager from '../commons/Pager'
	import {mapState,mapGetters,mapActions} from 'vuex'
	import utils from '../../assets/js/public.js'
	export default {
		name: 'studentsManage',
		data () {
			return {
				pageSettings: {
					curr: this.$route.query.curr ? this.$route.query.curr : 1,
					size: 10
				},
				file: {}
			}
		},
		created () {
			this.getUsersByFilter({isTeacher: 0,curr:this.pageSettings.curr,size: this.pageSettings.size})
		},
		components: {
			pager
		},
		computed: {
			...mapState(['manageList'])
		},
		methods: {
			...mapActions(['getUsersByFilter','deleteUserById','saveUsersByGroup']),
			delById (id,row) {
				console.log('sss');
				 this.$confirm('此操作将永久删除该学生信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	this.deleteUserById(row.sid)
					.then(result => {
						if (result.code == 100) {
							this.$message({
		            type: 'success',
		            message: '删除成功!'
		          });
							this.getUsersByFilter({isTeacher: 0,curr:1,size: 10});
							return;
						}else {
							this.$message({
		            type: 'danger',
		            message: '删除失败!'
		          });
						}
					});
        }).catch(() => {
          this.$message({
            type: 'success',
            message: '已取消删除'
          });          
        });
				
			},
			handleEdit (id,row) {
				this.$router.push({path: '/console/studentEdit',query:{userId: row.id}})
			},
			clickInput () {
				document.getElementById('inputExcel').click();
			},
			submitUpload () {
				var form  = document.getElementById('inputExcel');
				var formData = new FormData(form);
				formData.append('file',form.files[0]);
				formData.append('isTeacher',0);
				this.saveUsersByGroup(formData)
				.then(result => {
					if (result.code == 100) {
						this.$message({
	            type: 'success',
	            message: result.msg
	          });
						this.getUsersByFilter({isTeacher: 0,curr:1,size: 6});
						return;
					}else {	
						this.$message({
	            type: 'danger',
	            message: result.msg
	          }); 
					}
				});
			}
		},
		watch: {
			$route () {
				this.getUsersByFilter({isTeacher: 0,curr:this.$route.query.curr ? this.$route.query.curr : 1,size: 6})
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" type="text/css">
	@import "../../style/management.common";
	
</style>