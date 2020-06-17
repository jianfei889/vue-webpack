<template>
<div>

    
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" ref="nobox"
           @change="countChange" />
        <button class="mui-btn mui-btn-numbox-plus" type="button" >+</button>
    </div>



</div>
</template>

<script>

import mui from "../../lib/mui/js/mui.min.js"

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
            const val = this.$refs.nobox.value
        //每当nobox子组件的count变化之后，要立即把最新的数据传递
        //给goodsinfo父组件，这样，每次点击购物车按钮时就可以把
        //最新的数据同步到tabbar购物车的徽标中
        this.$emit("func",parseInt(val))
        },

        
    },
    props:['max'],//接收父组件传递的max（max为库存量）

    watch:{
        //由于max库存量是通过Ajax发送过来的，当页面渲染出来时，页面渲染会
        //快于Ajax渲染，而此时max值还没有被Ajax赋值，
        //所以第一次渲染时的max是undefin,最后我们可以把max值通过
        //watch属性监听变化，把新值（第二次的max值）付给max值。
        //最后还需要在watch属性的max监听中通过JSapi限制最大值。
        max:function(newval,oldval){
            mui(".mui-numbox").numbox().setOption("max",newval)

        }
    }

}
</script>




<style>

</style>