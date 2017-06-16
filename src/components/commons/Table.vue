<template>
	<el-table :data="tableData" border style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
    	<el-table-column v-for="caption in captions" prop="date" label="caption.name" sortable :width="caption.width">
    </el-table-column>
    </el-table>
</template>
<script type="text/javascript">
	import {mapState} from 'vuex'
	export default {
		name: 'table',
		props: ['tableData','captions'],
		data () {
			return {
				
			}
		},
		computed: {
			
		},
		methods: {
			
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
	
	
</style>