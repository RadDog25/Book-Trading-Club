<template>
  <div class="bookInfoModal__container modal__container layout-container">
    <div class="bookInfoModal modal__row">

      <div class="bookInfoModal__thumbnailContainer">
        <img :src="book.thumbnail" alt="" class="bookInfoModal__thumbnail">
      </div>

      <div class="bookInfoModal__info">
        <h3 class="bookInfoModal__title">
          {{ book.title }}
        </h3>

        <div class="bookInfoModal__authors">
            {{ book.authors.join(', ') }}
        </div>

        <div class="bookInfoModal__shortenedDescription">
          {{ shortenedDescription }}
        </div>

        <a :href="book.link" class="bookInfoModal__linkContainer">
          <img :src="linkIcon" class="bookInfoModal__linkImage hover-opacity">
        </a>

      </div>

      <a class="bookInfoModal__closeIcon normal-link"
      @click="closeBookInfoModal"
      >&times;</a>

    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'bookInfoModal',
  computed: {
    ...mapState([
      'bookInfoModal'
    ]),
    book () {
      return this.bookInfoModal.book
    },
    shortenedDescription () {
      return `${this.book.description.substring(0, 200)}...`
    },
    linkIsGooglePlay () {
      return this.book.link.includes('market.android.com')
    },
    linkIcon () {
      if (this.linkIsGooglePlay) {
        return require('@/assets/googleplay.svg')
      }

      return require('@/assets/googlebooks.png')
    }
  },
  methods: {
    ...mapActions([
      'closeBookInfoModal'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
