<template>

    <div v-if="book" class="more-info-container layout-container">
      <div class="more-info-row layout-row">
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
                {{ book.getPublishedDate().getFullYear() }}
              </div>

              <div v-if="categories" class="categories note"
              v-html="categories"
              ></div>

              <div class="request">

                <user-preview
                :user="book.user"
                ></user-preview>

                <a @click="handleRequestConfirmation" class="button large">REQUEST TRADE</a>

              </div>

            </div>

        </div>

        <div class="right">
          <book :book="book"
          ></book>
        </div>

    </div>

    <div class="close-icon"
    @click="handleCloseClick"
    >&times;</div>

  </div>

</template>

<script>
import velocity from 'velocity-animate'
import { mapState, mapActions } from 'vuex'
import UserPreview from '@/components/UserPreview'
import Book from '@/components/Book'
import Api from '@/Api'

export default {
  name: 'SliderMoreInfo',
  components: {
    UserPreview,
    Book
  },
  props: [
    'book'
  ],
  data () {
    return {
      descriptionIsShortened: true
    }
  },
  computed: {
    ...mapState([
      'user'
    ]),
    categories () {
      if (this.book.categories && this.book.categories.length) {
        if (this.book.categories.length === 1) {
          return `<b>Category:</b> ${this.book.categories[0]}`
        } else {
          return `<b>Categories:</b> ${this.book.categories.join(', ')}`
        }
      }
    },
    shortenedDescription () {
      return this.book.getExcerpt(300)
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
      if (this.book.linkIsGooglePlay()) {
        return require('@/assets/googleplay.svg')
      }

      return require('@/assets/googlebooks.png')
    },
    avatarImageUrl () {
      return require(`@/assets/profile${this.book.user.avatar + 1}.png`)
    }
  },
  methods: {
    ...mapActions([
      'openModal'
    ]),
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
    },
    handleRequestConfirmation () {
      Api.requestTrade(this.book, this.user._id)
        .then(response => {
          this.openModal({
            modalName: 'successModal',
            text: 'Your request has been sent!',
            book: {}
          })
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
