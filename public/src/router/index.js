import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Browse from '@/views/Browse'
import Register from '@/views/Register'
import Login from '@/views/Login'
import Books from '@/views/Books'
import Dashboard from '@/views/Dashboard'
import Profile from '@/views/Profile'
import store from '@/store.js'
import Api from '@/Api.js'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        allowLoggedIn: false,
        allowLoggedOut: true
      }
    },
    {
      path: '/browse',
      name: 'Browse',
      component: Browse,
      meta: {
        allowLoggedIn: true,
        allowLoggedOut: false
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        allowLoggedIn: false,
        allowLoggedOut: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        allowLoggedIn: false,
        allowLoggedOut: true
      }
    },
    {
      path: '/books',
      name: 'Books',
      component: Books,
      meta: {
        allowLoggedIn: true,
        allowLoggedOut: false
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        allowLoggedIn: true,
        allowLoggedOut: false
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        allowLoggedIn: true,
        allowLoggedOut: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to.path, from.path)

  Api.getUserData()
    .then(userData => {
      store.commit('setUser', userData)
      if (!to.meta.allowLoggedIn) {
        console.log('to browse')
        router.push('browse')
      } else {
        next()
      }
    })
    .catch(error => {
      console.error(error)
      if (!to.meta.allowLoggedOut) {
        console.log('to home')
        router.push('/')
      } else {
        next()
      }
    })
})

export default router
