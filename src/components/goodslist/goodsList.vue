<template>
<div>



    <div class=" goods-row">
            <!-- :to=" '/home/goodsinfo/'+item.id  " -->
            <router-link  v-for="item in goodslist" :to=" '/home/goodsinfo/'+item.id "   
                tag="div" class=" goodsinfo col-xs-6 col-md-6 col-lg-6 " :key="item.id">
                <img :src="item.img_url" alt="">
                <br>
                <div class="info">
                    <h3 class="title">{{item.title}}</h3>
                    <p class="price">
                        <span class="now">&nbsp;￥{{item.sell_price}}</span>
                        &nbsp;
                        <span class="old">￥{{item.market_price}}</span>
                    </p>
                    <p class="sell">
                        <span>热爱中</span>
                        <span>剩余：{{item.stock_quantity}}</span>
                    </p>
                </div>
                    <br>
            </router-link>
            
            
            
    </div>
    <br>
    <mt-button class="mt_btn" type="danger" size="large" plain @click="getMore" >加载更多</mt-button>




</div>
</template>



<script>
import 'jquery'

export default {
    
    data(){
        return{
            page:1,//默认展示第一页
            goodslist:[],
            isloaded:false  //节流阀，默认为false，表示没有加载完毕

        }
    },
    created(){
        this.getGoodsListByPage()
        
    },

    methods:{
        async getGoodsListByPage(){//根据页码获取商品列表
           const {data} = await this.$http.get(
               'api/getgoods?pageindex='+this.page
            )
            if(data.status===0){

            if(data.message.length<=0){//数据长度<=0时，表示数据加载完毕
            //此时把节流阀改为加载完毕,此操作可以减少ajax的重复请求
                this.isloaded=true     
            }

             return (this.goodslist = this.goodslist.concat(data.message))
                
            }

           
        },
        getMore(){
            if(this.isloaded) return;

            this.page++
            this.getGoodsListByPage()
        }

        
    },


}
</script>








<style scoped>

   
    
    .goodsinfo{
        border-top:1px solid #ccc;
        border-bottom:1px solid #ccc;
        border-left:1px solid #ccc;
        border-right:1px solid #ccc;
        margin:3px 3px;
        width:48%;
        background-color: #fff;
        padding:0;
        box-shadow:0 0 8px rgb(241, 198, 198);
        min-height: 235px;
        max-height: 270px;
    }

    

   img{
        width: 143px;
        height: 150px;
        display: flex;
        margin-left: 13px;
        margin-top: 4px;
        margin-bottom: 6px;
        min-height: 155px;;
    }

    h3{
        margin-top: -18px;
        max-height:34px;
        overflow: hidden;
    }

    .now{
        font-weight: bolder;
        color:red;
        font-size: 17px;
    }
    .old{
        font-size: 13px;
        text-decoration:line-through;
    }
    
    .title{
        font-size:16px;
        font-weight:bolder;
        text-align: center;
    }
    .sell{
         
         margin:-5px 0
    }

    .sell span:nth-child(1){
        float:left;
        margin-left:5px;
        padding-bottom:5px;
    }  
    
    .sell span:nth-child(2){
        float:right;
        margin-right:5px;
        padding-bottom:5px;
    }  

    


</style>