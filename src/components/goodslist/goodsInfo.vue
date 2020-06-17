<template>
<div style="background-color:#eee;overflow:hidden" class="big_box">

    

    <!-- 轮播图区域 -->
    <div class="mui-card">
            
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
                <swiper :lunbotuList="lunbotu" :imgName="'src'" :isfull="false">
                </swiper>
            </div>
        </div>
            
    </div>

    <!-- 商品购买区域 -->
        <div class="mui-card">
				<div class="mui-card-header goodsTitle" >{{goodsInfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                            市场价<span><del>￥{{goodsInfo.market_price}}</del></span>&nbsp;
                            销售价<span style="font-size:16px;color:red;
                                font-weight:bold">￥{{goodsInfo.sell_price}}</span>
						</p>

                        <div>
                            购买数量:
                <!-- 这里的max为库存量 -->
                            

                            <numbox style="display:inline"  :max="goodsInfo.stock_quantity" @func="getSelectCount" ></numbox>
                        </div>
                        <div style="margin-top:10px;">
                            <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="primary" size="small" @click="addToCart">加入购物车</mt-button>
                            
                        </div>
					</div>
				</div>
		</div>

        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
         >
            <div class="boll" v-show="flag"></div>
        </transition>

    <!-- 商品参数区域 -->
        <div class="mui-card">
				<div class=" title">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号:{{goodsInfo.goods_no}}</p>
						<p>库存情况:{{goodsInfo.stock_quantity}}件</p>
						<p>上架时间:{{goodsInfo.add_time | dateFormat}}</p>
					</div>
				</div>
				<div class="mui-card-footer btnArea">
                   
                    <mt-button type="primary" size="large" plain @click="goDesc">图文介绍</mt-button>

                    <mt-button type="danger" size="large" plain @click="goComments">商品评论</mt-button>
                </div>
		</div>



</div>
</template>

<script>

import mui from "../../lib/mui/js/mui.js"
import  swiper  from "../subcomponents/Swiper.vue";
//添加组件失败，所以改为行内添加
import  numbox  from "../subcomponents/goods_num.vue";
import  {mapMutations}  from "vuex";


export default {
    data(){
        return{
            lunbotu:[],
            id:this.$route.params.id,
            goodsInfo:{},
            flag:false,
            selectCount:1,//用户选中的数量值默认为1

        }
    },
    created(){
        this.getLunBoTu(),
        this.getGoodsInfoById()
    },
    
    
    methods:{

        // 导入mapMutations之后从中映射出想要的方法
        // ...mapMutations(["addToCart"]),//方法不成功，所以用另一种方法


        async getLunBoTu(){
           const {data} = await this.$http.get('api/getthumimages/'+this.id)
           if(data.status===0)
           return this.lunbotu = data.message
        },

        async getGoodsInfoById(){
            const {data} = await this.$http.get("api/goods/getinfo/"+this.id)
            if(data.status===0)
           return (this.goodsInfo = data.message[0])
        },


        goDesc(){//点击商品的图文介绍按钮跳转到对应页面
         //this为当前组是专门实现编程式导航的
         // 这个对象有push方法，这个方法可以跳转到对应路由地址
            this.$router.push("/home/goodsdesc/"+this.goodsInfo.id)
        },

        goComments(){//点击跳转到商品评论界面
             //this.$router.push("/home/goodsComments/"+this.goodsInfo.id)

            this.$router.push({ name:"goodsCmt",
                params:{id:this.goodsInfo.id}  
            })
        },

        addToCart(){
            this.flag=!this.flag//显示小球
            //调用mutation的 addToCart方法
             this.$store.commit('addToCart',{
                        id:this.id,
                        count:this.selectCount,
                        select:true,
                        price:this.goodsInfo.sell_price},
            ) 
             
        },


        beforeEnter(el){//动画开始之前
            el.style.transform = "translate(0,0)"
        },
        enter(el,done){//结束之后的终止状态
            el.offsetWidth;


            // el.getBoundingClientRect()---获取元素的位置坐标
            const ballPosition = el.getBoundingClientRect()
            // console.log(ballPosition)

            //这里获取徽标的数据是操作DOM元素，因为不是操作
            //form表单和双向数据绑定，而获取徽标位置对DOM元素无影响，
            //所以活学活用，精巧变通，这个是vue的一个优势
            const badgePos = document.getElementById("badge").getBoundingClientRect()
            // console.log(badgePos)

            //小球到徽标之间的横向、纵向距离
            const left = badgePos.left-ballPosition.left
            const top = badgePos.top-ballPosition.top



            el.style.transform=" translate("+left+"px,"+top+"px)  "

            // cubic-bezier.com----贝塞尔曲线动画地址，同理，ease的原理来自于此
            el.style.transition = "all .6s cubic-bezier(.56,-0.23,.95,.45)"
            //当入场动画完成之后，需要手动调用done()函数，直接跳过小球的出场动画
            done()


        },
        afterEnter(el){//入场动画完成之后的回调函数--出场动画
            this.flag = !this.flag
        },

        getSelectCount(c){//获取商品数量
            console.log("count:"+c)
            //把用户选择的购买数量值保存到一个值中，方便用户
            //点击加入g购物车并同步购物车徽标
            this.selectCount = c 
        }


    },

    components:{
        swiper,
        numbox
    },
    




}
</script>



<style scoped>

/* 设置轮播图的点 */
    .mint-swipe-indicator{
        background-color: rgb(235, 36, 36);
        opacity: 1;
    }
/* 设置轮播图中当前 active 的点 */
    .mint-swipe-indicator.is-active{
        background-color: rgb(203, 247, 9);
    }

    .btnArea{
        /* display: block; */
        flex-direction: column;
    }
    
    .btnArea button+button{
        margin-top:12px;
    }

    .goodsTitle{
        min-height: 68px;;
    }

    .boll{
        background: red;
        width: 15px;
        height: 15px;
        border-radius: 52%;
        position: absolute;
        z-index: 999;

        left: 142px;
        top: 402px;
    }

</style>


