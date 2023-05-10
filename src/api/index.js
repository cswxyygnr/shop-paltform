//所有的api接口统一管理

//引入request
import request from './require'
import mockRequest from './mockAjax'
import { method } from 'lodash'
//三级联动接口
//地址，get请求，不携带参数
export const getCategoryList = () => {

    //发送请求,返回promise对象
    console.log(request,'request是什么')
    return request({ url: '/product/getBaseCategoryList', methods: 'get' })
}

//获取·轮播图接口
export const getBanner = () => {

    //发送请求,返回promise对象
    return mockRequest({ url: '/banner', methods: 'get' })
}

export const getFloors = () => {
    return mockRequest({ url: '/floor', methods: 'get' })
}

//获取搜索路由的数据 地址/api/list,带参数.params至少是一个空对象
export const reqSearchList = (data) => request({ url: '/list', method: 'post', data })

//获取详情页面数据接口
export const reqGoodsInfo = (skuId) => {
    return request({ url: `/item/${skuId}`, method: 'get' })
}

//将购买的物品添加到购物车中，或更改产品个数
// /api/cart/addToCart/{skuId}/{skuNum} post
export const reqAddOrUpdateShopCart = (skuId, skuNum) => request({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

//获取购物车列表的接口
// /api/cart/cartList
export const reqCartList = () => request({ url: '/cart/cartList', method: 'get' })

//删除购物车中物品的接口
export const reqDeleteCartById = (skuId) => request({url:`/cart/deleteCart/${skuId}`,method:'delete'})

//修改商品选中状态的接口
export const reqUpdateCheckedById = (skuId,isChecked) => request({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

//获取验证码的接口
export const reqGetCode = (phone)=> request({url:`/user/passport/sendCode/${phone}`,method:'get'})

//拥护注册接口
export const reqRegister = (data) => request({url:`user/passport/register`,data,method:'post'})

//登录接口
export const reqLogin = (data) => request({url:'user/passport/login',data,method:'post'})

//用户登录之后，获取用户信息接口，需要带着用户的token
export const reqUser = () => request({url:'/user/passport/auth/getUserInfo',method:'get'})

//退出登录接口
export const reqLogout = () => request({url:'/user/passport/logout',method:'get'})