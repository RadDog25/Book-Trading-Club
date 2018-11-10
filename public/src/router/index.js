import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Browse from '@/views/Browse'
import Register from '@/views/Register'
import Login from '@/views/Login'
import Books from '@/views/Books'
import Dashboard from '@/views/Dashboard'
import Profile from '@/views/Profile'
import Trade from '@/views/Trade'
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
        allowLoggedOut: true,
        handlesLoading: false
      }
    },
    {
      path: '/browse',
      name: 'Browse',
      component: Browse,
      meta: {
        allowLoggedIn: true,
        allowLoggedOut: false,
        handlesLoading: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        allowLoggedIn: false,
        allowLoggedOut: true,
        handlesLoading: false
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        allowLoggedIn: false,
        allowLoggedOut: true,
        handlesLoading: false
      }
    },
    {
      path: '/books',
      name: 'Books',
      component: Books,
      meta: {
        allowLoggedIn: true,
        allowLoggedOut: false,
        handlesLoading: false
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        allowLoggedIn: true,
        allowLoggedOut: false,
        handlesLoading: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        allowLoggedIn: true,
        allowLoggedOut: false,
        handlesLoading: true
      }
    },
    {
      path: '/trade/:id',
      name: 'Trade',
      component: Trade,
      meta: {
        allowLoggedIn: true,
        allowLoggedOut: false,
        handlesLoading: false
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  console.log(to.path, from.path)
  store.commit('startLoading')

  function handlePass (callback) {
    if (!to.meta.handlesLoading) {
      store.commit('stopLoading')
    }

    callback()
  }

  function handleLoggedInRedirect () {
    if (to.path === '/' && from.path === '/browse') {
      store.commit('stopLoading')
    }

    console.log(to.path)
    router.push('browse')
  }

  await Api.updateNotifications(to.path)

  Api.getUserData()
    .then(userData => {
      store.commit('setUser', userData)

      if (!to.meta.allowLoggedIn) {
        handleLoggedInRedirect()
      } else {
        handlePass(next)
      }
    })
    .catch(() => {
      if (!to.meta.allowLoggedOut) {
        console.log('to home')
        router.push('/')
      } else {
        handlePass(next)
      }
    })
})

export default router
