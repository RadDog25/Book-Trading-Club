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

export default new Router({
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
      name: 'Books',
      component: Books
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
