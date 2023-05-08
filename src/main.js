import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入仓库
import store from './store'
//三级联动组件(全局)
import typeNav from './components/typeNav/typeNav.vue'
import pagiNation from './components/pagination/pagiNation.vue'
import './mock/mockServe'//没有对外暴露，引入时自动执行一次
//引入swipper样式
import 'swiper/css/swiper.css'
// import { reqGetSearch } from './api'
import ElementUI from 'element-ui';

Vue.use(ElementUI)
Vue.component('typeNav',typeNav)
Vue.component('pagiNation',pagiNation)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  //注册路由,组件的身上会多了一个$route属性
  router,
  //注册仓库,组件的身上会多了一个$store属性
  store
}).$mount('#app')
