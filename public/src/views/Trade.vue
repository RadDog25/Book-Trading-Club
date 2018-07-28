<template>

  <div id="page" class="site">

    <site-header/>

    <div id="content" class="site-content">

      Trade Request Made

    </div>

    <site-footer/>

  </div>

</template>

<script>
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Api from '@/Api'
import { mapState } from 'vuex'

export default {
  name: 'Trade',
  components: {
    SiteHeader,
    SiteFooter
  },
  data () {
    return {
      requester: null
    }
  },
  computed: {
    tradeRequest () {
      return this.user.getTradeRequest(this.$route.params.id)
    },
    ...mapState([
      'user'
    ])
  },
  methods: {

  },
  mounted () {
    Api.getTradeRequester(this.tradeRequest._id)
      .then(requester => {
        this.requester = requester
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
