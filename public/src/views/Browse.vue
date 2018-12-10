<template>

  <div id="page" class="site">

    <site-header/>

    <div v-if="user && availableBooks.length"
    id="content"
    class="site-content">

      <div class="browse__heroContainer">
        <div class="browse__hero">

          <div class="browse__heroLeft">

            <div class="browse__featured">
              FEATURED
            </div>

            <h2 class="browse__heroHeading">
              {{ featuredBookInstance.book.title }}
            </h2>

            <div class="browse__heroSubheading">
              {{ heroSubheading }}
            </div>

            <div class="browse__heroDescription">
              {{ featuredDescription }}
            </div>

            <div class="browse__heroLower">

              <a class="button large"
              href="#sliders"
              >
                SEE MORE
              </a>

            </div>

          </div>

          <div class="browse__heroRight">
            <div class="browse__heroImage"
            :style="{ backgroundImage: `url(${bannerImageUrl})` }"
            ></div>
          </div>

        </div>
      </div>

     <div class="browse__sliders" id="sliders">

      <slider v-for="category in categories"
      :key="category.key"
      :categoryKey="category.key"
      :books="category.bookInstances"
      :heading="category.name"
      :class="{ 'loading': isLoading }"
      ></slider>

     </div>

    </div>

    <site-footer/>

  </div>

</template>

<script>
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Slider from '@/components/Slider'
import Book from '@/components/Book'
import UserPreview from '@/components/UserPreview'
import Api from '@/Api'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Browse',
  components: {
    SiteHeader,
    SiteFooter,
    Slider,
    Book,
    UserPreview
  },
  data () {
    return {
      categoryNames: ['Computers', 'Fiction'],
      bannerImageUrl: require(`@/assets/mule.jpg`)
    }
  },
  computed: {
    heroSubheading () {
      return `${this.featuredBookInstance.book.authors.join(', ')} - ${this.featuredBookInstance.book.getPublishedDate().getFullYear()}`
    },
    featuredDescription () {
      return window.getShortenedTextByWordCount(this.featuredBookInstance.book.description, 20)
    },
    featuredBookInstance () {
      return this.availableBooks.find(bookInstance => bookInstance.featured)
    },
    categories () {
      if (!this.availableBooks.length) {
        return {
          noresults: {
            key: 'noresults',
            name: 'No Results Found',
            bookInstances: []
          }
        }
      }

      if (this.browseSearch) {
        return {
          search: {
            key: 'search',
            name: 'Search Results',
            bookInstances: this.availableBooks
          }
        }
      }

      let categories = {}

      for (let bookInstance of this.availableBooks) {
        if (bookInstance.book.categories) {
          for (let category of bookInstance.book.categories) {
            let categoryKey = window.camelize(category)

            if (categories[categoryKey]) {
              categories[categoryKey].bookInstances.push(bookInstance)
            } else {
              categories[categoryKey] = {
                key: categoryKey,
                name: category,
                bookInstances: [bookInstance]
              }
            }
          }
        }
      }

      categories = Object.keys(categories)
        .sort()
        .reduce((acc, val) => {
          if (categories[val].bookInstances.length > 3) {
            acc[val] = categories[val]
          } else {
            acc['other'].bookInstances = acc['other'].bookInstances
              .concat(categories[val].bookInstances)
          }

          return acc
        }, {
          other: {
            key: 'other',
            name: 'Miscellaneous',
            bookInstances: []
          }
        })

      let orderedCategories = Object.assign({}, categories)
      delete orderedCategories.other
      orderedCategories.other = categories.other

      return orderedCategories
    },
    ...mapState([
      'user',
      'availableBooks',
      'isLoading',
      'browseSearch'
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
