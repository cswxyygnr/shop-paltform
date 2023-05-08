import { reqGoodsInfo ,reqAddOrUpdateShopCart} from "@/api"
import {getUUID} from '../../utils/uuid_token'

const state = {
    goodInfo:{},
    uuid_token:getUUID()
}

const actions = {
    async getDetailInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId)
        console.log(result)
        if(result.code == 200){
            commit('GETDETAILINFO',result.data)
        }
    },

    async addOrUpdateCart({commit},{skuId,skuNum}){
        // console.log(data)
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        //不再需要仓库存储数据了，服务器存储
        console.log('存储商品信息成功与否',result)
        if(result.code == 200){
            return Promise.resolve(1)
        }else{
            return new Error('加入失败')
        }
    }
}

const mutations = {
    GETDETAILINFO(state,data){
        state.goodInfo = data
    },
}

const getters = {
    categoryView(state){
        return state.goodInfo.categoryView
    },

    skuInfo(state){
        return state.goodInfo.skuInfo
    },

    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}