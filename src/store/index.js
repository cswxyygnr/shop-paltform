import Vue from 'vue'
//引入并使用插件
import Vuex from 'vuex'
//引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopCart from './shopCart'
import user from './user/user'
Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        shopCart,
        user
    }
})