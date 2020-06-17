<template>
<div>

<!-- 使用这个组件时需要传递一个id值，
     这里的id的传递来自params:{id:this.goodsInfo.id} 
 -->
    <comment :id="id"></comment>

</div>
</template>

<script>

import comment from "../subcomponents/post.vue"

export default {
        data(){
            return{

            }
        },
        methods:{

        },
        components:{
            comment
        },
        props:["id"]



}
</script>

<style>



</style>