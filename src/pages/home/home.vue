<template>
  <div>
    <!-- 三级联动已全局注册，不再需要引入 -->
    <type-nav></type-nav>
    <list-container></list-container>
    <recommand-v></recommand-v>
    <rank-v></rank-v>
    <like-v></like-v>
    <floor-v v-for="(floor,index) in floors" :key="floor.id" :floor="floor"></floor-v>
    <!-- <floor-v></floor-v> -->
    <brand-v></brand-v>
  </div>
</template>

<script>
import brandV from './brand/brand.vue'
import floorV from './floor/floor.vue'
import likeV from './like/like.vue'
import listContainer from './listContainer/listContainer.vue'
import rankV from './rank/rank.vue'
import recommandV from './recommand/recommand.vue'

import { mapState } from 'vuex'

export default {
  name:'homeV',
  components:{
    listContainer,
    recommandV,
    rankV,
    likeV,
    floorV,
    brandV
  },
  
  computed:{
    ...mapState({
      floors:state => state.home.floors
    })
  },
  //获取floors，不在floor组件中发
  mounted(){
        this.$store.dispatch('getFloors')
        //获取用户信息
        this.$store.dispatch('user')
    },
}
</script>

<style>

</style>