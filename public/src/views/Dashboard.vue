<template>

  <div id="page" class="site">

    <site-header/>

    <div v-if="user" id="content" class="site-content layout-container">

      <h1 class="dashboard__heading dashboard-heading hed1 heading-with-border layout-row">
        <span>Dashboard</span>

        <div v-if="searchIsActive"
        class="search-container active"
        >
          <form method="GET" action="/browse" @submit.prevent="onSubmit">

            <div class="input-container">
              <input type="text"
              v-model="searchText"
              placeholder="Search for a book to add"
              class="dashboard-search-input"
              >
            </div>

            <a class="search-icon">
              <i class="fa fa-search"></i>
            </a>

          </form>
        </div>

      </h1>

      <div class="dashboard-rows layout-row">
        <div class="dashboard__row dashboard__row--library"
        :class="{ active: searchIsActive }"
        >

          <div class="dashboard__column dashboard__column--left">
            <h3 class="dashboard__columnTitle hed3">
              LIBRARY
            </h3>
          </div>

          <div class="dashboard__column dashboard__column--right">
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

          <div class="dashboard__column dashboard__column--hidden"
          :class="{ 'dashboard__column--hasResults': !!booksNotInLibrary.length }"
          >

            <div v-if="searchIsActive"
            class="search-container active"
            >
              <form method="GET" action="/browse" @submit.prevent="onSubmit">

                <div class="input-container">
                  <input type="text"
                  v-model="searchText"
                  placeholder="Search for a book to add"
                  class="dashboard-search-input"
                  >
                </div>

                <a class="search-icon">
                  <i class="fa fa-search"></i>
                </a>

              </form>
            </div>

            <h3 class="dashboard__columnTitle hed3">
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

        <div class="dashboard__row--requests dashboard__row">

          <div class="dashboard__column dashboard__column--left">
            <h3 class="dashboard__columnTitle hed3">
              TRADES
            </h3>
          </div>

          <div class="dashboard__column dashboard__column--right">
            <div v-if="tradeRequestPreviews.length" class="tradeRequests">
              <div v-for="(preview, index) in tradeRequestPreviews" class="dashboard__tradeRequest"
              :key="index"
              >
                <router-link :to="`/trade/${preview.id}`"
                class="dashboard__tradeRequestLink normal-link hover-opacity"
                >
                  <user-preview :user="preview.user"></user-preview>

                  <div v-if="preview.books.length" class="dashboard__tradeRequestBooks">
                    <div class="dashboard__tradeRequestBookImageContainer"
                    v-for="book in preview.books"
                    :key="book._id"
                    >
                      <img
                      :src="book.thumbnail"
                      :alt="book.title"
                      class="dashboard__tradeRequestBookImage">
                    </div>
                  </div>

                </router-link>
              </div>
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
import jquery from 'jquery'

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
          let userIsOwner = request.requester._id === this.user._id

          let books = ['bookInstanceForOwner', 'bookInstanceForRequester'].reduce((books, key) => {
            if (request[key]) {
              books.push({
                _id: request[key]._id,
                title: request[key].book.title,
                thumbnail: request[key].book.thumbnail
              })
            }

            return books
          }, [])

          if (!userIsOwner) {
            books = books.reverse()
          }

          return [...requests, {
            id: request._id,
            user: userIsOwner ? request.owner : request.requester,
            books
          }]
        }

        return requests
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

      Promise.all(this.selectedBooks.map(book => Api.addBook(book)))
        .then(() => {
          return Api.getUserData()
        })
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
        let $inputs = jquery('.dashboard-search-input')
        $inputs.focus()
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
      let tradeRequests = this.user.getTradeRequestsForBook(book._id)

      let text = `Are you sure that you want to delete <b>${book.title}</b>?`

      if (tradeRequests.length) {
        let requesters
        if (tradeRequests.length === 1) {
          requesters = tradeRequests[0].requester.username
        } else {
          let last = tradeRequests.pop()
          requesters = tradeRequests.map(request => request.requester.username)
            .join(', ')

          requesters += ` and ${last.requester.username}`
        }

        text += `<br><br><b>${requesters}</b> has requested it!`
      }

      const callback = () => {
        this.deleteBook(book._id)
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
