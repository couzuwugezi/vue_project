import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home.vue'
import login from '../components/login';
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home/:loginname',
      name: 'home',
      component: Home
    },
    {
      // 默认跳转
      path: '/',
      name: 'login',
      component: login
    }
  ]
})
