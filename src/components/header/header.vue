<template>
  <div>
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>尚品汇欢迎您！</p>
                    <p v-if="!userName">
                        <span>请</span>
                        <!-- 声明式导航 -->
                        <router-link to="/login">登录</router-link>
                        <router-link to="/register" class="register">免费注册</router-link>
                    </p>
                    <p v-else>
                        <a>欢迎登陆{{ userName }}</a>
                        <a class="register" @click="logout">退出登录</a>
                    </p>
                </div>
                <div class="typeList">
                    <router-link to="/shopCart">我的购物车</router-link>
                    <a href="###">我的尚品汇</a>
                    <a href="###">尚品汇会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注尚品汇</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <router-link class="logo" title="尚品汇" target="_blank" to="/home">
                    <img src="./images/logo.png" alt="">
                </router-link>
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <input 
                        type="text" 
                        id="autocomplete" 
                        class="input-error input-xxlarge" 
                        v-model="keyWord"/>
                    <button 
                        class="sui-btn btn-xlarge btn-danger" 
                        type="button" 
                        @click="goSearch"
                        >搜索</button>
                </form>
            </div>
        </div>
    </header>
  </div>
</template>

<script>
export default {
    name:'headerV',
    data(){
        return {
            keyWord:'',
            searchParams:{
                category1Id:'',
                category2Id:'',
                category3Id:'',
                categoryName:'',
                //排序
                keyWord:'',
                order:'',
                //分页器，当前页数
                pageNo:1,
                //每一页的数据数
                pageSize:10,
                //平台售卖属性展示
                props:[],
                //品牌
                trademark:''
            }
        }
    },
    methods:{
        goSearch(){
            let location = {params:{keyWord:this.keyWord}}
            if(this.$route.query){
                location.query = this.$route.query
            }
            if(this.$route.name !== 'search'){
                // console.log(this.$route.name)
                location.name = 'search'
                this.$router.push(location)
            }else{
                // console.log(this.$route.name)
                // this.$router.push({params:this.keyWord,query:this.$route.query})
                this.$router.push(location)
            }
    },
    
    //退出登录
    logout(){
        //发请求，通知服务器清除数据
        //前端的本地存储也要清除
        this.$store.dispatch('userLogout')
        //退出成功回到首页
        this.$router.push({name:'home'})
    }
},
    computed:{
        userName(){
            return this.$store.state.user.userInfo.name
        }
    }
}
</script>

<style lang="less" scoped>
     .header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }
</style>