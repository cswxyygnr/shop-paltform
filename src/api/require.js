//对axios进行二次封装
import axios from 'axios'
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css';
//在当前模块中引入store
import store from '../store'
//创建axios实例对象,并自己进行拦截器配置
const requests = axios.create({
    //基础路径，发请求时路径自带/api,不用自己手写
    baseURL:'/api',
    //超时时间
    timeout:10000,
});

//请求拦截器
requests.interceptors.request.use((config)=>{
    //config,配置对象，其中的属性 请求头headers很重要

    //进度条开始
    nprogress.start()

    //在请求拦截器中获取uuid_token
    if(store.state.detail.uuid_token){
        //给请求头添加一个字段
        config.headers.userTempId = store.state.detail.uuid_token
    }

    //登录之后，需要携带token获取用户信息
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }

    return config
});

//响应拦截器
requests.interceptors.response.use(
            (res)=>{
                //成功的回调，服务器数据收到后，拦截器可以检测到，并运行回调
                //进度条结束
                nprogress.done()
                return res.data;
            },
            ()=>{
                //失败的回调
                return Promise.reject(new Error('faile'));
    })      

export default requests