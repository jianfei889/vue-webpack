<template>
<div>

    <!-- 轮播图 -->


    <swiper :lunbotuList="lunbotuList" :imgName="'img'" :isfull="true">

    </swiper>


 
<!-- 九宫格改造，内容画面 -->
    
    <ul id="liugongge" class="mui-table-view mui-grid-view mui-grid-9">
            <li style="margin-top: 5px;" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newsList">
                    <span class="mui-icon mui-icon-chat"></span>
                    <div class="mui-media-body">新闻资讯</div>
                </router-link></li>
            <li style="margin-top: 5px;"  class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photolist">
                    <span class="mui-icon mui-icon-image"></span>
                    <div class="mui-media-body">图片分享</div>
                </router-link ></li>
            <li id="shopping" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
                    <span class="mui-icon-extra mui-icon-extra-cart"></span>
                    <div class="mui-media-body shopcar">商品购买</div>
                </router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <span class="mui-icon mui-icon-chatbubble"></span>
                    <div class="mui-media-body">留言反馈</div>
                </a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <span class="mui-icon-extra mui-icon-extra-computer"></span>
                    <div class="mui-media-body shopcar">视频专区</div>
                </a></li>
            <li style="margin-top:7px;" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <span class="mui-icon mui-icon-list"></span>
                    <div class="mui-media-body">联系我们</div>
                </a></li>
        </ul> 
      



  


<!-- 新接口 

http://www.liulongbin.top:3005/api/getlunbo
http://www.liulongbin.top:3005/api/getprodlist

-->

<!-- 移动端中mui的@click为：@tap -->

</div>
</template>



<script>

import {Toast} from 'mint-ui'
import  swiper  from "../subcomponents/Swiper.vue";




export default {

    data(){
        return {
            lunbotuList:[],//保存轮播图的数组
            lunbotu:[]
        }

    },

    created(){
        this.getLunbo()
    },


methods:{
    getLunbo(){
        // this.$http.get("api/getlunbo").then(result => {

        this.$http.get("api/getlunbo").then(result => {
            // console.log(result.body)

            if(result.body.status === 0){
                this.lunbotuList = result.body.message;
            }else{
                Toast('加载轮播图失败')
            }
        })
    }


},

components:{
    swiper
}



}

</script>



<style scoped>


/* 给轮播图添加上高度，如果没有高度则轮播图的盒子不能显示出来 */
    .mint-swipe{
        height: 200px;
    }

/* 轮播图的背景颜色 */
    .mint-swipe-item:nth-child(1){
        background-color: pink;
    }
    .mint-swipe-item:nth-child(2){
        background-color: cyan;
    }
    .mint-swipe-item:nth-child(3){
        background-color: #64b4c2c4;
    }

/* 设置轮播图的点 */
    .mint-swipe-indicator{
        background-color: #000;
        opacity: 1;
    }
/* 设置轮播图中当前 active 的点 */
    .mint-swipe-indicator.is-active{
        background-color: rgb(227, 9, 247);
    }


     .mint-swipe img{
        width:375px;
        height: 200px;
    }

    .mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3{
        border:none;
        background-color: #fff;
    }

.mui-grid-view.mui-grid-9{
     border:none;
    background-color: #fff;
}


    .mui-icon-extra{
        font-size:38px;
    }
    
/* 第 3，5，个图标的样式 */
    .shopcar{
        margin-top:15px !important;
    }
    
/* 图片加载器测试 */
    #img{
        width: 200px;
        height: 120px;
        background: pink;
        background-image: url('./1.jpg');
        background-size: cover;
    }

    #img2{
        width: 200px;
        height: 120px;
        border:1px solid red;
    }

    #shopping{
        width: 125px;
        height: 105px;
    }
  

</style>