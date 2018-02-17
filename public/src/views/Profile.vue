<template>

  <div id="page" class="site">

    <site-header/>

    <div id="content" class="site-content">
      <div id="primary" class="content-area">
        <div id="main" class="site-main">
          <h1>Profile</h1>
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
  name: 'Profile',
  components: {
    SiteHeader,
    SiteFooter
  },
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
