<template>
<div>

    

<!-- 这是顶部的滑动条 -->
 <div id="slider" class="mui-slider ">
        <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll">
                <a :class=" ['mui-control-item',item.id==0?'mui-active':'' ] " 
                v-for="item in cates" :key='item.id' @click="getPhotolistBycateId(item.id)">
                    {{item.title}}
                </a>

            </div>
        </div>
 </div>

<!-- 图片列表区域 -->
    <ul class="photoList">
        <router-link :to=" '/home/photolist/'+item.id  " class="imgList" v-for="item in list" 
         :key='item.id' tag="li">
            <img v-lazy="item.img_url" class="list_img">
            <div class="photoInfo">
                <h4 class="photoInfo_title">{{item.title}}</h4>
                <div class="photoInfo_body">{{item.zhaiyao}}</div>
            </div>
        </router-link>
    </ul>






<!-- 新接口 

http://www.liulongbin.top:3005/api/getlunbo
http://www.liulongbin.top:3005/api/getprodlist

-->


</div>
</template>







<script>

import {Toast} from 'mint-ui'

import  mui from '../../lib/mui/js/mui.min.js'//导入js文件


export default {

    data(){
        return {
            cates:[],//所有分类的别名
            list:[],//这里是图片列表
        }

    },


    //当组件中的DOM结构被渲染好并放到页面中，会执行这个生命周期的钩子函数
    //这里不能用created()生命周期函数，
    //因为需要页面加载完成之后在执行滑动事件
    mounted(){
        mui('.mui-scroll-wrapper').scroll({
        //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006 
          deceleration: 0.0005 
        })
        

    },

    created(){
        this.getAllCategory(),
        this.getPhotolistBycateId(0)
    },

    methods:{
        getAllCategory(){//获取所有的图片分类
            this.$http.get("api/getimgcategory").then(result=>{
                if(result.body.status===0){
                    //手动拼接出列表的全部
                    result.body.message.unshift({title:"全部",id:0})
                    this.cates = result.body.message
                }else{
                    Toast('获取图片api数据失败')
                }
            })

        },
        getPhotolistBycateId(cateId){//根据分类id获取图片列表
            this.$http.get("api/getimages/"+cateId).then(result=>{
                if(result.body.status===0){
                    this.list = result.body.message
                }else{
                    Toast('获取图片api数据失败')
                }
            })
        }


    },

    



}





</script>



<style>

    *{
        touch-action:pan-y;
    }


/* 控制顶部滑块之间的距离 */
    .mui-segmented-control.mui-scroll-wrapper .mui-control-item {
        display: inline-block;
        width: auto;
        padding: 0 12px;
        border: 0;
    }
/* 顶部滑块的 a链接 的 下划线 */
    .mui-slider .mui-segmented-control.mui-segmented-control-inverted .mui-control-item.mui-active {
        text-decoration:none;
    }
    .mui-segmented-control.mui-scroll-wrapper .mui-control-item {
        text-decoration:none;
    }

/* 懒加载样式--应用了mint-ui 的 Lazyload 组件 */
    img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }

 
    .photoList{
        list-style: none;
        margin:0;
        padding:10px;
    }

   .imgList{
        list-style: none;
        margin-bottom:10px; 
        padding-bottom: 0;
        text-align: center;
        background-color: #e3e3e3;
        box-shadow:0 0 10px #999;
        position: relative;
    }

   .list_img{
        width:100%;
        vertical-align: middle;
    }


    .photoInfo{
        color:white;
        text-align: left;
        background-color: rgba(0, 0, 0, 0.4);
        position: absolute;
        bottom:0;
        z-index: 1;
        max-height: 96px;
        overflow: hidden;
    }

    .photoInfo_title{
        font-size: 14px;
    }
    .photoInfo_body{
        font-size: 14px;
    }



</style>