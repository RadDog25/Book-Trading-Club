<template>

  <div id="app"

  >

    <transition name="fade" mode="out-in">
      <router-view
      class="background-cover"
      :class="viewClass"
      />
    </transition>

  </div>

</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'App',
  computed: {
    viewClass () {
      if (this.$route.name) {
        return `${this.$route.name.toLowerCase()}-view`
      }

      return ''
    }
  },
  methods: {
    ...mapMutations([
      'set'
    ])
  },
  beforeCreate () {
    window.axios.get('/api/user')
      .then(response => {
        this.set({
          key: 'user',
          value: response.data
        })

        this.$router.push('browse')
      })
  }
}
</script>

<style src="./scss/main.scss"
lang="scss"
></style>
