<template>
  <footer id="colophon" class="site-footer layout-container">

    <a href="https://github.com/RadDog25/Book-Trading-Club">
      <img class="github-logo" src="@/assets/github.svg">
    </a>

    <div class="footnote">

      <span class="copyright">
        C
      </span>

      <span class="text">
        {{ currentYear }} Design inspired by Netflix, Inc
      </span>

    </div>

  </footer>
</template>

<script>
export default {
  name: 'SiteFooter',
  computed: {
    currentYear () {
      return (new Date()).getFullYear()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
