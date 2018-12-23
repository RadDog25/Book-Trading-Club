<template>
  <header id="masthead" class="site-header black small layout-container">

    <site-branding class="small"></site-branding>

    <nav id="site-navigation" class="main-navigation">
      <ul class="main-menu">

        <li v-if="shouldShowSearch"
        class="main-menu-item search-item search-container black"
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

        <notifications/>

        <li class="main-menu-item dropdown-item-username-container">
          Hi, <b class="dropdown-item-username">{{ user.username }}</b>
        </li>

        <site-header-dropdown v-if="user"/>

      </ul>
    </nav>

  </header>
</template>

<script>
import SiteHeaderDropdown from '@/components/SiteHeaderDropdown'
import SiteBranding from '@/components/SiteBranding'
import Notifications from '@/components/Notifications'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'SiteHeader',
  components: {
    SiteHeaderDropdown,
    SiteBranding,
    Notifications
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
    },
    ...mapState([
      'user'
    ])
  },
  methods: {
    toggleSearch () {
      this.searchIsActive = !this.searchIsActive
      if (this.searchIsActive) this.$refs.searchInput.focus()
    },
    onSubmit () {
      this.getAvailableBooks(this.searchText)
    },
    ...mapActions([
      'getAvailableBooks'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
