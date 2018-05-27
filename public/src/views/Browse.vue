<template>

  <div id="page" class="site">

    <site-header/>

    <div id="content" class="site-content">

      <slider :books="availableBooks"
      ></slider>

    </div>

    <site-footer/>

  </div>

</template>

<script>
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Slider from '@/components/Slider'
import Book from '@/components/Book'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Browse',
  components: {
    SiteHeader,
    SiteFooter,
    Slider,
    Book
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState([
      'availableBooks'
    ])
  },
  created () {
    this.getAvailableBooks()
  },
  methods: {
    ...mapActions([
      'getAvailableBooks'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
