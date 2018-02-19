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
export default {
  name: 'App',
  computed: {
    viewClass () {
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
