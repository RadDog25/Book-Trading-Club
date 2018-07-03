<template>

  <div id="page" class="site">

    <site-header/>

    <div v-if="user" id="content" class="site-content layout-container">

      <h1 class="hed1 heading-with-border layout-row">Profile</h1>

      <div class="site-content-inner layout-row">

        <div class="left column">

          <div class="form-container">

            <h2 class="heading hed2">Change Password</h2>

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

            <h2 class="heading hed2">Location</h2>

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
import { mapState, mapMutations, mapActions } from 'vuex'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Avatars from '@/components/Avatars'
import Api from '@/Api'

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
  methods: {
    submitChangePassword () {
      window.blurInputs()

      Api.changePassword(this.user.username, this.oldPassword, this.newPassword)
        .then(() => {
          this.changePasswordErrors = {}
          this.openConfirmationModal({
            text: 'Password Updated',
            closeText: 'Ok',
            isSuccess: true
          })
        })
        .catch(changePasswordErrors => {
          this.changePasswordErrors = changePasswordErrors.response.data
          console.log(changePasswordErrors.response.data)
        })
    },
    submitChangeLocation () {
      window.blurInputs()

      Api.changeLocation(this.user.username, this.location)
        .then(userData => {
          this.changeLocationErrors = {}
          this.setUser(userData)

          this.openConfirmationModal({
            text: 'Location Updated',
            closeText: 'Ok',
            isSuccess: true
          })
        })
        .catch(changeLocationErrors => {
          this.changeLocationErrors = changeLocationErrors.response.data
          console.log(changeLocationErrors.response.data)
        })
    },
    ...mapMutations([
      'setUser',
      'stopLoading'
    ]),
    ...mapActions([
      'openConfirmationModal',
      'closeModal'
    ])
  },
  beforeMount () {
    if (this.user.location) this.location = this.user.location
  },
  mounted () {
    this.stopLoading()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
