//对axios进行二次封装
import axios from 'axios'
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css';
//创建axios实例对象,并自己进行拦截器配置
const requests = axios.create({
    //基础路径，发请求时路径自带/api,不用自己手写
    baseURL:'/mock',
    //超时时间
    timeout:10000,
});

//请求拦截器
requests.interceptors.request.use((config)=>{
    //config,配置对象，其中的属性 请求头headers很重要

    //进度条开始
    nprogress.start()
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