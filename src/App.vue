<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/header/header.vue'
import Footer from './components/footer/footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },

  methods:{
    
  },

  mounted(){
    //请求三级列表list数据
    this.$store.dispatch('getList')
    //获取用户信息，避免刷新后退出登陆的情况
    this.$store.dispatch('user')

   
    // 关闭浏览器窗口的时候清空浏览器缓存在localStorage的数据
    window.addEventListener('beforeunload',()=>{
            localStorage.removeItem('token');
        });

  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
