<template>

  <div id="page" class="site">

    <header id="masthead" class="site-header large layout-container">

      <site-branding class="large"></site-branding>

    </header>

    <div id="content" class="site-content">

      <div class="form-container layout-row">

        <h1 class="heading hed2">Sign In</h1>

        <form method="POST" action="/login">

          <div class="control">

            <label for="email">Email</label>

            <input type="text" id="email" name="email">

          </div>

          <div class="control">

            <label for="password">Password</label>

            <input type="text" id="password" name="password">

          </div>

          <div class="control">
            <a class="button submit large">Sign In</a>
          </div>

        </form>

      </div>

    </div>

    <site-footer/>

  </div>

</template>

<script>
import SiteBranding from '@/components/SiteBranding'
import SiteFooter from '@/components/SiteFooter'

export default {
  name: 'Register',
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
