<template>
<div>

  <h3>发表评论 </h3>

  <textarea  v-model="msg" placeholder="请输入评论内容" maxlength="80" 
       cols="12" rows="5"></textarea>
  <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
  

    <div class="cmt-list" >
      <div class="cmt-item"  v-for="(item,i) in comments" :key="i">
          <div class="cmt-title" >
              第{{i+1}}楼, 用户：匿名用户,
              发表时间：{{item.add_time | dateFormat }}
          </div>

          <div>{{item.content ==='undefined'?"此用户很懒，什么都没说": item.content   }}</div>

      </div>
  </div>

  <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>


</div>
</template>

<script>

import { Toast } from "mint-ui";

export default {
  data() {
    return {
      pageIndex: 1, // 默认展示的评论的页数为第1页
      comments: [], // 所有的评论数据
      msg: "" // 评论输入的内容
    };
  },
  created() {
    this.getComments();
  },
  
  methods: {
    getComments() {
      // 获取评论
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(result => {
          if (result.body.status === 0) {
            // this.comments = result.body.message;//这是评论留言的第一次操作
            // 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据，拼接上新数据
          //以第一页的数据再在后尾处附加一组数据，这里注意 concat（）函数的使用
             this.comments = this.comments.concat(result.body.message)
          } 
          else {
            return this.Toast("获取评论失败！")
          }
        });
    },
      getMore(){//获取更多的评论内容
          this.pageIndex++
          this.getComments()
      },

      postComment(){//发表评论thismsg'

        if(this.msg.trim().length === 0){
          return Toast("评论内容不能为空")
        }

//post请求的两个参数： 1.请求的url地址，2.提交给服务器的数据对象
//  3.定义提交时候的表单数据格式{emulateJSON:true}
//    这里因为全局配置所以不用再写第三个参数
          this.$http.post('api/postcomment/'+this.$route.params.id,{
            content:this.msg.trim() //trim()去除前后空格
            })
            .then(function(result){
              if(result.body.status === 0){
                //1.发表评论成功之后，手动拼接一个评论对象
                var cmt = {user_name:'匿名用户',
                add_time: Date.now(),
                content:this.msg.trim()
                }
                this.comments.unshift(cmt)
                this.msg=''//评论完之后清空

              }
            })//.then结束
      },



  },
  
  props: ["id"]//运用这个组件需要加一个v-bind的id并且传参 => :id="id"
};
</script>


<style scoped>
    h3{
        font-size: 18px;
        font-weight: bolder;
    }

    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0;
    }

   .cmt-title{/*评论的信息：楼层、用户名、发表时间 */
      background-color: rgb(245, 200, 200);
      margin-top: 8px;
  }




</style>