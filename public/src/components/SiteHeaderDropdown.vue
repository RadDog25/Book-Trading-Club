<template>
  <li class="main-menu-item dropdown-item">

    <a>
      <img class="image" :src="imageSrc">
    </a>

    <nav class="dropdown-navigation">
      <ul class="dropdown-menu">

        <li class="dropdown-menu-item">
          <router-link to="/dashboard">
            Dashboard
          </router-link>
        </li>

        <li class="dropdown-menu-item">
          <router-link to="/profile">
            Profile
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
import { mapState, mapActions } from 'vuex'
export default {
  name: 'SiteHeaderDropdown',
  computed: {
    imageSrc () {
      return require(`@/assets/profile${this.user.avatar + 1}.png`)
    },
    ...mapState([
      'user'
    ])
  },
  methods: {
    handleLogoutClick () {
      this.logout(this.$router)
    },
    ...mapActions([
      'logout'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
