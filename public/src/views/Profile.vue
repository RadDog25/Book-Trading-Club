<template>

  <div id="page" class="site">

    <site-header/>

    <div id="content" class="site-content layout-container">

      <div class="site-content-inner layout-row">

      <div class="left column">

        <div class="form-container">

          <h1 class="heading hed2">Change Password</h1>

          <form method="POST" @submit.prevent="submitChangePassword">

            <div class="control" :class="{ 'has-changePasswordErrors': changePasswordErrors.oldPassword }">

              <label for="email">Old Password</label>

              <input v-model="oldPassword" type="text" id="email" name="email">

              <div class="error" v-if="changePasswordErrors.oldPassword">{{ changePasswordErrors.oldPassword }}</div>

            </div>

            <div class="control" :class="{ 'has-errors': changePasswordErrors.newPassword }">

              <label for="newPassword">New Password</label>

              <input v-model="newPassword" type="text" id="password" name="password">

              <div class="error" v-if="changePasswordErrors.newPassword">{{ changePasswordErrors.newPassword }}</div>

            </div>

            <div class="control">
              <input type="submit"
              name="submit"
              class="button submit large"
              value="Save"
              >
            </div>

          </form>

        </div>

        <div class="form-container">

          <h1 class="heading hed2">Location</h1>

          <form method="POST" @submit.prevent="submitChangeLocation">

            <div class="control" :class="{ 'has-errors': changeLocationErrors.oldPassword }">

              <label for="email">Location</label>

              <input v-model="location" type="text" id="email" name="email">

              <div class="error" v-if="changeLocationErrors.location">{{ changeLocationErrors.location }}</div>

            </div>

            <div class="control">
              <input type="submit"
              name="submit"
              class="button submit large"
              value="Save"
              >
            </div>

          </form>

        </div>

      </div>

      <div class="right column">
        <avatars></avatars>
      </div>

      </div>

    </div>

    <site-footer/>

  </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Avatars from '@/components/Avatars'

export default {
  name: 'Login',
  components: {
    SiteHeader,
    SiteFooter,
    Avatars
  },
  data () {
    return {
      oldPassword: '',
      newPassword: '',
      location: '',
      changePasswordErrors: {},
      changeLocationErrors: {}
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  beforeMount () {
    if (this.user.location) this.location = this.user.location
  },
  methods: {
    submitChangePassword () {
      window.axios.post('/api/changepassword', {
        username: this.user.username,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      })
        .then(response => {
          this.changePasswordErrors = {}
          console.log('success')
        })
        .catch(changePasswordErrors => {
          this.changePasswordErrors = changePasswordErrors.response.data
          console.log(changePasswordErrors.response.data)
        })
    },
    submitChangeLocation () {
      window.axios.post('/api/changelocation', {
        username: this.user.username,
        location: this.location
      })
        .then(response => {
          this.changeLocationErrors = {}
          this.set({
            key: 'user',
            value: response.data
          })
        })
        .catch(changeLocationErrors => {
          this.changeLocationErrors = changeLocationErrors.response.data
          console.log(changeLocationErrors.response.data)
        })
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
