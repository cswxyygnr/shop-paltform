import Vue from 'vue'
import vueRouter from 'vue-router'
//引入store，方便进行路由守卫的判断
import store from '@/store'

Vue.use(vueRouter)
//引入组件
import Home from '../pages/home/home.vue'
import Login from '../pages/login/index.vue'
import Register from '../pages/register/index.vue'
import Search from '../pages/search/search.vue'
import Detail from '../pages/detail/index.vue'
import AddCartSuccess from '../pages/addCartSuccess/index.vue'
import ShopCart from '../pages/shopCart'

let router = new vueRouter({
    //配置路由
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            name: 'home',
            path: '/home',
            component: Home,
            meta: { show: true }
        },

        {
            name: 'detail',
            path: '/detail/:skuId',//params参数占位
            component: Detail,
            meta: { show: false }
        },

        {
            name: 'login',
            path: '/login',
            component: Login,
            meta: { show: false }
        },
        {
            name: 'register',
            path: '/register',
            component: Register,
            meta: { show: false }
        },
        {
            path: '/search',
            component: Search,
            meta: { show: true },
            name: 'search'
        },
        {
            name: 'addCartSuccess',
            path: '/addCartSuccess',
            meta: { show: true },
            component: AddCartSuccess,
        },
        {
            path: '/shopCart',
            name: 'shopCart',
            component: ShopCart

        },

        {
            name: 'register',
            path: '/register',
            component: Register
        }
    ],
    scrollBehavior() {
        //滚动条在最上方
        return { y: 0 }
    }
})

export default router;

//全局前置路由守卫
router.beforeEach((to, from, next) => {
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    if (token&&name) {
        //用户已登录就不能再去login了
        if (to.path === '/login') {
            next('/')
        } else{
            next()
        }
        // else {
        //     if (name) next()
        //     //登录但去的不是login
        //     //判断用户信息是否有，没有则派发action获取
        //     else {
        //         console.log('去拿用户信息')//没有问题这里执行了
        //         // store.dispatch('user')
        //         next()
        //     }
        // }
    } else {
        //未登录
        next()
    }
})