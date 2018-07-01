<template>
  <li class="main-menu-item dropdown-item">

    <router-link to="/profile">
      <img class="image" :src="imageSrc">
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
import { mapState, mapMutations, mapActions } from 'vuex'
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
    ...mapMutations([
      'setUser'
    ]),
    ...mapActions([
      'logout'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
