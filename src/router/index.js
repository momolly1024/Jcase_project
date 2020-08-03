import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import css from '../../css/style.css'
import store from '../store/index'
import Swal from 'sweetalert2'
Vue.use(css)

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      login: false,
      title: '首頁'
    }
  },
  {
    path: '/postcase',
    name: 'Postcase',
    component: () => import(/* webpackChunkName: "post" */ '../views/Postcase.vue'),
    meta: {
      title: '我要提案',
      login: true
    }
  },
  {
    path: '/getcase',
    name: 'Getcase',
    component: () => import(/* webpackChunkName: "get" */ '../views/Getcase.vue'),
    meta: {
      title: '我要接案',
      login: true
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "contact" */ '../views/Contact.vue'),
    meta: {
      title: '聯繫我們',
      login: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: '個人資訊',
      login: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      login: false,
      title: '登入'
    }
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import(/* webpackChunkName: "reg" */ '../views/Reg.vue'),
    meta: {
      login: false,
      title: '註冊'
    }
  },
  {
    path: '/back',
    name: 'Back',
    component: () => import(/* webpackChunkName: "back" */ '../views/Back.vue'),
    meta: {
      title: '管理員後台',
      login: false
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
    meta: {
      title: '管理員後台',
      login: false
    }
  }, {
    path: '/createadmin',
    name: 'Createadmin',
    component: () => import(/* webpackChunkName: "createadmin" */ '../components/Createadmin.vue'),
    meta: {
      title: '管理員後台',
      login: false
    }
  }, {
    path: '/question',
    name: 'Question',
    component: () => import(/* webpackChunkName: "createadmin" */ '../views/Question.vue'),
    meta: {
      title: '常見問題',
      login: false
    }
  },
  {
    path: '/coopstore',
    name: 'Coopstore',
    component: () => import(/* webpackChunkName: "coopstore" */ '../views/Coopstore.vue'),
    meta: {
      title: '合作廠商',
      login: false
    }
  }
]

const router = new VueRouter({
  routes
})

// 改變首頁TITLE
router.afterEach((to, from) => {
  document.title = to.meta.title
})

// 未登入不可訪問
router.beforeEach((to, from, next) => {
  if (to.meta.login && !store.state.user) {
    Swal.fire({
      title: '請登入會員或註冊帳號',
      timer: 1000,
      showConfirmButton: false
    })
    next('/login')
  } else {
    next()
  }
})

export default router
