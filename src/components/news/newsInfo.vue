<template>
  <div class="newsinfo">
      
        
    <h3 class="title"> {{newsinfo.title}}</h3>
    <p>
      <span style="margin-left:5px;">发表时间：{{ newsinfo.add_time | dateFormat }}</span>
      <span style="float:right;margin-right:5px;">点击：{{newsinfo.click }}次</span>
    </p>

    <hr/>

    <div class="content" v-html="newsinfo.content"></div>
    <post :id="this.id"></post>


  </div>
</template>






<script>
/* 
http://www.liulongbin.top:3005/api/getlunbo
http://www.liulongbin.top:3005/api/post
http://www.liulongbin.top:3005/api/jsonp
 */

/*
获取列表地址:  http://www.liulongbin.top:3005/api/getprodlist/
添加地址:  http://www.liulongbin.top:3005/api/addproduct/
删除地址:  http://www.liulongbin.top:3005/api/delproduct/
*/
/*
http://www.liulongbin.top:3005 
*/


import post from '../subcomponents/post.vue'


export default {
    data(){
        return {
            id:this.$route.params.id ,   //将url地址中传递的id值写下方便调用
            newsinfo:{},
        }
    },

    created(){
      this.getnewsinfo()
    },

    methods:{
        getnewsinfo(){
            this.$http.get("api/getnew/" + this.id).then(result => {
                if(result.body.status === 0){
                    this.newsinfo = result.body.message[0]
                }else{
                    Toast('获取新闻列表失败')
                }
            })
        }
    },
    components:{
        post
    }
    
}



</script>






<style scoped>

    .newsinfo .title{
        text-align: center;
    }

    .title{
        display: inline-block;
    }

    /* 把图片设置为设备屏幕适应宽度 */
    .newsinfo img{
        width: 100%;
    }

    /* 新闻内容详情样式， */
    .content{
        margin:0 8px;
        /* text-indent :2em; //因为文章内容已经首行缩进，所以这里可以省略 */
    }


</style>