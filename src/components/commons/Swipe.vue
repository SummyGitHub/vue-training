<template>
	<div class="swipe">
		<div class="wrapper">
			<!-- <div class="banner">
				<div id="carousel-example-generic" class="carousel slide">
					<ol class="carousel-indicators">
						<li v-for="(item,index) in picObj.items" :class="{'active' : toActive === index}"></li>
					</ol>		
					<div class="carousel-inner">
						<div class="item" v-for="(item,index) in picObj.items" :class="{'active' : toActive === index}">
							<img :src="item">
						</div>
					</div>	
					<a class="left carousel-control" href="javascript:;">&lt;</a>
					<a class="right carousel-control" href="javascript:;">&gt;</a>
				</div>
			</div> -->
			  <div class="block">
			    <el-carousel trigger="click" height="400px">
			      <el-carousel-item v-for="item in picObj.items">
			        <img :src="item">
			      </el-carousel-item>
			    </el-carousel>
			  </div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		name: "swipe",
		props: ['picObj'],
		data () {
			return {
				toActive: 0,
				playStatus: ''
			}
		},
		mounted () {
			this.autoPlay()
		},
		methods: {
			autoPlay () {
				let _self = this;
				this.playStatus = setInterval(function () {
					if (_self.toActive === 2) {
						_self.toActive = 0;
					}else {
						_self.toActive ++;
					}
				}, 2000);		
			},
			stopPlay () {
				clearInterval(this.playStatus);
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.wrapper {
		background-color: #f6f6f6;
		.carousel-control {
			display: block;
			position: absolute;
			width: 49px;
			height: 78px;
			top: 50%;
			bottom: 0;
			margin-top: -20px;
			line-height: 78px;
			font-size: 24px;
			color: #ffffff;
			text-align: center;
			text-decoration: none;
			background-color: rgba(0,0,0,0.2);		
		}
		.carousel-indicators li{
			margin-right: 20px;
		}
		.left {
			margin-left: 30px;
		}
		.right {
			right: 0;
			margin-right: 30px;
		}
	}
</style>