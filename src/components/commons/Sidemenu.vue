<template>
	<div class="sidemenu">
		<!-- <ul class="list-group">
			<li class="list-group-item sidebar-title" v-if="items.title">{{items.title}}</li>
			<li class="list-group-item" v-for="(item,index) in items.childrens" :class="index === active ? 'sidebar-active' : ''">
				<div v-if="item.childrens" @click="toggle">
					<router-link :to="{path: item.path}">{{item.name}}</router-link>
					<ul v-show="show" class="list-group-item-item">
						<li v-for="child in item.childrens" class="list-group-item"><router-link :to="{path: child.path}">{{child.name}}</router-link></li>
					</ul>
				</div> 
				<div v-else>
					<router-link :to="{path: item.path}">{{item.name}}</router-link>	
				</div>
			</li>
		</ul> -->
		<el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" v-for="item in items.childrens">
			<el-submenu v-if="item.childrens" :index="item.index">
				<template slot="title">{{item.name}}</template>
				<el-menu-item v-for="child in item.childrens" :index="child.index">
					<router-link :to="{path: child.path}">{{child.name}}</router-link>
				</el-menu-item>
			</el-submenu>	
			<el-menu-item v-else :index="item.index">
				<router-link :to="{path: item.path}">{{item.name}}</router-link>
			</el-menu-item>
		</el-menu>
	</div>
</template>
<script type="text/javascript">
	import {mapActions} from 'vuex'

	export default {
		name: 'sideMenu',
		props: ['list'],
		data () {
			return {
				items: this.list,
				show: true,
				active: 0,
				selected: ''
			}
		},
		methods: {
			 handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.sidemenu{
		.sidebar-title{
			background-color: #34AC81;
			color: #ffffff;
			font-size: 16px;
			font-weight: bold;
		}
		li{
	    a{
	    	display: block;
	      text-decoration: none;
	      color: #000000;
	    }
	    &:hover{
	      background-color: #34AC81;
	      a{
	        color: #ffffff;
	      }
	    }
	    .list-group-item-item {
	    	margin: 10px -15px -10px -15px;
	    	li {
	    		border-left-width: 0px;
	    		border-right-width: 0px;
	    		background-color: #f6f6f6;
	    		color: #000000;
	    		&:last-child {
	    			border-bottom-width: 0px;
	    		}
	    		a{
			    	display: block;
			      text-decoration: none;
			      color: #34AC81;
			    }
			    &:hover{
			      background-color: #ffffff;
			      a{
			        color: #34AC81;
			      }
			    }
	    	}
	    }
	  }
	  .sidebar-active {
	    	background-color: #34AC81;
	      border-color: #34AC81;
	      a{
	        color: #ffffff;
	      }
	    }
	}
</style>