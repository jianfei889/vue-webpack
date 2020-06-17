const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin') 


module.exports = {

    entry:path.join(__dirname,'src/index.js'),
    output:{
        path:path.join(__dirname,'dist'),
        filename:'bundle.js'
    },



    module:{//第三方模块加载器
        rules:[//第三方模块的匹配规则
            {test: /\.css$/, use:['style-loader','css-loader' ] },
            {test: /\.less$/, use:['style-loader','css-loader','less-loader' ] },
            {test: /\.sass$/,loaders: ['style', 'css', 'sass']},          
              
            { test: /\.vue$/,  loader: 'vue-loader'},

            { //字体文件
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: { name: "[name].[ext]", outputPath: './fonts'}
            },
            
            //limit后的值只有小于图片自身大小会被base编码(但不编码这里可能不显示图片)，大于就不会被base编码
            {test:/\.(jpg|png|gif|jpeg)$/,use:'url-loader?limit=70880$name=[name].[ext]'},//处理样式表中引入的图片

             /*  {
                test: /\.(png|jpg|svg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name:'assets/[name].[ext]',
                    }
                }},
               */ 
               
//--------------------------
            
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},

            

         









        ]

    },

    plugins: [
        new VueLoaderPlugin()   //15版本需指定plugin
      ]


}

// const webpack = erquire("webpack")
// const htmlWebpackPlugin = require("html-webpack-plugin")


