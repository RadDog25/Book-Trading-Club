<template>
  <div id="app"
  :class="appClass"
  >

    <site-header/>

    <div id="content" class="site-content">
      <div id="primary" class="content-area">
        <div id="main" class="site-main">
          <router-view/>
        </div>
      </div>
    </div>

    <site-footer/>

  </div>
</template>

<script>
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export default {
  name: 'App',
  components: {
    SiteHeader,
    SiteFooter
  },
  computed: {
    appClass () {
      return [
        `${this.$route.name.toLowerCase()}-route`
      ]
        .join(' ')
    }
  }
}
</script>

<style src="./scss/main.scss"
lang="scss"
></style>
