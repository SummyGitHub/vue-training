<template>
	<header>
		<el-col :xs="24" :sm="22" :md="22" :lg="22" :offset="1">
			<div class="header_main">
				<nav>
					<h1 class="pull-left">{{title}}</h1>
					<template v-if="!_isAdmin">
						<ul class="pull-right">
							<router-link class="navItem" :to="tab.href" tag="li" v-for="(tab,index) in tabs.user">
								<a>{{tab.name}}</a>
							</router-link>
							<li class="pull-right portrait" v-if="_isLoading">
								<div><img style="width: 30px;height:30px;border-radius:30px" v-bind:src="user.portrait"></div>
								<ul class="userList" v-show="show">
									<li><router-link :to="{path: '/about',query: {userId: user.sid}}">个人信息</router-link></li>
									<li><router-link :to="{path: '/updateInfo',query: {userId: user.sid}}">修改密码</router-link></li>
									<li><a href="javascript:;" @click="quit">退出</a></li>
								</ul>
							</li>
							<li class="pull-right" v-else>
								<router-link to="/login" style="color: #ffffff;text-decoration:none">登录</router-link>
							</li>
						</ul>
					
					</template>
					<template v-else>
						<li class="pull-right"><a href="javascript:;" style="color: #ffffff;" @click="quit">退出</a></li></li>
					</template>	
				</nav>
			</div>	
		</el-col>
		
	</header>
	
</template>
<script type="text/javascript">
	import {mapState,mapActions} from 'vuex'
	export default {
		name: 'myHeader',
		props: ['name'],
		computed: {
			...mapState(['isLoading','isAdmin','user']),
			_isAdmin () {
				return this.isAdmin || (window.sessionStorage.length>0 && window.sessionStorage.isAdmin);
			},
			_isLoading () {
				return this.isLoading || (window.sessionStorage.length > 0 && window.sessionStorage.isLoading);
			}
		},
		data () {
			return {
				title: this.name,
				activeIndex: 0,
				tabs: {
					user: [
						{name: '首页',href: '/home'},
						{name: '资源天地',href: '/article'},
						{name: '讨论天地',href: '/topic'},
					]
				},
				show: true,
				_isAdmin: false,
				_isLoading: false
			}
		},
		methods: {
			...mapActions(['signOut']),
			quit () {
				this.signOut();
				this.$router.push('/');
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" type="text/css">
	$color: #34AC81;
	header{
		position: fixed;
		left: 0px;
		top: 0px;
		height: 60px;
		width: 100%;
		line-height: 60px;	
		z-index: 1000;
		background-color: $color;
		.header_main {
			overflow: hidden;
			nav {
				h1 {
					color: #ffffff;
					font-size: 22px;
					font-weight: normal;
				}
				li {
					list-style: none;
				}
				.navItem{
					height: 40px;
					float: left;
					a{
						display: inline-block;
						height: 60px;
						margin: 0 12px;
						cursor: pointer;
						&:hover,&:link,&:active,&:visited {
							color: #ffffff;
							text-decoration: none;
						}
					}
					.router-link-active{
						border-bottom: 2px solid #ffffff;
					}
				}
				.portrait {
					position: relative;
					line-height: 0px;
					div {
						display: inline-block;
						width: 30px;
						height: 30px;
						margin-top: 15px;
						border-radius: 30px;
						img {
							width: 100%;
							overflow: hidden;
						}
					}
					.userList {
						position: fixed;
						display: none;
						top: 47px;
						right: 53px;
						padding: 5px 0;
						overflow: hidden;
						background-color: #ffffff;
						z-index: 9999;
						border-radius: 3px;
						border: 1px solid rgba(0,0,0,.15);
						box-shadow: 0 6px 12px rgba(0,0,0,.175);
						background-clip: padding-box;
						li {
							width: 100%;
							overflow: hidden;
							display: block;
							a {
								display: block;
								padding: 0px 10px;
								line-height: 36px;
								color: $color;
								text-decoration: none;
							}
						}
					}
					&:hover {
						.userList {
							display: block;
						}
					}
				}
			}
		}
		
	}
</style>