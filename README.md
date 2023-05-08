axios二次封装，主要是配置拦截器

在项目当中，经常创建api文件夹【axios】

项目很小时可以直接在生命周期钩子中发送请求

但项目很大时axios.get(xxx)

跨域问题：协议，域名，端口号不同。称之为跨域；
http://localhost:8080/#/home   ---项目本地服务器
http://gmall-h5-api.atguigu.cn    ----后台服务器

代理解决跨域问题：在vue.config.js中配置代理服务器devServer:{}

进度条的使用：nprogress

vuex 状态管理,插件,集中管理项目中组件公用的数据;

防抖
节流

三级联动的路由跳转

mock数据模拟
准备json数据，注意空格
把mock需要的图片放到public文件夹下
创建mockServe.js文件
在入口文件中引入该文件

 <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 综合|价格排序的地方 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="sort(1)">
                  <a
                    >综合
                    <span
                      v-show="isOne"
                      class="iconfont"
                      :class="{ 'icon-xiafan': isDesc, 'icon-shangfan': isAsc }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="sort(2)">
                  <a
                    >价格
                    <span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{ 'icon-xiafan': isDesc, 'icon-shangfan': isAsc }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>

<!-- 分页的地方 -->
          <div class="fr page">
            <Pagination
              :total="total"
              :pageSize="searchParams.pageSize"
              :pageNo="searchParams.pageNo"
              :pagerCount="5"
              @currentPage="currentPage"
            ></Pagination>
          </div>