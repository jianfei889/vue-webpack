//入口文件

import Vue from 'vue'//导入vue包

import app from './app.vue'//导入app组件


/* // 按需导入Mint-UI 的组件
import { Header, Swipe, SwipeItem,Button,Lazyload } from 'mint-ui'
import 'mint-ui/lib/style.css'
//手动安装使用组件的内容
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload);
 */

 //因为懒加载需要全部的样式组件支持，所以要全部导入
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)


import './lib/mui/dist/css/mui.min.css'//用Mui 时要导入的样式支持
import './lib/mui/dist/css/icons-extra.css'//字体图标样式支持
import './lib/mui/dist/fonts/mui-icons-extra.ttf'//字体图标
//import './lib/mui/dist/js/mui.min.js'//用Mint-ui 时要导入的样式支持

import VueRouter from 'vue-router'//1.1导入路由
Vue.use(VueRouter)//1.2安装路由
import router from './router.js'  //1.3，导入router.js路由模块


import VueResource from 'vue-resource'// 2.1，导入 vue-resource
Vue.use(VueResource)// 2.2,安装 vue-resource

import  'bootstrap/dist/css/bootstrap.css';

import moment from 'moment'

//设置请求的根路径，使用前需要前面加载vue-resource
// Vue.http.options.root = 'http://www.liulongbin.top:3005/'

//  Vue.http.options.root = 'http://api.cms.liulongbin.top/'
 Vue.http.options.root = 'http://api.cms.liulongbin.top/'

//全局设置 post中，提交时候的表单数据格式
Vue.http.options.emulateJSON = true;

// npm i vue-preview -S

import preview from 'vue-preview' 
// defalut install
Vue.use(preview)




//这里是Promise()的文件代码,在index.js上仅仅引用练习,所以注释


//class 关键字，是ES6中提供的新语法，用来实现ES6中面向对象的编程的方式
/* class Person {
	static info = {name:'zs',age:20}
} */
//下面这行代码将无法执行，原因是需要 babel-loaderr 加载器来加载
// console.log(Person.info)//这里环境配置完成可以注释掉
//1.在webpack中可以配置两套包来安装babel 相关的loader功能
//1.1- npm i babel-core babel-loader babel-plugin-transform-runtime -D
//	这里的babel-loader安装版本7的好用，代码在下一行
//1.1- npm i babel-core babel-loader@^7 babel-plugin-transform-runtime -D
//1.2- npm i babel-preset-env babel-preset-stage-0 -D
//2.进行配置文件的匹配规则
//2.1- {test：/\.js$/,use:'babel-loader',exclude:/node_modules/  }
//2.2-匹配规则的 exclude:node_modules/,意思为排除这里的js文件引用加载器，
//		因为node_modules的js文件是封装好的，所以不需要再额外处理
//		不排除的话会消耗cpu消耗性能，并且打包速度慢，
//		如果转换了node_modules的js文件,那么这个项目将无法进行（项目出错）
//3.在项目根目录下新建一个.babelrc 这个Babel配置文件，这个配置文件属于JSON格式
//	所以在.babelrc 文件中不能写注释，字符串必须双引号




Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
	//moment()里面的参数是默认为空时是当前时间，可以写上自定义时间
	//format()是将指定的时间格式返回出去
	return moment(dataStr).format(pattern)
})


import store from "./store.js"//导入状态管理对象




var vm = new Vue({
	el:"#app",
	data(){
		return{

		}
	},
	methods:{
		
	},

	render: c=>c(app),//渲染app.vue
	router,//把路由的实例对象挂载到这个Vue实例中
	store//挂载vuex实例对象	

})



















































