<template>
  <div class="bookInfoModal__container modal__container layout-container">
    <div class="bookInfoModal modal__row">

      <div class="bookInfoModal__thumbnailContainer">

        <div class="bookInfoModal__thumbnailWrapper">
          <img :src="book.thumbnail" alt="" class="bookInfoModal__thumbnail">
        </div>

        <div class="bookInfoModal__thumbnailOverlayContainer">
          <div class="bookInfoModal__thumbnailOverlay">
              <star-rating v-if="book.ratingsCount"
              :averageRating="book.averageRating"
              ></star-rating>

              <a :href="book.link" class="bookInfoModal__reviewsButton button"
              target="_blank"
              >
                Reviews
              </a>
          </div>
        </div>

      </div>

      <div class="bookInfoModal__info">
        <h3 class="bookInfoModal__title">
          {{ book.title }}
        </h3>

        <div class="bookInfoModal__authors">
            {{ book.authors.join(', ') }}
        </div>

        <div class="bookInfoModal__shortenedDescription">
          {{ excerpt }}
        </div>

        <a :href="book.link"
        target="_blank"
        class="bookInfoModal__linkContainer">
          <img :src="linkIcon" class="bookInfoModal__linkImage hover-opacity">
        </a>

      </div>

      <a class="bookInfoModal__closeIcon normal-link"
      @click="closeModal"
      >&times;</a>

    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import StarRating from '@/components/StarRating'
export default {
  name: 'bookInfoModal',
  components: {
    StarRating
  },
  computed: {
    ...mapState([
      'modal'
    ]),
    book () {
      return this.modal.items.bookInfoModal.book
    },
    excerpt () {
      return window.getShortenedText(this.book.description, 200)
    },
    linkIcon () {
      if (this.book.linkIsGooglePlay) {
        return require('@/assets/googleplay.svg')
      }

      return require('@/assets/googlebooks.png')
    }
  },
  methods: {
    ...mapActions([
      'closeModal'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
