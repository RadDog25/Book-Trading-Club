<template>
  <header id="masthead" class="site-header layout-container">

    <router-link class="site-branding" to="/">
      <h1 class="site-title">BOOKCLUB</h1>
    </router-link>

    <nav id="site-navigation" class="main-navigation">
      <ul class="main-menu">

          <li class="main-menu-item home-item">
            <router-link to="/">
              Home
            </router-link>
          </li>

        <li class="main-menu-item books-item">
          <router-link to="/books">
            Books
          </router-link>
        </li>

        <li class="main-menu-item register-item">
          <router-link to="/register">
            Register
          </router-link>
        </li>

        <li class="main-menu-item login-item">
          <router-link to="/login">
            Login
          </router-link>
        </li>

        <li class="main-menu-item search-item">
          <a href="#search" class="search">
            <i class="fa fa-search"></i>
          </a>
        </li>

        <site-header-dropdown/>

      </ul>
    </nav>

  </header>
</template>

<script>
import SiteHeaderDropdown from '@/components/SiteHeaderDropdown'

export default {
  name: 'SiteHeader',
  components: {
    SiteHeaderDropdown
  },
  data () {
    return {

    }
  },
  mounted () {
    console.log(this.$router, this.$route)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
