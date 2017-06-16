<template>
	<div class="about_index">
		<div class="panel_active">
			<div class="panel_header">
				<div class="el-col el-col-4">
					<h5 class="panel_header_title">贡献曲线</h5>
				</div>
				<!-- <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10 options">
					<a class="btn btn-default" href="javascript:;">提问</a>
					<a class="btn btn-default" href="javascript:;">回答</a>
					<a class="btn btn-default" href="javascript:;">上传资源</a>
				</div> -->
			</div>
			<div class="panel_content">
				<ECharts :options="dataObj"></ECharts>
			</div>
		</div>
		<div class="panel_active">
			<div class="panel_header">
				<h5 class="panel_header_title">回答列表</h5>
			</div>
			<div class="panel_content">
				<ol class="el-menu">
					<li class="el-menu-item" v-for="answer in answers">
						<router-link :to="{path: '/Tdetail',query: {questionId: answer.questionId}}">
						{{answer.question}}
						<span>&nbsp;&nbsp;{{answer.answerDate}}</span>
						<span class="pull-right">
							<i class="fa fa-thumbs-up fa-x" style="color: #34AC81">&nbsp;&nbsp;{{answer.praise}}</i>
						</span>
						</router-link>	
					</li>
				</ol>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {mapState,mapActions} from 'vuex'
	import ECharts from 'vue-echarts'
	export default {
		name: 'about_index',
		data () {
			return {
				info: {},
				dataObj: {}
			}
		},
		components: {
			ECharts
		},
		computed: {
			...mapState(['items','topicLists','answers','topicCount','answerCount','sourceCount']),
			dataObj () {
				return {
					tooltip: {
				    trigger: 'item',
				    formatter: '{a} <br/>{b} : {c} ({d}%)'
				  },
				  legend: {
				    orient: 'vertical',
				    left: 'left',
				    data: ['提问', '回答', '上传资源']
				  },
				  series: [
				    {
				      name: '次数',
				      type: 'pie',
				      radius: '70%',
				      center: ['70%', '60%'],
				      data:[
				        {value: this.topicCount, name: '提问'},
				        {value: this.answerCount, name: '回答'},
				        {value: this.sourceCount, name: '上传资源'},
				      ],
				      itemStyle: {
				        emphasis: {
				          shadowBlur: 10,
				          shadowOffsetX: 0,
				          shadowColor: 'rgba(0, 0, 0, 0.5)'
				        }
				      }
				    }
				  ]
				}
			}
		},
		methods: {
			...mapActions(['getAnswerListById','getQuestionListById'])
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" type="text/css"></style>