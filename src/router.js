import Vue from 'vue'
import VueRouter from 'vue-router'//1.导入 VueRouter依赖包
Vue.use(VueRouter)//2.手动安装 VUeRouter


import  home from './components/tabbar/home.vue'//导入路由底部四个模块
import  search from './components/tabbar/search.vue'//导入底部四个路由模块
import  shopcar from './components/tabbar/shopcar.vue'//导入底部四个路由模块
import  member from './components/tabbar/member.vue'//导入底部四个路由模块
import  newsList from './components/news/newsList.vue'//新闻资讯 路由模块
import  newsInfo from './components/news/newsInfo.vue'//新闻资讯--新闻详情 路由模块
import  photoList from './components/photos/photoList.vue'//图片分享 路由模块
import  photoInfo from './components/photos/photoInfo.vue'//图片分享详情信息
import  goodslist from './components/goodslist/goodsList.vue'//商品购买
import  goodsInfo from './components/goodslist/goodsInfo.vue'//商品购买详情信息
import  goodsdesc from './components/goodslist/goodsdesc.vue'//图文价绍
import  goodsComments from './components/goodslist/goodsComments.vue'//商品留言







//3.创建路由对象
var router = new VueRouter({
	routes:[
		{path:'/',redirect:'/home'},
		{path:'/home', component:home },
		{path:'/member', component:member },
		{path:'/shopcar', component:shopcar },
		{path:'/search', component:search },
		{path:'/home/newsList', component:newsList },
		{path:'/home/newsList/:id', component: newsInfo },
		{path:'/home/photoList', component: photoList },
		{path:'/home/photoList/:id', component: photoInfo },
		{path:'/home/goodslist', component: goodslist },
		{path:'/home/goodsinfo/:id', component: goodsInfo },
		{path:'/home/goodsdesc/:id', component: goodsdesc,props:true },
		{path:'/home/goodsComments/:id', component: goodsComments,props:true, name:"goodsCmt"},
 
	],
	linkActiveClass: 'mui-active'


})



export default router  //暴露创建的路由对象

