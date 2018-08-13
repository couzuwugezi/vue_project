import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home.vue'
import login from '../components/login';
import regist from '../components/regist';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/regist',
      name: 'regist',
      component: regist
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
