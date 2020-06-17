<template>
<div>

    
    <div class="mui-numbox" data-numbox-min='1' style="height:30px;width:112px">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" ref="nobox" @change="countChange" />
        <button class="mui-btn mui-btn-numbox-plus" type="button" >+</button>
    </div>



</div>
</template>

<script>

import mui from "../../lib/mui/js/mui.min.js"
import {mapMutations} from "vuex"

export default {
    data(){
        return{

        }

    },
    mounted(){
        //数字的加减需要进行初始化
        mui(".mui-numbox").numbox()
    },
    methods:{
        countChange(){//通过 change 事件动态获取文本框的值
            const val = parseInt(this.$refs.nobox.value)
            this.updataGoodsCount({id:this.id,count:val})
        },
        ...mapMutations(['updataGoodsCount'])
       

    },

    //引用这个组件需要在引用的组件内 传送 一个initcount的数据，格式为
    // :自定义指令="initcount"
   props:['initcount','id']//引用传参指令+数据


}
</script>




<style>

</style>