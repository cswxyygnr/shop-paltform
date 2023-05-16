<template>
   <div class="type-nav">
        <div class="container">
            <h2 class="all" @mouseenter="enterShow">全部商品分类</h2>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
            <!-- transition过渡动画 只能配合v-show，v-if指令使用-->
            <transition>
                <div class="sort" @mouseleave="leaveShow" v-show="show">
                <div class="all-sort-list2" @click="jump">
                    <div 
                        class="item" 
                        v-for="(i1,index) in list" 
                        :key="i1.categoryId"
                        :class="{cur:currentIndex==index}"
                    >
                        
                        <h3 @mouseenter="changeIndex(index)">
                            <a  :data-name="i1.categoryName" :data-id1="i1.categoryId">{{ i1.categoryName }}</a>
                        </h3>
                        <!-- 动态添加类实现二三级菜单的显示与隐藏 -->
                        <div class="item-list clearfix" :style="{display:currentIndex===index?'block':'none'}">
                            <div class="subitem" v-for="i2 in i1.categoryChild" :key="i2.categoryId">
                                <dl class="fore">
                                    <dt>
                                        <a :data-name="i2.categoryName" :data-id2="i2.categoryId">{{ i2.categoryName }}</a>
                                    </dt>
                                    <dd>
                                        <em v-for="i3 in i2.categoryChild" :key="i3.categoryId">
                                            <a :data-name="i3.categoryName" :data-id3="i3.categoryId">{{ i3.categoryName }}</a>
                                        </em>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </transition>
            
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import throttle from 'lodash/throttle'
export default {
    name:'typeNav',
    data(){
        return {
            currentIndex:-1,
            show:true
        }
    },
    methods:{
        changeIndex:throttle(function(index){//节流函数
            this.currentIndex = index
        },50),

        reset(){
            this.currentIndex = -1
        },

        //事件委派，不在a标签上添加回调，因为标签过多时很麻烦，采用事件委派即给共有的父元素添加回调，并对标签添加自定义属性，以分辩点击的是哪个
        jump(e){
            console.log('event',e.target.dataset)
            let ele = e.target
            let {name,id1,id2,id3} = ele.dataset
            let location = {}
            let query = {}
            if(name){
                query.categoryName = name
                if(id1){
                    query.category1Id = id1
                }else if(id2){
                    query.category2Id = id2
                }else{
                    query.category3Id = id3
                }
            }
            //判断路由跳转时，是否带有params参数
            location.params = this.$route.params||{}
            location.query = query
            if(this.$route.name !== 'search'){
                location.name = 'search'
                this.$router.push(location)
            }else{
                console.log('路由未跳转，仅仅修改query参数')
                this.$router.push(location)
            }
        },

        enterShow(){
            if(this.$route.name !=='home'){
            this.show = true
        }
        },

        leaveShow(){
            this.currentIndex = -1
            if(this.$route.name !=='home'){
            this.show = false
        }
        }
    },
    computed:{
        ...mapState({
        //使用此计算属性时，右侧的箭头函数会自动调用
        //注如一个参数state是大仓库中的数据，包括home，search中的state
        // list: state => {return state.home.list}
        list: state => state.home.list //简写
        })
    },
    mounted(){
        //通知vuex发请求，获取数据存于home小仓库中，
        //缺点是每次用到typenav组件都要发一次请求，性能不太好，放到app组件只用发一次请求
        // this.$store.dispatch('getList')
        
        if(this.$route.name !== 'home')this.show = false
    }
}
</script>

<style lang="less" scoped>
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .cur{
                            background-color: skyblue;
                        }
                }
            }

            .v-enter{
                height:0;
            }

            .v-enter-to{
                height:461px;
            }
            
            .v-enter-active{
                transition:1s;
            }
        }
    }
</style>