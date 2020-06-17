
import Vue from "vue"

//1.导入状态管理
import Vuex from "vuex"
//2.安装
	Vue.use(Vuex)
//3.创建实例对象


let car = window.JSON.parse(  localStorage.getItem('cart')||'[]'  )



	var store = new Vuex.Store({

		state:{
            //在在cart中应该把每个商品储存为一个对象{id，count,select,price}
            //cart:[]//购物车数量数组
            cart:car//数据持久化.car为持久化保存的数据
            
        },
        

		mutations:{
            addToCart(state,goods){
                //将商品添加到购物车
            //如果购物车中存在这个商品，那么只更新数量即可，如果没有就直接push
                // state.cart(push(goods))

                let flag = false
                state.cart.some(item=>{
                    if(item.id==goods.id){
                        item.count=item.count+goods.count
                        flag = true
                        return true//终止循环
                    }
                })

                //如果没找到则直接保存
                if(!flag){
                    state.cart.push(goods)
                }
                //数据持久化，Application =》LacalStorage可看储存数据
                localStorage.setItem('cart',
                        window.JSON.stringify(state.cart))
            },
            updataGoodsCount(state,goods){
                //根据传递过来的商品信息，更新购物车徽标数量
                state.cart.some(item=>{
                    //当添加到购物车的商品id等于货物id就把商品数量return
                    if(item.id==goods.id){
                        item.count = goods.count
                        return true
                    }
                })

                //数据持久化，Application =》LacalStorage可看储存数据
                localStorage.setItem('cart',
                    window.JSON.stringify(state.cart))
            },
            delFormCart(state,id){
                state.cart.some((item,i)=>{
                    if(item.id==id){
                        state.cart.splice(i,1)
                        return true
                    }
                })
                //数据持久化，Application =》LacalStorage可看储存数据
                localStorage.setItem('cart',
                    window.JSON.stringify(state.cart))
            },
            
            changeSelect(state,obj){
                state.cart.some(item=>{
                    if(item.id==obj.id){
                        //根据提供的obj对象的id和select属性，
                        //更改购物车商品的选中状态
                        item.select = obj.select
                        return true
                    }
                })
                //数据持久化，Application =》LacalStorage可看储存数据
                localStorage.setItem('cart',
                    window.JSON.stringify(state.cart))
            },


        },


		getters:{
            //getters依赖于state，所以state和getters的值会同步
            totalcount(state){// 徽标中的商品数量
                // 徽标中的商品数量
                let count_num = 0
                state.cart.forEach(item=>
                    count_num=count_num+item.count
                )
                return count_num
            },
            
            idStr(state){//获取所有的id字符串
                let arr = []
                state.cart.forEach(item=>arr.push(item.id))
                return arr.join(',')
            },

            countObj(state){
                //获取购物车中商品的id和商品数量的键值对的对应关系
                let obj = {}
                //循环每一项，最后这个键等于这个值(88（id）= 6（数量）)
                state.cart.forEach(item => {
                    obj[item.id] = item.count
                })
                return obj
            },


            seletedObj(state){
                //id对应的商品是否被选中了，选中时 selet：true
                let o = {}
                state.cart.forEach(item=>{
                    o[item.id] = item.select
                })
                return o
            },
            

            selectedCount(state){ //勾选商品的数量
                //勾选商品的数量
                let c = 0
                state.cart.forEach(item=>{
                    //只有商品选中了才能计算他的数量
                    if(item.select){
                        c=c+item.count
                    }
                })
                return c
            },
            amount(state){//商品总价
                //商品总价
                let c = 0
                state.cart.forEach(item=>{
                    //只有商品选中了才能计算他的价格
                    if(item.select==true){
                        c+=item.price*item.count
                    }
                })
                return c
            }
            

        },
	})


export default store//导出