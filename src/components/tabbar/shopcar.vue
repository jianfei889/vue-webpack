<template>
<div class="shopcar_continer">


    <!-- 商品列表 -->
    <div class="mui-card" v-for="item in goodslist" :key="item.id"> 
        <div class="mui-card-content">
            <div class="mui-card-content-inner goodsItem">
                <!-- 选择按钮 -->
                <!-- 屏蔽，选择按钮截止价格的运算 -->
                <!-- @change="changeSelect(item.id,seletedObj[item.id]) -->
                <mt-switch v-model="seletedObj[item.id]">
                </mt-switch>
                

                <img :src="item.thumb_path">
                <div class="info">
                    <h1>{{item.title}}</h1>
                    <div class="goodsInfo">
                        <span class="price">{{item.sell_price}}</span>

                        <!-- 表示商品的数量 -->
                        <nobox :initcount="countObj[item.id]" :id="item.id"></nobox>
                        <a href="#" @click.prevent="del(item.id)">删除</a>
                    </div>

                </div>
                
            </div>
        </div>
	</div>

    <!-- 结算区域 -->
    <div class="mui-card">
        <div class="mui-card-content">
            <div class="mui-card-content-inner jiesuan">
                
                <div class="left">
                    <p>总计(不含运费)</p>
                    <p>
                        已勾选商品：<span class="danger">{{selectedCount}}</span>件，
                        总价：<span class="danger">￥{{amount}}</span>
                    </p>
                </div>
                <mt-button type="danger" >去结算</mt-button>

            </div>
        </div>
	</div>
   




</div>
</template>



<script>

import nobox from "../subcomponents/shopcar-nobox.vue"
import {mapGetters,Mutations, mapMutations} from 'vuex'

export default {
    data(){
        return{
            goodslist:[]//商品列表，默认空数组

        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        ...mapMutations(['delFormCart',"changeSelect"]),


        async getGoodsList(){

            if(this.idStr.length<=0) return true


           const {data} = await this.$http.get(
               'api/goods/getshopcarlist/'+this.idStr 
            )
            if(data.status===0)
            return this.goodslist = data.message
           
        },
        del(id){
            //从界面是国内删除商品，不影响持久化的数据
            // console.log(id)
            this.goodslist.some((item,i)=>{
                if(item.id==id){
                    this.goodslist.splice(i,1)
                    return true
                }
            })
            //从vuex中删除数据
            this.delFormCart(id)
        },

        changeSelect(id,selectStatus){//shopcar的方法
            // console.log(id+select)
            //更改开关的状态
            this.changeSelect({id:id,select:selectStatus})//store的方法
            // this.$store.commit("changeSelect", { id, selected:selectStatus });
        },
        

    },
    components:{
        nobox
    },
    computed:{
        ...mapGetters(['idStr','countObj','seletedObj','selectedCount','amount'])
    }


}



</script>



<style scoped>

    .shopcar_continer{
        background-color: #eee;
        overflow: hidden;
    }

    .goodsItem{
        display: flex;

    }
    .goodsItem img{
        width: 60px;
        height: 60px;
    }


    .goodsItem h1{
        font-size: 15px;
        font-weight: bold;
        /* 文字段落两端对齐，这里不用，但是作为知识点可记住。 */
        /* text-align-last:justify; */
    }

    .info{
        display: flex;
        flex-direction:column;
        justify-content:space-between;
        margin-top: -15px;
        width:205px;
        margin-left:8px;
    }


    .info .goodsInfo{
        display: flex;
        justify-content:space-between;
        align-items: center;
        
       
    }

    /* 商品价格 */
    .price{
        color:red;
        font-size: 16px;
        font-weight: bold;
    }

    /* 去结算区域样式 */
    .danger{
        color:red;
        font-size: 16px;
        font-weight: bold;
    }

    .jiesuan{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }



    





</style>>

