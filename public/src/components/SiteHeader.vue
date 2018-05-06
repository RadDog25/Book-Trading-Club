<template>
  <header id="masthead" class="site-header black small layout-container">

    <site-branding class="small"></site-branding>

    <nav id="site-navigation" class="main-navigation">
      <ul class="main-menu">

          <li class="main-menu-item browse-item">
            <router-link to="/browse">
              Browse
            </router-link>
          </li>

        <li class="main-menu-item books-item">
          <router-link to="/books">
            Books
          </router-link>
        </li>

        <li v-if="shouldShowSearch"
        class="main-menu-item search-item"
        :class="{ active: searchIsActive }"
        >
          <form method="GET" action="/browse" @submit.prevent="onSubmit">

            <div class="input-container">
              <input type="text"
              v-model="searchText"
              placeholder="Titles, authors, categories"
              ref="searchInput"
              >
            </div>

            <a @click="toggleSearch" class="search-icon">
              <i class="fa fa-search"></i>
            </a>

          </form>
        </li>

        <site-header-dropdown/>

      </ul>
    </nav>

  </header>
</template>

<script>
import SiteHeaderDropdown from '@/components/SiteHeaderDropdown'
import SiteBranding from '@/components/SiteBranding'
import { mapActions } from 'vuex'

export default {
  name: 'SiteHeader',
  components: {
    SiteHeaderDropdown,
    SiteBranding
  },
  data () {
    return {
      searchIsActive: false,
      searchText: ''
    }
  },
  computed: {
    shouldShowSearch () {
      return this.$route.name === 'Browse'
    }
  },
  methods: {
    toggleSearch () {
      this.searchIsActive = !this.searchIsActive
      if (this.searchIsActive) this.$refs.searchInput.focus()
    },
    onSubmit () {
      this.searchBooks(this.searchText)
    },
    ...mapActions([
      'searchBooks'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
