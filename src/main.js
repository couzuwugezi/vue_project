import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import qs from 'qs';
import Vuex from 'vuex';

Vue.prototype.$qs = qs;
Vue.prototype.$axios = axios;
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.config.productionTip = false;

// 拦截所有的请求
axios.interceptors.request.use(config => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// http response 拦截器
axios.interceptors.response.use(
  response => {
    // 如果是登录命令并且返回登陆成功,则在session中写入true
    if (response.config.url === '/manage/checkLogin' && response.data.code === '1') {
      sessionStorage.setItem("hasLogin", 'true');
    }
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          router.replace({
            path: '/'
          })
      }
    }
    return Promise.reject(error.response.data);
  });


// 路由跳转拦截器
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (sessionStorage.getItem("hasLogin") === 'true') {  // 通过vuex state获取当前的token是否存在
      next();
    } else {
      next({
        path: '/'
      })
    }
  } else {
    next();
  }
});

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
