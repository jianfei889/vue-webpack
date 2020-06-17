<template>
<div class="goodsdesc_content">

    
     <h3 class="title">{{info.title}}</h3>
    <hr>
    <div class="content" v-html="info.content"></div>

</div>
</template>




<script>
export default {
    data(){
        return{
            info:{}
        }
    },
    created(){
        this.getGoodsDesc()
    },
    methods:{
        async getGoodsDesc(){
           const {data} = await this.$http.get("api/goods/getdesc/"+this.id)
           if(data.status===0)
                //因为这里的数据为数组，所以返回第一项数据
               return this.info = data.message[0]
            }
        

    },
    props:["id"]

}
</script>




<style  >



     .goodsdesc_content .title{
         font-weight: bolder;
        font-size:18px;
        margin:10px 5px;
        text-align: center;
        color:blue;
    }

  
    .goodsdesc_content .content img{
        width:100%;
    }













</style>