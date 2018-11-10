<template>

  <div id="page" class="site">

    <header id="masthead" class="site-header large layout-container">

      <site-branding class="large"></site-branding>

    </header>

    <div id="content" class="site-content">

      <div class="form-container layout-row">

        <h1 class="heading hed2">Sign In</h1>

        <form method="POST" action="/login" @submit.prevent="onSubmit">

          <div class="control" :class="{ 'has-errors': errors.email }">

            <label for="email">Email</label>

            <input ref="email" v-model="email" type="text" id="email" name="email">

            <div class="error" v-if="errors.email">{{ errors.email }}</div>

          </div>

          <div class="control" :class="{ 'has-errors': errors.password }">

            <label for="password">Password</label>

            <input v-model="password" type="text" id="password" name="password">

            <div class="error" v-if="errors.password">{{ errors.password }}</div>

          </div>

          <div class="control">
            <input type="submit" id="submit" name="submit" value="Sign In" class="button submit large">
          </div>

        </form>

      </div>

    </div>

    <site-footer/>

  </div>

</template>

<script>
import { mapMutations } from 'vuex'
import SiteBranding from '@/components/SiteBranding'
import SiteFooter from '@/components/SiteFooter'
import Api from '@/Api'

export default {
  name: 'Login',
  components: {
    SiteBranding,
    SiteFooter
  },
  data () {
    return {
      email: '',
      password: '',
      errors: {}
    }
  },
  methods: {
    onSubmit () {
      Api.login(this.email, this.password)
        .then(userData => {
          this.errors = {}
          this.setUser(userData)
          this.$router.push('browse')
        })
        .catch(errors => {
          console.log(errors)

          if (errors && errors.response && errors.response.data) {
            this.errors = errors.response.data
          }
        })
    },
    ...mapMutations([
      'setUser'
    ])
  },
  mounted () {
    setTimeout(() => {
      this.$refs.email.focus()
    }, 0)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
