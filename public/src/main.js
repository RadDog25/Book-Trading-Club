// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'
import 'font-awesome/css/font-awesome.css'
import 'normalize.css/normalize.css'
import './helpers'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  computed: {
    modalIsActive () {
      return !Object.values(store.state.modal.items)
        .every(item => !item.isActive)
    }
  },
  watch: {
    modalIsActive () {
      window.toggleBodyScrolling()
    }
  }
})
