<template>
    <div class="slide__container slide-container"
    @click="handleMoreInfoClick"
    >
        <div class="slide__wrapper slide">

          <img class="slide__image image"
          :src="book.thumbnail"
          >

          <div class="slide__info info"
          >

            <div class="slide__title title">
              {{ book.getShortenedTitle(50) }}
            </div>

            <div v-if="book.authors" class="slide__authors authors">
              {{ book.authors.join(', ') }}
            </div>

            <div class="slide__details details">

              <star-rating v-if="book.ratingsCount"
              :averageRating="book.averageRating"
              ></star-rating>

              <div class="slide__year year">
                {{ book.getPublishedDate().getFullYear() }}
              </div>

            </div>

            <div class="slide__excerpt excerpt">{{ book.getExcerpt(60) }}</div>

            <div class="slide__moreInfoButtonContainer more-info-button-container">
              <i href="#slider"
              class="slide__moreInfoButton more-info-button js-more-info-button fa fa-angle-down"></i>
            </div>

          </div>

        </div>
      </div>
</template>

<script>
import StarRating from '@/components/StarRating'

export default {
  name: 'SlideItem',
  components: {
    StarRating
  },
  props: [
    'bookInstance',
    'index'
  ],
  computed: {
    book () {
      return this.bookInstance.book
    }
  },
  methods: {
    handleMoreInfoClick () {
      this.$emit('moreInfoWasClicked', this.index)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
