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
            <a href="#logout">
              Logout
            </a>
          </li>

      </ul>
    </nav>

  </li>
</template>

<script>
export default {
  name: 'SiteHeaderDropdown',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
