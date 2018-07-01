<template>

  <div id="page" class="site">

    <header id="masthead" class="site-header large layout-container">

      <site-branding class="large"></site-branding>

      <router-link class="button login" to="/login">
        Sign In
      </router-link>

    </header>

    <div id="content" class="site-content">

      <div class="form-container layout-row">

        <h1 class="heading hed2">Register</h1>

        <form method="POST" action="/register" @submit.prevent="onSubmit">

          <div class="control" :class="{ 'has-errors': errors.username }">

            <label for="email">Email</label>

            <input v-model="username" type="text" id="email" name="email">

            <div class="error" v-if="errors.username">{{ errors.username }}</div>

          </div>

          <div class="control" :class="{ 'has-errors': errors.password }">

            <label for="password">Password</label>

            <input v-model="password" type="text" id="password" name="password">

            <div class="error" v-if="errors.password">{{ errors.password }}</div>

          </div>

          <div class="control">
            <input type="submit" id="submit" name="submit" class="button submit large">
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
import Api from '@/Api'

export default {
  name: 'Register',
  components: {
    SiteBranding,
    SiteFooter
  },
  data () {
    return {
      username: '',
      password: '',
      errors: {}
    }
  },
  methods: {
    onSubmit () {
      Api.register(this.username, this.password)
        .then(() => {
          this.errors = {}
          this.$router.push('login')
        })
        .catch(errors => {
          this.errors = errors.response.data
          console.log(errors.response.data)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
