<template>

    <div v-if="book" class="more-info-container layout-container">

        <div class="left">
            <h3 class="title">{{ book.title }}</h3>
            <div class="authors">{{ book.authors.join(', ') }}</div>
            <h5 class="subtitle">{{ book.subtitle }}</h5>

            <div class="description"
            :class="{ 'shortened': descriptionIsShortened }"
            ref="description"
            >
                {{ description }}
                <div class="toggle"
                v-if="description && canToggleDescription"
                @click="handleDescriptionToggle"
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
          <div class="image-container">
              <img class="image"
              :src="book.thumbnail"
              >

              <a v-if="book.link"
              :href="book.link"
              target="_blank"
              class="link">
                <img class="link-image" :src="linkIcon">
              </a>
          </div>
        </div>

        <div class="close-icon"
        @click="handleCloseClick"
        >&times;</div>
    </div>

</template>

<script>
import velocity from 'velocity-animate'
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
    },
    linkIcon () {
      if (this.book.link.includes('market.android.com')) {
        return require('@/assets/googleplay.svg')
      }

      return require('@/assets/googlebooks.png')
    }
  },
  methods: {
    handleCloseClick () {
      this.$emit('moreInfoCloseButtonWasClicked')
    },
    handleDescriptionToggle () {
      const el = this.$refs.description
      el.style.opacity = 0
      const initialHeight = el.clientHeight
      this.descriptionIsShortened = !this.descriptionIsShortened

      setTimeout(() => {
        const finalHeight = el.clientHeight
        velocity(el, {
          height: [finalHeight, initialHeight],
          opacity: [1, 0]
        }, {
          duration: 200,
          complete () {
            el.style.height = 'auto'
          }
        })
      }, 0)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
