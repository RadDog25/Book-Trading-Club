<template>

  <div id="page" class="site">

    <transition name="fade">
      <div v-if="deleteConfirmationIsActive" class="confirmation-container confirmation-container-warning layout-container">
        <div class="confirmation">
          <img class="icon" src="@/assets/close2red.svg" alt="success">
          <h3 class="text hed4">Are you sure that you want to remove <b><span v-html="bookToDeleteTitle"></span></b> from your library?</h3>

          <div class="buttons-container">
            <a @click="handleConfirmDeleteBook" class="button large">Delete</a>
            <a @click="deleteConfirmationIsActive = false" class="button large gray">Cancel</a>
          </div>

        </div>
      </div>
    </transition>

    <site-header/>

    <div id="content" class="site-content layout-container">

      <h1 class="dashboard-heading hed1 heading-with-border layout-row">
        <span>Dashboard</span>

        <div v-if="searchIsActive"
        class="search-container active"
        >
          <form method="GET" action="/browse" @submit.prevent="onSubmit">

            <div class="input-container">
              <input type="text"
              v-model="searchText"
              placeholder="Search for a book to add"
              ref="searchInput"
              >
            </div>

            <a class="search-icon">
              <i class="fa fa-search"></i>
            </a>

          </form>
        </div>

      </h1>

      <div class="dashboard-rows layout-row">
        <div class="dashboard-row-library dashboard-row"
        :class="{ active: searchIsActive }"
        >

          <div class="dashboard-column dashboard-column-left">
            <h3 class="dashboard-column-title hed3">
              LIBRARY
            </h3>
          </div>

          <div class="dashboard-column dashboard-column-right">
            <div class="user-books books">
              <div class="user-book-container book-container"
              v-for="book in user.books"
              :key="book._id"
              >
                <div class="user-book">
                  <img :src="book.thumbnail"
                  :alt="book.title">

                  <div class="remove-icon-container"
                  @click="handleRemoveClick(book)"
                  >
                    <img class="remove-icon" src="@/assets/closered.svg"
                    alt="remove book">
                  </div>
                </div>

              </div>
            </div>

            <div class="button-container">
                <a @click="handleAddBooksToLibraryClick"
                 class="button large">Add Books to Library</a>
            </div>
          </div>

          <div class="dashboard-column dashboard-column-hidden">
            <h3 class="dashboard-column-title hed3">
              SEARCH RESULTS
            </h3>

            <div class="searched-books books">
              <div class="searched-book-container book-container selectable-box-container selectable-box-container-thin"
              v-for="book in booksNotInLibrary"
              :class="{ 'is-selected': selectedBooksIds.includes(book.id) }"
              :key="book.id"
              >
                <img class="selectable-box"
                @click="handleSearchedBookClick(book)"
                :src="book.thumbnail"
                :alt="book.title">
              </div>
            </div>

            <div class="button-container">
              <transition name="fade">
                  <a v-if="bookIsSelected"
                  @click="handleAddBooksClick"
                  class="add-books-button button large">{{ addBookText }}</a>
              </transition>

              <a @click="handleCancelClick"
              class="button large">Cancel</a>
            </div>
          </div>
        </div>
      </div>

    </div>

    <site-footer></site-footer>

  </div>

</template>

<script>
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    SiteHeader,
    SiteFooter
  },
  data () {
    return {
      searchIsActive: false,
      searchText: '',
      selectedBooks: [],
      bookToDelete: null,
      deleteConfirmationIsActive: false
    }
  },
  computed: {
    selectedBooksIds () {
      return this.selectedBooks.map(book => book.id)
    },
    libraryBookIds () {
      return this.user.books.map(book => book._id)
    },
    addBookText () {
      return this.selectedBooks.length > 1 ? 'Add Books' : 'Add Book'
    },
    bookIsSelected () {
      return this.selectedBooks.length > 0
    },
    booksNotInLibrary () {
      return this.searchedBooks.filter(book => {
        return !this.libraryBookIds.includes(book.id)
      })
    },
    bookToDeleteTitle () {
      return this.bookToDelete.title.slice().replace(/ /g, '&nbsp;')
    },
    ...mapState([
      'searchedBooks',
      'user'
    ])
  },
  methods: {
    onSubmit () {
      this.getSearchedBooks(this.searchText)
    },
    handleCancelClick () {
      this.searchIsActive = false
    },
    handleAddBooksClick (books) {
      window.axios.post('/api/addbooks', {
        books: this.selectedBooks
      })
        .then(response => {
          this.set({
            key: 'user',
            value: response.data
          })

          this.selectedBooks = []
        })
    },
    handleAddBooksToLibraryClick () {
      this.searchIsActive = !this.searchIsActive
      setTimeout(() => {
        this.$refs.searchInput.focus()
      })
    },
    handleSearchedBookClick (book) {
      if (this.selectedBooksIds.includes(book.id)) {
        const idTodelete = book.id
        this.selectedBooks = this.selectedBooks.filter(book => book.id !== idTodelete)
      } else {
        this.selectedBooks = this.selectedBooks.concat(book)
      }
    },
    handleRemoveClick (book) {
      this.bookToDelete = book
      this.deleteConfirmationIsActive = true
    },
    handleConfirmDeleteBook () {
      this.deleteBookFromUser()
        .then(() => {
          this.deleteConfirmationIsActive = false
        })
    },
    deleteBookFromUser () {
      return new Promise((resolve, reject) => {
        window.axios({
          method: 'delete',
          url: '/api/deletebook',
          data: {
            book: this.bookToDelete
          }
        })
          .then(response => {
            this.set({
              key: 'user',
              value: response.data
            })

            resolve()
          })
      })
    },
    ...mapActions([
      'getSearchedBooks'
    ]),
    ...mapMutations([
      'set'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
