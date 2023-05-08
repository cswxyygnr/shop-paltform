import { reqCartList,reqDeleteCartById ,reqUpdateCheckedById} from "@/api"
const state = {
    cartList:[]
}
const mutations = {
    GETCARTLIST(state,data){
        state.cartList = data
    }
}
const actions = {
    async getCartList({commit}){
        let result = await reqCartList()
        console.log(result)
        if(result.code == 200){
            commit('GETCARTLIST',result.data)
        }
    },
    async deleteCartById({commit},skuId){
        let result = await reqDeleteCartById(skuId)
        if(result.code == 200){
            return '已删除'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async UpdateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked)
        if(result.code==200){
            return '已修改'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //删除全部勾选的商品
    deleteAllCheckedCart({dispatch,getters}){
        //context是当前小仓库哦,将dispatch,getters从context中结构出来
        getters.cartInfoList.forEach(item => {
            let promise = item.isChecked==1?dispatch('deleteCartById',item.skuId):Promise.reject('err');
            // 将每一次返回的promise push进数组中 
            console.log(promise)          
        });
    },
    //修改全部商品的状态
    updateAllCartChecked({dispatch,getters},isChecked){
        getters.CartInfo.cartInfoList.forEach(item =>{
            dispatch('UpdateCheckedById',{skuId:item.skuId,isChecked:isChecked})
        })
    }
}

//为了简化仓库中的数据而生
const getters = {
    CartInfo(state){
        return state.cartList[0]||{}
    },//cartInfoList 还在这个对象里面

    cartInfoList(state){
        return state.cartList[0].cartInfoList||[]
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}