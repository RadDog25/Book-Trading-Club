<template>

  <div id="page" class="site">

    <site-header/>

    <div id="content" class="site-content">

      <slider :books="books"
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
      books: []
    }
  },
  created () {
    window.axios.get('/api/books')
      .then(response => {
        this.books = response.data
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
