import { reqGetCode,reqLogin,reqRegister,reqUser,reqLogout} from "@/api"
import {setToken} from '@/utils/token'
const state = {
    code:'',
    token:localStorage.getItem('TOKEN'),
    userInfo:{}
}
const mutations = {
    //获取验证码
    GETCODE(state,data){
        state.code = data
    },

    //登录，返回token
    USERLOGIN(state,data){
        state.token = localStorage.getItem('TOKEN')
    },
    //获取用户信息
    USER(state,data){
        state.userInfo = data
    },
    //退出登录清除token
    CLEAR(state){
        state.token = ''
        state.userInfo = {}
        //清除本地存储
        localStorage.removeItem('TOKEN')
    }

}
const actions = {
   //获取验证码
   async getCode({commit},phone){
    let result = await reqGetCode(phone)
    console.log(result.data)
    if(result.code==200){
        commit('GETCODE',result.data)
    }else{
        return Promise.reject(new Error('faile'))
    }
   },
   //拥护注册
   async Register({commit},data){
    let result = await reqRegister(data)
    console.log(result)
    if(result.code==200){
        return '已注册'
    }else{
        return Promise.reject(new Error('faile'))
    }
   },

   //用户登录
   async userLogin({commit},data){
    let result = await reqLogin(data)
    console.log(result)
    if(result.code==200){
        //在仓库中存储token，但不持久，一刷新页面就没了，在这里可以用浏览器本地存储,但在刷新时没有用该token,需要在state中获取本地存储
        commit('USERLOGIN',result.data)
        // localStorage.setItem('TOKEN',result.data.token)
        setToken(result.data.token);

        return '已登陆'
    }else{
        return Promise.reject(new Error('faile'))
    }
   },

   //登录之后，获取用户信息
   async user({commit}){
    let result = await reqUser()
    // console.log(result)
    if(result.code==200){
        // console.log('路由守卫调用在这里的user')没有输出
        commit('USER',result.data)
    }
   },

   //退出登录
   async userLogout({commit}){
        let result = await reqLogout()
        if(result.code == 200){
            commit('CLEAR')
        }
   }
}

//为了简化仓库中的数据而生
const getters = {
   
}

export default {
    state,
    mutations,
    actions,
    getters
}