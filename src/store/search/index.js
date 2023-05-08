//search模块的小仓库
import { reqSearchList } from "@/api"
const state = {
    searchlist:{}
}
const mutations = {
    REQGETSEARCH(state,searchlist){
        state.searchlist = searchlist
    }
}
const actions = {
    async getSearchList({commit},params){
        let result = await reqSearchList(params)
        // console.log(result)
        if(result.code===200){
            commit('REQGETSEARCH',result.data)
        }
    },
}

//为了简化仓库中的数据而生
const getters = {
    goodsList(state){
        //有问题
        return state.searchlist.goodsList||[]
    },

    trademarkList(state){
        return state.searchlist.trademarkList||[]
    },

    attrsList(state){
        return state.searchlist.attrsList||[]
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}