<template>
    <div class="slide-container"
    :class="hoverClass"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
    @click="handleClick"
    >
        <div class="slide">

          <img class="image"
          :src="book.thumbnail"
          >

          <div class="info"
          >

            <div class="title">
              {{ book.title }}
            </div>

            <div v-if="book.authors" class="authors">
              {{ book.authors.join(', ') }}
            </div>

            <div class="details">

              <star-rating v-if="book.ratingsCount"
              :averageRating="book.averageRating"
              ></star-rating>

              <div class="year">
                {{ book.getPublishedDate().getFullYear() }}
              </div>

            </div>

            <div class="excerpt">{{ book.getExcerpt(100) }}</div>

            <div class="more-info-button-container">
              <i href="#slider"
              class="more-info-button fa fa-angle-down"></i>
            </div>

          </div>

        </div>
      </div>
</template>

<script>
import StarRating from '@/components/StarRating'
import { mapActions } from 'vuex'

export default {
  name: 'SlideItem',
  components: {
    StarRating
  },
  props: [
    'book',
    'index',
    'slideHoverIndex'
  ],
  computed: {
    styleObject () {
      return {
        backgroundImage: `url('${this.book.thumbnail}')`
      }
    },
    hoverClass () {
      if (typeof this.slideHoverIndex === 'number') {
        if (this.index < this.slideHoverIndex) {
          return 'hover-before'
        } else if (this.index === this.slideHoverIndex) {
          return 'hover-active'
        } else {
          return 'hover-after'
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'openModal'
    ]),
    mouseenter () {
      this.$emit('mouseDidEnterSlide', this.index)
    },
    mouseleave () {
      this.$emit('mouseDidLeaveSlide', this.index)
    },
    handleMoreInfoClick () {
      this.$emit('moreInfoWasClicked', this.index)
    },
    handleClick (event) {
      const classes = [ ...event.target.classList ]
      if (classes.includes('more-info-button')) {
        this.handleMoreInfoClick()
      } else {
        this.openModal({
          modalName: 'bookInfoModal',
          text: '',
          book: this.book
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
