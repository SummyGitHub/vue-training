<template>
	<div class="pager">
		<el-pagination layout="prev, pager, next" :page-count="totalPage" :current-page="curr" @current-change="changeCurr">
		</el-pagination>
	</div>
	
</template>
<script type="text/javascript">
	import {mapState} from 'vuex'
	export default {
		name: 'pager',
		props: ['pageSize'],
		data () {
			return {
				curr: 0,
				first: 1,
				totalPage: 0,
				isFirst: false,
				isEnd: false,
				link: this.$route.fullPath,
				total: []
			}
		},
		computed: {
			...mapState(['current','size']),
			curr () {
				return this.current;
			},
			totalPage () {
				return Math.ceil(this.size/this.pageSize);
			},
			
		},
		methods: {
			changeCurr(currentPage) {
				this.$router.push({path: this.$route.fullPath,query:{curr: currentPage}});
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	.pager {
		.el-pager{
			li{
				.active {
			    border-color: #34AC81;
			    background-color: #34AC81;
			    color: #fff;
			    cursor: default;
			  }
			}
		}
	}
	
</style>