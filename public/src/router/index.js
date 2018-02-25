import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Browse from '@/views/Browse'
import Register from '@/views/Register'
import Login from '@/views/Login'
import Books from '@/views/Books'
import Dashboard from '@/views/Dashboard'
import Profile from '@/views/Profile'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/browse',
      name: 'Browse',
      component: Browse
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/books',
      secure: true,
      name: 'Books',
      component: Books,
      beforeEnter: (to, from, next) => {
        next()
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Look at all routes
  router.options.routes.forEach((route) => {
    // If this is the current route and it's secure
    if (to.matched[0].path === route.path && route.secure) {
      next()
    }
  })
  // Proceed as normal
  next()
})

export default router
