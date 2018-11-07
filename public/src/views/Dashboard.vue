<template>

  <div id="page" class="site">

    <site-header/>

    <div v-if="user" id="content" class="site-content layout-container">

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
              v-for="bookInstance in user.bookInstances"
              :key="`book-${bookInstance._id}`"
              >
                <div class="user-book">
                  <book :book="bookInstance.book"></book>

                  <div class="remove-icon-container"
                  @click="handleRemoveBookClick(bookInstance)"
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
                <div class="selectable-box"
                @click="handleSearchedBookClick(book)"
                >
                  <book :book="book"
                  ></book>
                </div>
              </div>
            </div>

            <div class="button-container">
              <transition name="fade">
                  <a @click="handleAddBooksClick"
                  class="add-books-button button large"
                  :class="{ 'disabled': !bookIsSelected }"
                  >
                    {{ addBookText }}
                  </a>
              </transition>

              <a @click="handleCancelClick"
              class="button large">Cancel</a>
            </div>
          </div>
        </div>

        <div class="dashboard-row-requests dashboard-row">

          <div class="dashboard-column dashboard-column-left">
            <h3 class="dashboard-column-title hed3">
              REQUESTS
            </h3>
          </div>

          <div class="dashboard-column dashboard-column-right">
            <div v-if="tradeRequestPreviews.length" class="tradeRequests">
              <div v-for="(preview, index) in tradeRequestPreviews" class="tradeRequest"
              :key="index"
              >
                <router-link :to="`/trade/${preview.id}`"
                class="normal-link"
                >
                  <user-preview :user="preview.user"></user-preview>
                </router-link>
              </div>
            </div>
          </div>

        </div>

        <div class="dashboard-row-admin dashboard-row">

          <div class="dashboard-column dashboard-column-left">
            <h3 class="dashboard-column-title hed3">
              ADMIN
            </h3>
          </div>

          <div class="dashboard-column dashboard-column-right">

            <div @click="handleDeleteAllTradeRequests" class="button-container">
              <a class="button large">
                DELETE TRADE REQUESTS
              </a>
            </div>

            <div class="button-container">
              <a class="button large">
                DELETE EVERYTHING
              </a>
            </div>

            <div class="button-container">
              <a @click="handleAddStarterDataClick" class="button large">
                ADD STARTER DATA
              </a>
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
import UserPreview from '@/components/UserPreview'
import Book from '@/components/Book'
import Api from '@/Api'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    SiteHeader,
    SiteFooter,
    UserPreview,
    Book
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
      return this.user.bookInstances.map(bookInstance => bookInstance.book._id)
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
    tradeRequestPreviews () {
      return this.user.tradeRequests.reduce((requests, request) => {
        if (['initiated', 'proposed'].includes(request.status)) {
          return [...requests, {
            id: request._id,
            user: request.requester._id === this.user._id ? request.owner : request.requester
          }]
        }
      }, [])
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
      this.startLoading()
      Api.addBooks(this.selectedBooks)
        .then(userData => {
          this.setUser(userData)
          this.selectedBooks = []
        })
        .finally(() => {
          this.stopLoading()
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
    handleRemoveBookClick (book) {
      const tradeRequest = this.user.getTradeRequestForBook(book._id)

      let text = `Are you sure that you want to delete <b>${book.title}</b>?`

      if (tradeRequest) {
        const requester = tradeRequest.requester.username
        text += `<br><br><b>${requester}</b> has requested it!`
      }

      const callback = () => {
        this.deleteBook(book)
          .then(() => this.closeModal())
      }

      this.openConfirmationModal({
        text,
        confirmText: 'Delete',
        closeText: 'Cancel',
        book,
        isSuccess: false,
        callback
      })
    },
    handleAddStarterDataClick () {
      Api.addStarterData()
        .then(userData => {
          console.log(userData)
        })
    },
    handleDeleteAllTradeRequests () {
      Api.deleteAllTradeRequests()
        .then(userData => {
          console.log(userData)
        })
    },
    ...mapMutations([
      'setUser',
      'startLoading',
      'stopLoading'
    ]),
    ...mapActions([
      'getSearchedBooks',
      'openConfirmationModal',
      'deleteBook',
      'closeModal'
    ])
  },
  mounted () {
    this.stopLoading()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
