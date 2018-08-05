<template>

    <div id="page" class="site">

        <site-header/>

        <div id="content" class="site-content layout-container">

            <div v-if="tradeRequest && requester" class="trade__container content-area layout-row"
            :class="status"
            >

                <h1 class="trade__heading hed1 heading-with-border">
                    Trade Request <span class="trade__status">[{{ status }}]</span>
                </h1>

                <div class="trade__users">

                    <user-preview :user="tradeRequest.owner"></user-preview>

                    <div class="trade__iconContainer">
                      <img class="trade__icon" src="@/assets/right-arrow.svg" />
                      <img class="trade__confirmedIcon" src="@/assets/done.svg" />
                      <img class="trade__icon" src="@/assets/right-arrow.svg" />

                    </div>

                    <user-preview class="reversed" :user="tradeRequest.requester"></user-preview>

                </div>

                <div class="trade__books">

                    <div class="trade__ownerBookContainer selectable-box-container selectable-box-container-thin is-selected">
                        <div class="selectable-box">
                            <book :book="book"></book>
                        </div>
                    </div>

                    <div class="trade__requesterBooksContainer">
                        <ul class="trade__requesterBooks normal-list"
                        :class="cssClass"
                        >
                            <li v-for="book in requestorBooks"
                            :key="book._id"
                            :class="{ 'is-selected': selectedBook.id === book.id || status == 'complete' }"
                            class="trade__requesterBookContainer selectable-box-container selectable-box-container-thin">
                                <div class="selectable-box"
                                @click="handleBookClick(book)"
                                >
                                    <book :book="book"></book>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div v-if="status == 'open'" class="trade__buttonContainer">

                    <a class="trade__button button large"
                    :class="{ 'disabled': !selectedBook.id }"
                    @click="handleAcceptTrade"
                    >
                        Accept Trade
                    </a>

                    <a class="trade__button button large">
                        Decline Trade
                    </a>

                </div>

            </div>

        </div>

        <site-footer/>

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
  name: 'Trade',
  components: {
    SiteHeader,
    SiteFooter,
    UserPreview,
    Book
  },
  data () {
    return {
      requester: null,
      selectedBook: { id: null }
    }
  },
  computed: {
    tradeRequest () {
      return this.user.getTradeRequest(this.$route.params.id)
    },
    book () {
      return this.tradeRequest.book
    },
    status () {
      return this.tradeRequest.status
    },
    numberOfRequesterBooks () {
      return this.requester.books.length
    },
    requestorBooks () {
      return this.status === 'complete' ? [ this.tradeRequest.proposedBook ] : this.requester.books
    },
    cssClass () {
      return this.numberOfRequesterBooks > 5 ? 'trade__requesterBooks--grid' : 'trade__requesterBooks--flex'
    },
    ...mapState([
      'user'
    ])
  },
  methods: {
    handleBookClick (book) {
      this.selectedBook = book
    },
    handleAcceptTrade () {
      let text = `Are you sure that you want to trade your copy of
       <b>${this.book.title}</b> for ${this.requester.username}'s copy of <b>${this.selectedBook.title}</b>?`

      const callback = () => {
        this.closeModal()

        Api.trade(this.tradeRequest._id, this.selectedBook)
          .then(userData => {
            this.setUser(userData)
            // setTimeout(() => {
            //   this.$router.push('/dashboard')
            // }, 1000)
          })
      }

      this.openConfirmationModal({
        text,
        confirmText: 'Confirm Trade',
        closeText: 'Cancel',
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
      'openConfirmationModal',
      'closeModal'
    ])
  },
  mounted () {
    Api.getTradeRequester(this.tradeRequest._id)
      .then(requester => {
        this.requester = requester
      })
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
