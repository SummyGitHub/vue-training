<template>
	<div class="tab">
		<el-tabs v-model="currentTab" @tab-click="tiggerTab">
			<el-tab-pane v-for="tab in tabs" :label="tab.tabName" :name="tab.index"></el-tab-pane>
		</el-tabs>
	</div>
</template>
<script type="text/javascript">
	import {mapState,mapActions} from 'vuex'
	export default {
		name: 'tab',
		props: ['tabNames','viewContent'],
		data () {
			return {
				tabs : this.tabNames,
				views : this.viewContent,
				activeName: 1
			}
		},
		computed: {
			...mapState(['currentTab'])
		},
		methods: {
			tiggerTab (tab) {
				console.log(tab.label);
				this.setCurrentTab(tab.name)
			},
			...mapActions(['setCurrentTab'])
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" type="text/css">
	.tab {
		.nav-tabs {
			a {
				color: #000000;
			}
		}
	}
</style>