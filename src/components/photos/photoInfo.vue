<template>
<div class="PhotoInfo_container">

    <h3>{{photoInfo.title}}</h3>
    <p class="subtitle">
        <span>发表时间:{{photoInfo.add_time | dateFormat }}</span>
        <span>点击了:{{photoInfo.click}}次</span>
    </p>
    <hr style="margin-top:36px;">



    <!-- 这里是缩略图区域 -->
        
  <!-- <vue-preview @click="$preview.open(index, list)" :slides="slide1" @close="handleClose" height="100"></vue-preview> -->
<!-- <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src">    -->
<!-- <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src"> -->
<!-- <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src"> -->
<vue-preview :slides="list" @close="handleClose"></vue-preview>


    <!-- 图片内容区域 -->
    <div class="content" v-html="photoInfo.content"></div>


    <!-- 这里是评论子组件，加载现成组件 -->
    <cmt-box :id='id'></cmt-box>


</div>
</template>

<script>

import {Toast} from 'mint-ui'
import comment from '../subcomponents/post.vue'



export default {

    data(){
        return{
            id:this.$route.params.id,//从路由中获取图片的id
            photoInfo:{},
            /* slide1: [
                {
                    src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
                    msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
                    alt: 'picture1',
                    title: '图片需要复制图片地址进来，并且区分大小图',
                    w: 600,
                    h: 400
                },
                {
                    src: 'http://demo.dtcms.net/upload/201504/18/thumb_201504181230434303.jpg',
                    msrc: 'http://demo.dtcms.net/upload/201504/18/thumb_201504181230434303.jpg',
                    alt: 'picture2',
                    title: '图片需要复制图片地址进来，并且区分大小图',
                    w: 400,
                    h: 300
                }
             ] */
               /*  list: [{
                        src: 'https://placekitten.com/600/400',
                        w: 600,
                        h: 400
                        }, {
                        src: 'https://placekitten.com/1200/900',
                        w: 1200,
                        h: 900
                }] */
                list: [] // 缩略图的数组
        }
    },
    

    methods:{
        getPhotoInfo(){
            this.$http.get("api/getimageInfo/"+this.id).then(result=>{
                if(result.body.status===0){
                    this.photoInfo = result.body.message[0]
                }else{
                    Toast('获取图片api数据失败')
                }
            })
        },
        getThumbs(){
            this.$http.get('api/getthumimages/'+this.id).then(result=>{
                if(result.body.status===0){
                    //因为pre这里的数据先暂存
                    this.list = result.body.message.forEach(item=>{
                        item.w = 600;
                        item.h = 400;
                        item.msrc=item.src;  //关键点，赋值给它
                    })
                }else{
                    Toast('获取图片api数据失败')
                }
                this.list = result.body.message
            })
        },
        
        handleClose () {
            // console.log('close event')
        }
    },
    components:{
        'cmt-box':comment//注册评论子组件
    },

    created(){
        this.getPhotoInfo(),
        this.getThumbs()
    },







}
</script>


<style  scoped>

    .PhotoInfo_container{
        padding:3px;
    }
    h3{
        text-align: center;
        color:rgb(49, 131, 224);
        margin: 10px 0;
    }

    .subtitle span{
        display: flex;
        justify-content: space-between;
    }
    .subtitle span:nth-child(1){
        float: left;
    }

    .subtitle span:nth-child(2){
        float: right;
    }

.preview-img{
    margin-left:8px;
    margin-top:8px;
}



</style>