<template>
	<div class="coursesManage">
		<div class="actionBar">
			<span class="pull-left">课程管理</span>
			<router-link :to="{path: '/console/courseEdit'}" class="btn pull-right">添加</router-link>
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
          <el-form-item label="图片">
            <img class="item_portrait" :src="props.row.img"></img>
          </el-form-item>
          <el-form-item label="课程编码">
            <span>{{ props.row.courseCode }}</span>
          </el-form-item>
          <el-form-item label="课程名称">
            <span>{{ props.row.courseName }}</span>
          </el-form-item>
          <el-form-item label="课程类型">
            <span>{{ props.row.type }}</span>
          </el-form-item>
          <el-form-item label="所属学院">
            <span>{{ props.row.collegeName }}</span>
          </el-form-item>
          
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="课程编码"
      prop="courseCode">
    </el-table-column>
    <el-table-column
      label="课程名称"
      prop="courseName">
    </el-table-column>
    <el-table-column
    	label="课程类型"
    	prop="type">
    </el-table-column>
    <el-table-column
    	label="所属学院"
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
		name: 'coursesManage',
		data () {
			return {
				pageSettings: {
					curr: this.$route.query.curr ? this.$route.query.curr : 1,
					size: 6
				}
			}
		},
		created () {
			this.getCoursesByFilter(this.pageSettings)
		},
		components: {
			pager
		},
		computed: {
			...mapState(['manageList'])
		},
		methods: {
			...mapActions(['getCoursesByFilter','deleteCourseById','saveCoursesByGroup']),
			delById (id) {
				this.deleteCourseById(id)
				.then(result => {
					if (result.code == 100) {
						alert(result.msg);
						this.getUsersByFilter({isTeacher: 0,curr:1,size: 6});
						return;
					}
					alert(result.msg);
				});
			},
			handleEdit (id,row) {
				this.$router.push({path: '/console/courseEdit?',query:{courseId: row.courseId}})
			},
			clickInput () {
				document.getElementById('inputExcel').click();
			},
			submitUpload () {
				var form  = document.getElementById('inputExcel');
				var formData = new FormData(form);
				formData.append('file',form.files[0]);
				this.saveCoursesByGroup(formData)
				.then(result => {
					if (result.code == 100) {
						alert(result.msg);
						this.getCoursesByFilter({curr:1,size: 6});
						return;
					}
					alert(result.msg);
				});
			}
		},
		watch: {
			$route () {
				this.getCoursesByFilter({curr:this.$route.query.curr ? this.$route.query.curr : 1,size: 6})
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	@import "../../style/management.common";
	.coursesManage {
		.manageList {
			.table-item {
				td {
					line-height: 28px;
				}
			}
			
		}
	}
</style>