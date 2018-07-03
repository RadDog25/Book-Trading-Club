<template>

  <div id="page" class="site">

    <site-header/>

    <div id="content" class="site-content">

      <slider v-if="user" :books="availableBooks"
      :class="{ 'loading': isLoading }"
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
import Api from '@/Api'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Browse',
  components: {
    SiteHeader,
    SiteFooter,
    Slider,
    Book
  },
  computed: {
    ...mapState([
      'user',
      'availableBooks',
      'isLoading'
    ])
  },
  created () {
    Api.getAvailableBooksData()
      .then(availableBooksData => {
        this.setAvailableBooks(availableBooksData)
      })
  },
  methods: {
    ...mapMutations([
      'setAvailableBooks'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
