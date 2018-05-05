<template>

    <div v-if="book" class="more-info-container layout-container">

        <div class="left">
            <h3 class="title">{{ book.title }}</h3>
            <div class="authors">{{ book.authors.join(', ') }}</div>
            <h5 class="subtitle">{{ book.subtitle }}</h5>

            <div class="description"
            :class="{ 'shortened': descriptionIsShortened }"
            >
                {{ description }}
                <div class="toggle"
                v-if="description && canToggleDescription"
                @click="descriptionIsShortened = !descriptionIsShortened"
                ><i class="fa fa-angle-up" aria-hidden="true"></i></div>
            </div>

            <div class="bottom">

              <div v-if="book.publisher" class="publisher note">
                  <b>Publisher:</b>
                  {{ book.publisher }}
                </div>

                <div class="date note">
                  <b>Publish Date:</b>
                  {{ publishedDate.getFullYear() }}
                </div>

                <div v-if="categories" class="categories note"
                v-html="categories"
                ></div>

            </div>

        </div>

        <div class="right">
            <img class="image"
            :src="book.thumbnail"
            >
        </div>

        <div class="close-icon"
        @click="handleCloseClick"
        >&times;</div>
    </div>

</template>

<script>
export default {
  name: 'SliderMoreInfo',
  props: [
    'book'
  ],
  data () {
    return {
      descriptionIsShortened: true
    }
  },
  computed: {
    publishedDate () {
      return new Date(this.book.publishedDate)
    },
    categories () {
      if (this.book.categories && this.book.categories.length) {
        if (this.book.categories.length === 1) {
          return `<b>Category:</b> ${this.book.categories[0]}`
        } else {
          return `<b>Categories:</b> ${this.books.categories.join(', ')}`
        }
      }
    },
    shortenedDescription () {
      return `${this.book.description.substring(0, 300)}...`
    },
    canToggleDescription () {
      return this.book.description.length - this.shortenedDescription.length > 50
    },
    description () {
      if (this.descriptionIsShortened && this.canToggleDescription) {
        return this.shortenedDescription
      }

      return this.book.description
    }
  },
  methods: {
    handleCloseClick () {
      this.$emit('moreInfoCloseButtonWasClicked')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
