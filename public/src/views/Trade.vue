<template>

    <div id="page" class="site">

        <site-header/>

        <div id="content" class="site-content layout-container">

            <div v-if="partner && tradeRequest"
            class="trade__container content-area layout-row"
            :class="status"
            >

                <div class="trade__headingContainer heading-with-border">

                  <h1 class="trade__heading hed1">

                    <span>Trade Request</span>

                    <span class="trade__status trade__statusBlock button"
                    :class="status"
                    >{{ capitalizedStatus }}</span>

                    <span v-if="status === 'Open'"
                    class="trade__status trade__statusBlock button"
                    :class="{ 'lastAction': !userMadeLastAction }"
                    >{{ pendingText }}</span>

                  </h1>

                  <div class="trade__messageContainer">

                    <div v-if="message"
                    class="trade__message"
                   v-html="message"
                   ></div>

                   <div class="trade__progressLineContainer">
                     <div class="trade__progressLine">

                        <div class="trade__progressPath">
                          <div class="trade__progressPoint">
                              <div class="trade__progressAction">
                                Initiated
                              </div>
                          </div>
                        </div>

                        <div class="trade__progressPath"
                        :class="{ 'active': status === 'proposed' || status === 'accepted' }"
                        >
                          <div class="trade__progressPoint">
                              <div class="trade__progressAction">
                                Proposed
                              </div>
                          </div>
                        </div>

                        <div class="trade__progressPath"
                        :class="{ 'active': status === 'accepted' }"
                        >
                          <div class="trade__progressPoint">
                              <div class="trade__progressAction">
                                Accepted
                              </div>
                          </div>
                        </div>

                     </div>
                   </div>

                  </div>

                </div>

                <div class="trade__users">

                    <user-preview :user="user"></user-preview>

                    <div class="trade__iconContainer">

                      <img class="trade__icon" src="@/assets/right-arrow.svg" />
                      <img class="trade__confirmedIcon trade__confirmedIcon--accepted" src="@/assets/done.svg" />
                      <img class="trade__confirmedIcon trade__confirmedIcon--declined" src="@/assets/close2red.svg" />
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

                <div v-if="tradeisOpen && !userMadeLastAction" class="trade__buttonContainer">

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

                    <a v-if="showDeclineTradeButton"
                    class="trade__button button large"
                    @click="handleTradeButtonClick('decline')"
                    >
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
import velocity from 'velocity-animate'
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
    lastActionWasRequester () {
      return this.tradeRequest.lastActionWasRequester
    },
    status () {
      return this.tradeRequest.status
    },
    capitalizedStatus () {
      return window.capitalize(this.status)
    },
    tradeisOpen () {
      return ['initiated', 'proposed'].includes(this.status)
    },
    bookInstanceForOwner () {
      return this.tradeRequest.bookInstanceForOwner
    },
    bookInstanceForRequester () {
      return this.tradeRequest.bookInstanceForRequester
    },
    userIsOwner () {
      return this.user._id === this.tradeRequest.owner._id
    },
    userMadeLastAction () {
      return (this.userIsOwner && !this.lastActionWasRequester) ||
      (!this.userIsOwner && this.lastActionWasRequester)
    },
    showProposeTradeButton () {
      return this.status === 'initiated' && this.userIsOwner
    },
    showAcceptTradeButton () {
      return this.status === 'proposed'
    },
    showDeclineTradeButton () {
      return ['initiated', 'proposed'].includes(this.status)
    },
    userBooks () {
      if (this.userIsOwner) {
        if (this.bookInstanceForRequester) {
          return [ this.bookInstanceForRequester ]
        }
      } else {
        if (this.bookInstanceForOwner) {
          return [ this.bookInstanceForOwner ]
        }
      }

      return []
    },
    partnerBooks () {
      if (this.userIsOwner) {
        if (this.status === 'initiated') {
          return this.partner.books
        }

        if (this.bookInstanceForOwner) {
          return [ this.bookInstanceForOwner ]
        }
      } else {
        if (this.bookInstanceForRequester) {
          return [ this.bookInstanceForRequester ]
        }
      }

      return []
    },
    message () {
      const partnerName = this.partner.username
      if (this.userMadeLastAction) {
        if (this.status === 'declined') {
          return 'You have declined this trade'
        } else if (this.status === 'accepted') {
          return 'You have accepted this trade'
        }

        return 'Your request has been sent'
      } else {
        if (this.status === 'initiated') {
          const bookTitle = this.bookInstanceForRequester.title
          return `<b>${partnerName}</b> is interested in your copy of <b>${bookTitle}</b>. Select a book or decline the request below.`
        } else if (this.status === 'proposed') {
          return `<b>${partnerName}</b> has proposed a trade`
        } else if (this.status === 'declined') {
          return `<b>${partnerName}</b> has declined this trade`
        } else if (this.status === 'accepted') {
          return `<b>${partnerName}</b> has accepted this trade`
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

        const tradeRequestData = {
          id: this.tradeRequest._id,
          action
        }

        if (this.selectedBook) {
          const key = this.userIsOwner ? 'bookInstanceForOwner' : 'bookInstanceForRequester'
          tradeRequestData[key] = this.selectedBook
        }

        Api.trade(tradeRequestData)
          .then(userData => {
            this.setUser(userData)
            if (this.status === 'accepted') {
              setTimeout(() => {
                this.animateBookSwap()
              }, 1000)
            }
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
    animateBookSwap () {
      let userBook = document.getElementsByClassName('trade__userBookContainer')[0]
      let partnerBook = document.getElementsByClassName('trade__partnerBookContainer')[0]

      let distanceBetweenBooks = userBook.getBoundingClientRect().left -
      partnerBook.getBoundingClientRect().left

      velocity(userBook, {
        translateX: [-distanceBetweenBooks, 0]
      }, {
        duration: 300
      })

      velocity(partnerBook, {
        translateX: [distanceBetweenBooks, 0]
      }, {
        duration: 300
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
