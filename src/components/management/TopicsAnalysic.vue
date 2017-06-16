<template>
	<div class="topicsA">
		<div class="actionBar">
			<router-link class="pull-left breadcrumb" :to= "{path: '/console/topicsManage'}">问题管理</router-link>
			<span class = "pull-left">/</span>
			<router-link  class="pull-left breadcrumb" :to= "{path: '/console/topicsAnalysic'}">问题统计</router-link>
			<a class="pull-right" href="javascript:;" @click="weekly">最近一周</a>
			<a class="pull-right" href="javascript:;" @click="mouthly">最近一月</a>
			<a class="pull-right" href="javascript:;" @click="yearly">最近一年</a>
		</div>
		<div class="panel_content">
			<ECharts :options="dataObj" theme="green"></ECharts>
		</div>
	</div>
</template>
<script type="text/javascript">
	import ECharts from 'vue-echarts'
	import {mapState,mapActions} from 'vuex'

	export default {
		data () {
			return {
				dataObj: {}
			}
		},
		components: {
			ECharts
		},
		mounted () {
			this.weekly();
		},
		computed: {
			...mapState(['labels','datasets']),
			dataObj () {
				return {
					tooltip: {},
					color: ['#34AC81'],
				  legend: {
				    data:['次数'],
				    left: 200,
				    itemWidth: 50
				  },
				  grid: {
				  	left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true,
				  	width: 600
				  },
				  xAxis: {
				    data: this.labels
				  },
				  yAxis: {
				    axisLabel: {show: true}
				  },
				  series: [{
				    name: '次数',
				    type: 'bar',
				    barWidth: '30',
				    data: this.datasets,
				  }],
				  width: "400"
				}
			}
		},
		methods: {
			...mapActions(['getWeeklyTopicResult','getMouthlyTopicResult','getYearlyTopicResult']),
			weekly () {
				this.getWeeklyTopicResult()
			},
			mouthly () {
				this.getMouthlyTopicResult();
			},
			yearly () {
				this.getYearlyTopicResult();
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" type="text/css">
	.panel_active {
				border: 1px solid #dddddd;
				margin-bottom: 20px;
				.panel_header {
					overflow: hidden;
					padding: 10px 15px;
					background-color: #f6f6f6;
					border-bottom: 1px solid #dddddd;
	    		border-top-right-radius: 2px;
	    		border-top-left-radius: 2px;
	    		.options {
	    			text-align: right;
	    		}
				}
				.panel_content {
					padding: 15px;
					min-height: 250px;
					li {
						border-bottom: 1px dashed #dddddd;
						a {
							span {
								display: inline-block;
							}
						}
					}
				}
			}
</style>