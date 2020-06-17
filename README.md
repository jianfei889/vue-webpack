## 这个是项目相关信息的解释

### vue项目开发


# 使用说明1：
# 查看文件内部是否有node_modules 文件，没有就进行npm下载，常规操作如下
1. `在项目shell下运行命令: npm i`
2. `再运行命令：webpack`
3. `这时再index.html 中打开网页即可`
4. `每次更改需要运行 webpack 命令刷新网页`
5. `同时也可以配置 webpack-den-server 环境方便页面的刷新和观看`
# 使用说明2：
 `此项目为显示界面为移动端显示大小宽度，可以打包为手机apk格式。所以在网页端时可以打开调试工具（ctrl+shift+M打开响应式设计模式），选择iphone6/7/8设备型号（尺寸为375*667）。`




<!-- [备注知识点]  控制台中输入这个命令，找到占用程序，然后关闭即可 -->
<!-- netstat -ano | find 3000 -->





 ### 1. 新闻资讯组件，注释 
1. `绘制界面时，可以使用 mui中的 media-list.html 中的内容复制过来`
2. `Vue.http.options.root = 'http://www.liulongbin.top:3005/' `
3. `第二项是路由接口的地址，get http 时，只需后尾加上之后的地址就行`
4. `内容注意时间和底部的padding-bottom`


### 2. 实现新闻列表=》点击跳转到新闻列表的详情内容
1. `将每一项新闻列表换成路由从而可点击`
2. `注意网址的id值（也就是路由地址和组件相对应）`
3. `实现新闻详情和新闻评论功能`

### 3. 实现评论的加载更多的功能
- this.comments = result.body.message;//这是评论留言的第一次操作
- 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据，拼接上新数据
- 以第一页的数据再载后尾处附加一组数据，这里注意 concat（）函数的使用

### 4. 发表评论的功能
1. `对发表的评论进行双向数据绑定，然后点击按钮可以发表评论`
2. `检验：如果评论为空就就Toast()提示`
3. `通过 vue-resourece 发送一个请求，把评论内容提交给服务器`
4. `发表评论后，把内容放在首页首行（也就是最新评论）`

### 5. 图片分享功能
1. `路由的跳转`
***
2. 制作导航条--可以借助MUI元件制作，元件中的不需要的类要删除，否则影响布局
    滑动组件需要js文件的支持。要导入mui.js要初始化
这是官方提供的初始化代码：
        mui('.mui-scroll-wrapper').scroll({//初始化滑动事件
    //flick 减速1系数，系数越大滚动速度越慢，距离越小，默认值：0.0006
        deceleration:0.0005
    })
    ***
3. 这里的滑动事件需要配置mui.js文件，而mui.js需要babel-loader环境，
    这里有部分注释如何配置babel 环境，如下：
***
    1.在webpack中可以配置两套包来安装babel 相关的loader功能
    1.1- npm i babel-core babel-loader babel-plugin-transform-runtime -D
        这里的babel-loader安装版本7的好用，代码在下一行
    1.1- npm i babel-core babel-loader@^7 babel-plugin-transform-runtime -D
    1.2- npm i babel-preset-env babel-preset-stage-0 -D
    2.进行配置文件的匹配规则
    2.1- {test：/\.js$/,use:'babel-loader',exclude:/node_modules/  }
    2.2-匹配规则的 exclude:node_modules/,意思为排除这里的js文件引用加载器，
            因为node_modules的js文件是封装好的，所以不需要再额外处理
            不排除的话会消耗cpu消耗性能，并且打包速度慢，
            如果转换了node_modules的js文件,那么这个项目将无法进行（项目出错）
    3.在项目根目录下新建一个.babelrc 这个Babel配置文件，这个配置文件属于JSON格式
        所以在.babelrc 文件中不能写注释，字符串必须双引号
    4. 文件 .babelrc 的配置： 
        {
            "presets": ["env","stage-0"],
            "plugins": ["transform-runtime"]
        }
***
4.  这里的滑动事件使用生命周期的mounted()钩子函数，
    -  当组件中的DOM结构被渲染好并放到页面中，会执行生命周期的mounted()钩
    -  这里不能用created()生命周期函数，
   - 因为需要页面加载完成之后再执行滑动事件   
   - 滑动事件成功后，tabbar会无法切换，这时更换滑块的类名即可   
***

### 6. 图片列表的渲染和图片的懒加载技术
1. 制作图片列表,懒加载可以使用mMint-ui的组件


### 7. 商品列表的加载。
1. 注意页面布局的编写，这里可以用bootstrap的栅格做布局
2. 商品详情页面的布局用mui的card组件

### 8. 商品购买详情
1. 详情页的轮播图的中，教程中的代码不能展示轮播图的原因主要是get的地址不完整。
2. 在data加上id:this.$route.params.id 这个就好
3. this.$route.params.id，上一层中对应列表的id
4. 商品详情的轮播图片的宽高需要区分组件去写宽高（首页的轮播宽高不适合商品详情的宽高，所以要区分）

5. > 由于max库存量是通过Ajax发送过来的，当页面渲染出来时，页面渲染会快于Ajax渲染，而此时max值还没有被Ajax赋值，所以第一次渲染时的max是undefin,我们可以把max值通过/watch属性监听变化，把新值（第二次的max值）付给max值。
6. 最后还需要在watch属性的max监听中通过JSapi限制最大值。JsApi代码为```ui(".mui-numbox").numbox().setOption("max",newval)```
7. 路由除了router-link还可以用编程式导航实现理由（原因是router-link有时会影响页面）


### 9. 商品购买详情中的购物车小球
1. cubic-bezier.com 贝塞尔曲线网址，跟ease使用相同，ease的原理来自于此
2. 小球动画的滑动与分辨率的bug修复--
> 动态获取元素的位置坐标
> ``` el.getBoundingClientRect()```

### 10. vuex全局状态管理
1. 因为父子组件和兄弟组件之间的传值过于麻烦，所以 vuex 就出现了，
2. vuex 的作用可以定义全局变量，方便不同组件之间的数据调用
3. 查找数组中的其中一个数值时使用some()方法可以提高效率




