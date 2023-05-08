<template>
  <div>
    <!-- 全局组件商品分类 -->
    <type-nav></type-nav>

    <div class="main">
      <div class="py-container">
        <!--bread:面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!--商品的名字的面包屑的地方  -->
            <li class="with-x" v-show="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeBrand">x</i>
            </li>
            <!-- 关键字面包屑的地方 -->
            <li class="with-x" v-show="searchParams.keyWord">
              {{ searchParams.keyWord }}<i @click="removeKey">x</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-show="searchParams.trademark">
              {{ searchParams.trademark.split(':')[1]
              }}<i @click="removeb">x</i>
            </li>

            <!-- 商品属性值面包屑的地方 -->
            <li class="with-x" v-for="(attrValue, index) in searchParams.props" :key="index">
              {{ attrValue.split(":")[1] }}
            </li><i @click="removeValue">x</i>
          </ul>
        </div>

        <!--selector:子组件-->
        <SearchSelector @getChildMsg="getChildMsg" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <!-- 商品展示区域 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good, index) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!--商品的图片:需要路由跳转的时候,携带商品的ID-->
                    <router-link :to="`/detail/${good.id}`">
                      <img :src="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a :title="good.title">{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>{{ good.id }}</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a target="_blank" class="sui-btn btn-bordered btn-danger" @click="addOrUpdateCart(good.id)">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页的地方 -->
          <pagiNation :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5"
            @getPageMsg="getPageMsg"></pagiNation>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        category1Id: '',
        category2Id: '',
        category3Id: '',
        categoryName: '',
        keyWord: '',
        //排序,初始综合降序
        order: '1:desc',
        //分页器，当前页数
        pageNo: 5,
        //每一页的数据数
        pageSize: 5,
        //平台售卖属性展示
        props: [],
        //品牌
        trademark: ''
      },
      alert:false
    }
  },

  components: {
    SearchSelector
  },

  beforeMount() {
    //在挂载完毕前，需要将路由信息里的参数赋值给searchParams
    //es6合并对象
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },

  mounted() {
    this.getData()
    console.log(this.goodsList)
  }
  ,
  computed: {
    ...mapGetters(['goodsList']),
    ...mapState({
      total: state => state.search.searchlist.total
    })
  },

  methods: {
    //根据参数不同向服务器发请求获取不同的数据
    getData() {
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    //删除面包屑1
    removeBrand() {
      this.searchParams.categoryName = ''

      this.searchParams.category1Id = ''
      this.searchParams.category2Id = ''
      this.searchParams.category3Id = ''
      this.$router.push({ name: 'search', params: this.$route.params, query: {} })
      this.getData()
    },
    removeKey() {
      this.searchParams.keyWord = ''
      this.$router.push({ name: 'search', query: this.$route.query, params: {} })
      this.getData()
    },
    removeb() {
      this.searchParams.trademark = ''
      this.getData()
    },
    removeValue() { },

    //自定义事件，获取子组件信息
    getChildMsg(trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      console.log(this.searchParams.trademark)
      this.getData()
    },
    //自定义事件，获取子组件信息
    attrInfo(attr, attrValue) {
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
      this.props.push(props)
      this.getData()
    },

    getPageMsg(pageNo) {
      this.searchParams.pageNo = pageNo
      this.getData();
    },

    async addOrUpdateCart(id) {
      //发请求存储购物信息    
      //信息在服务器不在仓库
      // console.log(this.$route.params.skuId,this.skuNum)这里没问题
      let result = await this.$store.dispatch('addOrUpdateCart', { skuId: id, skuNum: 1 })
      //判断请求是否成功，但请求结果promise，组件拿不到,上面的函数有返回值promise对象
      // console.log(result)
      if (result === 1) {
        alert('加入成功')
      }else{
        alert('加入失败')
      }

    }
  },

  watch: {
    deep: true,
    $route() {
      //发请求之前整理参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.getData('getSearchList', this.searchParams)
      this.searchParams.category1Id = undefined //undefined值比空字符串好，这个参数不会被携带，提高了速度
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
    }
  }//监听路由信息的变化以便再次发请求，拉取数据
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 155px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>