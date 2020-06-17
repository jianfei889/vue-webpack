<template>
<div>


   <!-- 轮播图 -->
    <mt-swipe :auto="2500">
        <!-- 在组件中，使用v-for 一定要使用 :key属性 -->
        <!-- <mt-swipe-item v-for="item in lunbotuList" :key="item.img"> -->
        <mt-swipe-item v-for="(item,i) in lunbotuList" :key="i">
            <img :src="item[imgName]" alt="" :class="[isfull?'img-full':'img-norma']">
        </mt-swipe-item>
        
    </mt-swipe>







</div>
</template>






<script>
export default {
    data(){
        return({

        })
    },

    methods:{

    },
    //谁用这个轮播图组件就必须为其传递一个数组，
    //同时只能接收img属性的图片作为轮播图展示出来
    props:['lunbotuList','imgName','isfull']
}
</script>





<style >


 /*给轮播图添加上高度，如果没有高度则轮播图的盒子不能显示出来 */
    .mint-swipe{
        height: 200px;
    }

    /* 如果给图片添加了这个类就把宽高撑满父元素 */
    .mint-swipe .mint-swipe-item .img-full{
        width:100%;
        height: 100%;
        overflow: hidden;
    }

    /* 添加了这个类就把宽高设置成想要的宽高,并且横向居中显示 */
    .mint-swipe .mint-swipe-item .img-norma img{
        height: 100%;
    }
     
    /* 添加了这个类就把宽高设置成想要的宽高,并且横向居中显示 */
    .mint-swipe .mint-swipe-item  img{
       
        height: 100%;
    }
     

/* 轮播图的背景颜色 */
    .mint-swipe-item{
        text-align: center;
    }


  
/* 设置轮播图的点 */
    .mint-swipe-indicator{
        background-color: rgb(197, 236, 88);
        opacity: 1;
    }
/* 设置轮播图中当前 active 的点 */
    .mint-swipe-indicator.is-active{
        background-color: rgb(227, 9, 247);
    }


     /*  .mint-swipe img{
        width:375px;
        height: 200px;
    } */
/*
    .mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3{
        border:none;
        background-color: #fff;
    }

.mui-grid-view.mui-grid-9{
     border:none;
    background-color: #fff;
}

 */
   













</style>