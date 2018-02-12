<template>
  <div id="app">

    <header id="masthead" class="site-header">
      <site-header/>
    </header>

    <div id="content" class="site-content">
      <div id="primary" class="content-area">
        <div id="main" class="site-main">
            <router-view/>
        </div>
      </div>
    </div>

    <footer id="colophon" class="site-footer">
      <site-footer/>
    </footer>

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
  }
}
</script>

<style src="./scss/main.scss"
lang="scss"
></style>
