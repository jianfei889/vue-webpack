<template>
<div class="app-container">


<!-- 顶部header区域 -->
    <mt-header fixed title="blibli:是jian飞啊"  id="fixed-header">
		<span slot="left" >
			<mt-button v-show="flag" icon="back" @click="goBack" class="backBtn">返回</mt-button>
		</span>
	</mt-header> 

 

 <!-- 中间路由的router-view区域全部添加动画 -->
<transition >
		<router-view></router-view>
</transition>






<!-- 底部Tabar区域 -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item2 " to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item2" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item2" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{totalcount}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item2" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>



</div>
</template>


<script>

import {mapGetters} from 'vuex'



export default{
	data(){
		return{
			flag:true

		}
	},

	methods:{
		goBack(){
			this.$router.go(-1)
			// console.log(this)
		}
	},

	created(){
		if(this.$route.path==="/home"){
			this.flag = false
		}else{
			this.flag= true
		}
	},

	watch:{
		//注意这里是$route,不是$router
		'$route.path':function(newval,oldval){
			if(newval==='/home'){//返回按钮
				this.flag=false
			}else{
				this.flag=true
			}
		}

	},
	computed:{
		...mapGetters(["totalcount"])
	}
	



}

</script>



<style scoped>



    .app-container{
        padding-top:40px;
        padding-bottom:50px;
		overflow-x: hidden;
		position: relative;
    }

	
	
/* 底部 tabbar 栏的样式 */
	.mui-active{
		background-color:#eee;
	}
	.mui-bar-tab .mui-tab-item2.mui-active {
		color: orange;
	}


/* 组件切换动画 */
	.v-enter{
		opacity: 0;
		transform: translateX(100%);
	}
	.v-leave-to{
		opacity: 0;
		transform: translateX(-100%);
		position: absolute;
	}
	

	.v-enter-active,.v-leave-active{
		transition: all .5s ease;
	}

/* 改类名为己用，解决tabber无法切换的问题 */
	.mui-bar-tab .mui-tab-item2 {
		display: table-cell;
		overflow: hidden;
		width: 1%;
		height: 50px;
		text-align: center;
		vertical-align: middle;
		white-space: nowrap;
		text-overflow: ellipsis;
		color:#929292;
		text-decoration: none;
	}

	.mui-bar-tab .mui-tab-item2 .mui-icon {
		top: 3px;
		width: 24px;
		height: 24px;
		padding-top: 0;
		padding-bottom: 0;
		text-decoration: none;
	}

	.mui-bar-tab .mui-tab-item2 .mui-icon~.mui-tab-label {
		font-size: 11px;
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		text-decoration: none;
	}

	.mint-header{
		font-size: 18px;
	}
	


/* 滑块导航条会和header混合--》样式 */
	.mint-header.is-fixed {
		z-index: 20200516;
	}

	.backBtn{
		margin-top: 9px;
		font-size: 15px !important;
	}


</style>
















