<template>

  <div id="page" class="site">

    <site-header/>

    <div id="content" class="site-content">

      <h1>Dashboard</h1>

    </div>

    <site-footer/>

  </div>

</template>

<script>
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export default {
  name: 'Dashboard',
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
