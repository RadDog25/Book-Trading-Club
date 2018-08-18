<template>

    <div id="page" class="site">

        <site-header/>

        <div id="content" class="site-content layout-container">

            <div v-if="partner && tradeRequest && tradeRequest.tradeActions && tradeRequest.tradeActions.length "
            class="trade__container content-area layout-row"
            :class="status"
            >

                <div class="trade__headingContainer heading-with-border">

                  <h1 class="trade__heading hed1">

                    <span>Trade Request</span>

                    <span class="trade__status trade__statusBlock button green"
                    :class="{ 'active': status === 'Open' }"
                    >{{ status }}</span>

                    <span class="trade__status trade__statusBlock button green"
                    :class="{ 'active': !userMadeLastAction }"
                    >{{ pendingText }}</span>

                  </h1>

                  <div v-if="message"
                   class="trade__message"
                  v-html="message"
                  ></div>

                </div>

                <div class="trade__users">

                    <user-preview :user="user"></user-preview>

                    <div class="trade__iconContainer">
                      <img class="trade__icon" src="@/assets/right-arrow.svg" />
                      <img class="trade__confirmedIcon" src="@/assets/done.svg" />
                      <img class="trade__icon" src="@/assets/right-arrow.svg" />

                    </div>

                    <user-preview class="reversed" :user="partner"></user-preview>

                </div>

                <div class="trade__booksWrapper">

                    <div class="trade__userBooksContainer trade__booksContainer">
                        <ul class="trade__userBooks trade__books normal-list"
                        :class="getCssClass(userBooks)"
                        >
                            <li v-for="book in userBooks"
                            :key="book._id"
                            class="trade__userBookContainer trade__bookContainer selectable-box-container selectable-box-container-thin">
                                <div class="selectable-box">
                                    <book :book="book"></book>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="trade__partnerBooksContainer trade__booksContainer">
                      <ul class="trade__partnerBooks trade__books normal-list"
                      :class="getCssClass(partnerBooks)"
                      >
                          <li v-for="book in partnerBooks"
                          :key="book._id"
                          :class="{ 'is-selected': book._id === selectedBook._id }"
                          class="trade__partnerBookContainer trade__bookContainer selectable-box-container selectable-box-container-thin">
                              <div class="selectable-box"
                              @click="handleBookClick(book)"
                              >
                                  <book :book="book"></book>
                              </div>
                          </li>
                      </ul>
                    </div>

                </div>

                <div v-if="status == 'Open' && !userMadeLastAction" class="trade__buttonContainer">

                    <a v-if="showAcceptTradeButton"
                    class="trade__button button large"
                    :class="{ 'disabled': !selectedBook.id }"
                    @click="handleTradeButtonClick('accept')"
                    >
                        Accept Trade
                    </a>

                    <a v-if="showProposeTradeButton"
                    class="trade__button button large"
                    :class="{ 'disabled': !selectedBook.id }"
                    @click="handleTradeButtonClick('propose')"
                    >
                        Propose Trade
                    </a>

                    <a v-if="showCancelTradeButton"
                    class="trade__button button large"
                    @click="handleTradeButtonClick('cancel')"
                    >
                        Cancel Trade
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
      partner: null,
      selectedBook: { id: null }
    }
  },
  computed: {
    tradeRequest () {
      return this.user.getTradeRequest(this.$route.params.id)
    },
    lastAction () {
      return this.tradeRequest.tradeActions[0]
    },
    userIsOwner () {
      return this.user._id === this.tradeRequest.owner._id
    },
    userMadeLastAction () {
      return this.user._id === this.lastAction.actor._id
    },
    showProposeTradeButton () {
      return this.lastAction.action === 'initiate' && this.userIsOwner
    },
    showAcceptTradeButton () {
      return this.lastAction.action === 'countered'
    },
    showCancelTradeButton () {
      return ['initiate', 'countered'].includes(this.lastAction.action)
    },
    status () {
      const statusMap = {
        initiate: 'Open',
        decline: 'Cancelled',
        accept: 'Completed',
        countered: 'Open'
      }

      const lastAction = this.lastAction.action

      return statusMap[lastAction] ? statusMap[lastAction] : 'Cancelled'
    },
    userBooks () {
      if (this.userIsOwner) {
        if (this.tradeRequest.bookInstanceForRequester) {
          return [ this.tradeRequest.bookInstanceForRequester ]
        }
      } else {
        if (this.tradeRequest.bookInstanceForOwner) {
          return [ this.tradeRequest.bookInstanceForOwner ]
        }
      }

      return []
    },
    partnerBooks () {
      if (this.userIsOwner) {
        if (this.lastAction.action === 'initiate') {
          return this.partner.books
        }

        if (this.tradeRequest.bookInstanceForOwner) {
          return [ this.tradeRequest.bookInstanceForOwner ]
        }
      } else {
        if (this.tradeRequest.bookInstanceForRequester) {
          return [ this.tradeRequest.bookInstanceForRequester ]
        }
      }

      return []
    },
    message () {
      const partnerName = this.partner.username
      const bookTitle = this.tradeRequest.bookInstanceForRequester.title
      if (this.userMadeLastAction) {
        return 'Your request has been sent'
      } else {
        if (this.lastAction.action === 'initiate') {
          return `<b>${partnerName}</b> is interested in your copy of <b>${bookTitle}</b>. Select a book or cancel the request below.`
        }
      }
    },
    pendingText () {
      if (this.userMadeLastAction) {
        return `Pending ${this.partner.username}'s response`
      }

      return `Pending your response`
    },
    ...mapState([
      'user'
    ])
  },
  methods: {
    getCssClass (books) {
      return books.length > 5 ? 'trade__books--grid' : 'trade__books--flex'
    },
    handleBookClick (book) {
      this.selectedBook = book
    },
    handleTradeButtonClick (action) {
      let text = `Are you sure that you want to ${action} this trade?`

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
        confirmText: `${window.capitalize(action)} Trade`,
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
    Api.getTradePartner(this.tradeRequest._id)
      .then(partner => {
        this.partner = partner
      })
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
