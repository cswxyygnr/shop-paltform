<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart, index) in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked" @change="changeChecked(cart, $event)" />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="handle(cart, 'min', -1)">-</a>
            <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt"
              @input="handle(cart, 'change', $event.target.value * 1)" />
            <a @click="handle(cart, 'add', 1)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" @change="updateAllChecked($event)"
          :checked="isCartChecked && cartInfoList.length > 0" />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a>移到我的关注</a>
        <a>清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ cartInfoList.length }}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <!-- 路由跳转:没有任何业务逻辑,声明式、编程式导航都可以 -->
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
//按需引入lodash节流函数
import throttle from "lodash/throttle";
//按需引入lodash防抖函数
import debounce from "lodash/debounce";
export default {
  name: "ShopCart",
  //组件挂载完毕,获取购物车的数据
  mounted() {
    //获取购物车的数据
    this.getData();
  },
  computed: {
    ...mapGetters(["CartInfo"]),
    //购物车的数据
    cartInfoList() {
      return this.CartInfo.cartInfoList || [];
    },
    //购物车商品总价
    totalPrice() {
      return this.cartInfoList.reduce((a, b) => a + b.skuPrice * b.skuNum, 0);
    },
    isCartChecked() {
      //购物车里面的数据进行过滤(勾选)，如果勾选的商品与购物车商品总数相等。全选勾选！相反不够！！！
      return this.cartInfoList.every(item => item.isChecked == 1)
    }
  },
  methods: {
    //获取个人购物车的数据请求函数
    getData() {
      this.$store.dispatch("getCartList");
    },
    //添加和减少购物量,节流函数500毫秒内只能点一次
    handle: throttle(async function (cart, type, final) {
      //向服务器发请求修改数量
      switch (type) {
        case 'add': final = 1; break;

        //判断数量是否大于一
        case 'min': if (cart.skuNum > 1) {
          final = -1
        } else { final = 0 } break;

        case 'change':
          if (isNaN(final) || final < 1) {
            final = 0
          } else {
            final = parseInt(final) - cart.skuNum
          }
          break;
      }
      try {
        await this.$store.dispatch('addOrUpdateCart', { skuId: cart.skuId, skuNum: final })
        this.getData()
      } catch (e) { }

    }, 1000),

    //删除产品的操作
    async deleteCartById(cart) {
      try {
        await this.$store.dispatch('deleteCartById', cart.skuId)
        this.getData()
      } catch (e) {
        alert('删除失败了')
      }

    },

    //修改产品选中状态
    async changeChecked(cart, event) {
      try {
        let checked = event.target.checked ? 1 : 0
        this.$store.dispatch('UpdateCheckedById', { skuId: cart.skuId, isChecked: checked })
        this.getData()
      } catch (e) {
        alert('修改出错了')
      }

    },
    //全选按钮的实现
    updateAllChecked(event){
      let check = event.target.checked?1:0
      this.$store.dispatch('updateAllCartChecked',check)
      this.getData()
    },
    //删除选中的全部产品,多次调用删除单个产品的接口,没办法收集到有用的数据，如cart等
    async deleteAllCheckedCart() {
      try {
        await this.$store.dispatch('deleteAllCheckedCart')
        this.getData()
      } catch (e) { }
    }

  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>