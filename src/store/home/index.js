//引入接口函数
import { getCategoryList, getBanner,getFloors } from "@/api"
//home模块的小仓库
const state = {
    list: [],
    banner: [],
    floors:[]
}

const mutations = {
    GETCATEGORYLIST(state, list) {
        state.list = list
    },

    GETBANNER(state, banner) {
        state.banner = banner
    },

    GETFLOORS(state,floors){
        state.floors = floors
    }
}

const actions = {
    //通过api里的接口发请求获取服务器数据
    async getList({ commit }) {
        let result = await getCategoryList()
        // console.log(result)
        if (result.code === 200) {
            commit('GETCATEGORYLIST', result.data)
        }
    },

    async getBanner({ commit }) {
        let result = await getBanner()
        // console.log(result)
        if (result.code === 200) {
            commit('GETBANNER', result.data)
        }
    },

    async getFloors({commit}){
        let result = await getFloors()
        if (result.code === 200) {
            commit('GETFLOORS', result.data)
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}