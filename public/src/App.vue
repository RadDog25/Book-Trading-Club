<template>

  <div id="app"
  class="background-cover"
  :class="appClass"
  >

    <router-view/>

  </div>

</template>

<script>
export default {
  name: 'App',
  computed: {
    appClass () {
      console.log(this.$route)
      return [
        `${this.$route.name.toLowerCase()}-view`
      ]
        .join(' ')
    }
  }
}
</script>

<style src="./scss/main.scss"
lang="scss"
></style>
