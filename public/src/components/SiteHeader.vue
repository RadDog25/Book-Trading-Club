<template>
  <header id="masthead" class="site-header black small layout-container">

    <site-branding class="small"></site-branding>

    <nav id="site-navigation" class="main-navigation">
      <ul class="main-menu">

          <li class="main-menu-item browse-item">
            <router-link to="/browse">
              Browse
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
import SiteBranding from '@/components/SiteBranding'

export default {
  name: 'SiteHeader',
  components: {
    SiteHeaderDropdown,
    SiteBranding
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
