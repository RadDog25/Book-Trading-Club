<template>
    <div class="slide-container"
    :class="hoverClass"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
    >
        <div class="slide">

          <img class="image"
          :src="book.thumbnail"
          >

          <div class="info">

            <div class="title">
              {{ book.title }}
            </div>

            <div v-if="book.authors" class="authors">
              {{ book.authors.join(', ') }}
            </div>

            <div class="details">

              <div v-if="book.ratingsCount" class="rating">

                <i v-for="i in numberOfFullStars"
                :key="i"
                class="fa fa-star" aria-hidden="true"></i>

                <i v-if="hasHalfStar"
                class="fa fa-star-half-o" aria-hidden="true"></i>

              </div>

              <div v-if="publishedYear" class="year">
                {{ publishedYear }}
              </div>

            </div>

            <div v-if="excerpt" class="excerpt">{{ excerpt }}</div>

            <div class="more-info-button-container">
              <i @click="handleMoreInfoClick"
              class="more-info-button fa fa-angle-down"></i>
            </div>

          </div>

        </div>
      </div>
</template>

<script>

export default {
  name: 'SlideItem',
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
    },
    excerpt () {
      if (this.book.description) return `${this.book.description.substring(0, 100)}...`
    },
    numberOfFullStars () {
      if (this.book.averageRating) return Math.floor(this.book.averageRating)
    },
    hasHalfStar () {
      if (this.book.averageRating) return this.book.averageRating.toString().includes('.5')
    },
    publishedYear () {
      if (this.book.publishedDate) return this.book.publishedDate.slice(0, 4)
    }
  },
  methods: {
    mouseenter () {
      this.$emit('mouseDidEnterSlide', this.index)
    },
    mouseleave () {
      this.$emit('mouseDidLeaveSlide', this.index)
    },
    handleMoreInfoClick () {
      this.$emit('moreInfoWasClicked', this.index)
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
