import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home.vue'
import login from '../components/login';
import sendMsgLog from '../components/accessLog/sendMsgLog';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      meta: {
        requireAuth: true,
      },
      component: Home,
      children: [
        {
          path: '/sendMsgLog',
          name: 'sendMsgLog',
          component: sendMsgLog,
          meta: {
            requireAuth: true,
          }
        }
      ]
    },
    {
      // 默认跳转
      path: '/',
      name: 'login',
      component: login
    }
  ]
})
