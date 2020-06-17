<template>
  <div>
      
    <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
            <router-link :to=" '/home/newsList/'+item.id">
            <img class="mui-media-object mui-pull-left" :src="item.img_url" />
            <div class="mui-media-body">
                <h4>{{item.title}}</h4> 
                <p class="mui-ellipsis">
                    <span>发表时间：{{ item.add_time | dateFormat }}</span>  
                    <span>点击：{{item.click }}次</span> 
                </p>
            </div>
            </router-link>
      </li>

    </ul>



  </div>
</template>



<script>

import {Toast} from 'mint-ui'

export default {
    data() {
        return {
            newslist:[], //这是新闻列表
            msg:'',
        }
    },

    created() {
        this.getNewsList()
    },

    methods: {
        getNewsList(){
            this.$http.get('api/getnewslist').then(result =>{
                if(result.body.status === 0){
                    this.newslist = result.body.message
                }else{
                    Toast('获取新闻列表失败')
                }
            })
        }
    }
};
</script>



<style  scoped>

    .mui-ellipsis span:nth-child(1){
        color:lightblue;
    }
    
    .mui-ellipsis span:nth-child(2){
        float: right;
        color:lightblue;
    }

    








</style>