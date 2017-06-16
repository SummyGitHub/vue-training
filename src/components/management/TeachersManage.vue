<template>
	<div class="teachersManage">
		<div class="actionBar">
			<span class="pull-left">教师管理</span>
			<router-link :to="{path: '/console/teacherEdit'}" class="btn pull-right">添加</router-link>
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
          <el-form-item label="工号">
            <span>{{ props.row.sid }}</span>
          </el-form-item>
          <el-form-item label="密码">
            <span>{{ props.row.password }}</span>
          </el-form-item>
          <el-form-item label="学院">
            <span>{{ props.row.collegeName }}</span>
          </el-form-item>
          <el-form-item label="职称">
            <span>{{ props.row.rank }}</span>
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
          </el-form-item label="教授课程">
          	<span v-for></span>
          </el-form>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="工号"
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
	export default {
		name: 'teachersManage',
		data () {
			return {
				pageSettings: {
					curr: this.$route.query.curr ? this.$route.query.curr : 1,
					size: 6
				},
			}
		},
		created () {
			this.getUsersByFilter({isTeacher: 1,curr:this.$route.query.curr ? this.$route.query.curr : 1,size: 6});
		},
		components: {
			pager
		},
		computed: {
			...mapState(['manageList'])
		},
		methods: {
			...mapActions(['getUsersByFilter','deleteUserById','saveUsersByGroup','getCoursesTeach']),
			delById (id) {
				this.deleteUserById(id)
				.then(result => {
					if (result.code == 100) {
						alert(result.msg);
						this.getUsersByFilter({isTeacher: 0,curr:this.pageSettings.curr,size: this.pageSettings.size});
						return;
					}
					alert(result.msg);
				});	
			},
			handleEdit (id,row) {
				this.$router.push({path: '/console/teacherEdit',query:{userId: row.id}})
			},
			clickInput () {
				document.getElementById('inputExcel').click();
			},
			submitUpload () {
				var form  = document.getElementById('inputExcel');
				var formData = new FormData(form);
				formData.append('file',form.files[0]);
				formData.append('isTeacher',1);
				this.saveUsersByGroup(formData)
				.then(result => {
					if (result.code == 100) {
						alert(result.msg);
						this.getUsersByFilter({isTeacher: 0,curr:1,size: 6});
						return;
					}
					alert(result.msg);
				});
			}
		},
		watch: {
			$route () {
				this.getUsersByFilter({isTeacher: 1,curr:this.$route.query.curr ? this.$route.query.curr : 1,size: 6})
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	@import "../../style/management.common";
</style>