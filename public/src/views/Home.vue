<template>

  <div id="page" class="site">

    <header id="masthead" class="site-header large layout-container">

      <site-branding class="large"></site-branding>

      <router-link class="button login" to="/login">
        Sign In
      </router-link>

    </header>

    <div id="content" class="site-content">

      <div class="cta-container layout-container">

        <h1 class="heading hed1">
          Welcome to Bookclub.
        </h1>

        <div class="subheading">
          See what books are waiting for you.
        </div>

        <router-link class="button register large uppercase" to="/register">
          Join for Free
        </router-link>

      </div>

    </div>

    <site-footer/>

  </div>

</template>

<script>
import SiteBranding from '@/components/SiteBranding'
import SiteFooter from '@/components/SiteFooter'

export default {
  name: 'Home',
  components: {
    SiteBranding,
    SiteFooter
  },
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
