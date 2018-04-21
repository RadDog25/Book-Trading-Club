<template>
  <li class="main-menu-item dropdown-item">

    <router-link to="/profile">
      <img class="image" src="@/assets/profile-default.png">
    </router-link>

    <nav class="dropdown-navigation">
      <ul class="dropdown-menu">

          <li class="dropdown-menu-item">
            <router-link to="/profile">
              Profile
            </router-link>
          </li>

          <li class="dropdown-menu-item">
            <router-link to="/dashboard">
              Dashboard
            </router-link>
          </li>

          <li class="dropdown-menu-item">
            <a @click="handleLogoutClick" href="#logout">
              Logout
            </a>
          </li>

      </ul>
    </nav>

  </li>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'SiteHeaderDropdown',
  data () {
    return {

    }
  },
  methods: {
    handleLogoutClick () {
      window.setCookie('token', null)
      this.set({
        key: 'user',
        value: null
      })
      this.$router.push('login')
    },
    ...mapMutations([
      'set'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
