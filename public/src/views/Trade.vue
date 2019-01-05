<template>

    <div id="page" class="site">

        <site-header/>

        <div id="content" class="site-content layout-container">

            <div v-if="partner && tradeRequest"
            class="trade__container content-area layout-row"
            :class="[status, confirmationClass]"
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
                        :class="{ 'active': status === 'proposed' || status === 'accepted' || status === 'completed' }"
                        >
                          <div class="trade__progressPoint">
                              <div class="trade__progressAction">
                                Proposed
                              </div>
                          </div>
                        </div>

                        <div class="trade__progressPath"
                        :class="{ 'active': status === 'accepted' || status === 'completed' }"
                        >
                          <div class="trade__progressPoint">
                              <div class="trade__progressAction">
                                Accepted
                              </div>
                          </div>
                        </div>

                        <div class="trade__progressPath"
                        :class="[status === 'completed' ? 'active' : '', ['you', 'partner'].includes(confirmation) ? 'faded' : '']"
                        >
                          <div class="trade__progressPoint">
                              <div class="trade__progressAction">
                                Completed
                              </div>
                          </div>

                          <div v-if="confirmationMessage" class="trade__progressNote">
                            {{ confirmationMessage }}
                          </div>

                        </div>

                     </div>
                   </div>

                  </div>

                </div>

                <div class="trade__users">

                    <user-preview :user="userForPreview"></user-preview>

                    <div class="trade__iconContainer">

                      <img class="trade__icon" src="@/assets/right-arrow.svg" />
                      <img class="trade__completedIcon trade__completedIcon--completed" src="@/assets/done.svg" />
                      <img class="trade__completedIcon trade__completedIcon--declined" src="@/assets/close2red.svg" />
                      <img class="trade__icon" src="@/assets/right-arrow.svg" />

                    </div>

                    <user-preview class="reversed" :user="partner"></user-preview>

                </div>

                <div class="trade__booksWrapper">

                    <div class="trade__userBooksContainer trade__booksContainer">
                        <ul class="trade__userBooks trade__books normal-list"
                        :class="getCssClass(userBookInstances)"
                        >
                            <li v-for="bookInstance in userBookInstances"
                            :key="bookInstance.book._id"
                            class="trade__userBookContainer trade__bookContainer selectable-box-container selectable-box-container-thin">
                                <div class="selectable-box">
                                    <book :book="bookInstance.book"></book>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="trade__partnerBooksContainer trade__booksContainer">
                      <ul class="trade__partnerBooks trade__books normal-list"
                      :class="getCssClass(partnerBookInstances)"
                      >
                          <li v-for="bookInstance in partnerBookInstances"
                          :key="bookInstance._id"
                          :class="{ 'is-selected': bookInstance._id === selectedBookInstance._id }"
                          class="trade__partnerBookContainer trade__bookContainer selectable-box-container selectable-box-container-thin">
                              <div class="selectable-box"
                              @click="handleBookClick(bookInstance)"
                              >
                                  <book :book="bookInstance.book"></book>
                              </div>
                          </li>
                      </ul>
                    </div>

                </div>

                <div v-if="showActionButtons" class="trade__buttonContainer">

                  <a v-if="showAcceptTradeButton"
                  class="trade__button button large"
                  :class="{ 'disabled': !selectedBookInstance._id }"
                  @click="handleTradeButtonClick('accept')"
                  >
                    Accept Trade
                  </a>

                  <a v-if="showProposeTradeButton"
                  class="trade__button button large"
                  :class="{ 'disabled': !selectedBookInstance._id }"
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

                  <a v-if="showConfirmTradeButton"
                  class="trade__button trade__button--confirm button large green"
                  @click="handleTradeButtonClick('confirm')"
                  >
                    I confirm that this exchange has been made
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
  beforeRouteUpdate (to, from, next) {
    const id = to.params.id

    if (this.user && this.user.getTradeRequest(id)) {
      next()
    } else {
      this.$router.push('/browse')
    }
  },
  components: {
    SiteHeader,
    SiteFooter,
    UserPreview,
    Book
  },
  data () {
    return {
      partner: null,
      selectedBookInstance: {}
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
    showActionButtons () {
      return (this.tradeisOpen && !this.userMadeLastAction) || this.status === 'accepted'
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
    showConfirmTradeButton () {
      if (this.status !== 'accepted') {
        return false
      }

      if (this.userIsOwner && this.tradeRequest.confirmedByOwner) {
        return false
      }

      if (!this.userIsOwner && this.tradeRequest.confirmedByRequester) {
        return false
      }

      return true
    },
    userBookInstances () {
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
    partnerBookInstances () {
      if (this.userIsOwner) {
        if (this.status === 'initiated') {
          return this.partner.bookInstances
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
    partnerEmail () {
      return this.userIsOwner ? this.tradeRequest.requesterEmail : this.tradeRequest.ownerEmail
    },
    partnerEmailHtml () {
      return `<a class="trade__email" href="mailto:${this.partnerEmail}"><b>${this.partnerEmail}</b></a>`
    },
    exchangeHtml () {
      return `You can contact <b>${this.partner.username}</b> at ${this.partnerEmailHtml} to make arrangements for this exchange`
    },
    message () {
      const partnerName = this.partner.username

      if (this.status === 'completed') {
        return '<b>This trade is completed<b>'
      }

      if (this.userMadeLastAction) {
        if (this.status === 'declined') {
          return 'You have declined this trade'
        } else if (this.status === 'accepted') {
          return `You have accepted this trade. ${this.exchangeHtml}`
        }

        return 'Your request has been sent'
      } else {
        if (this.status === 'initiated') {
          const bookTitle = this.bookInstanceForRequester.book.title
          return `<b>${partnerName}</b> is interested in your copy of <b>${bookTitle}</b>. Select a book or decline the request below.`
        } else if (this.status === 'proposed') {
          return `<b>${partnerName}</b> has proposed a trade`
        } else if (this.status === 'declined') {
          return `<b>${partnerName}</b> has declined this trade`
        } else if (this.status === 'accepted') {
          return `<b>${partnerName}</b> has accepted this trade. ${this.exchangeHtml}`
        }
      }
    },
    pendingText () {
      if (this.userMadeLastAction) {
        return `Pending ${this.partner.username}'s response`
      }

      return `Pending your response`
    },
    confirmation () {
      if (this.tradeRequest.confirmedByOwner) {
        if (this.tradeRequest.confirmedByRequester) {
          return 'both'
        }
        return this.userIsOwner ? 'you' : 'partner'
      } else if (this.tradeRequest.confirmedByRequester) {
        return this.userIsOwner ? 'partner' : 'you'
      }

      return 'none'
    },
    confirmationClass () {
      return `${this.confirmation}Confirmed`
    },
    confirmationMessage () {
      if (this.confirmation === 'you') {
        return 'You have confirmed the exchange'
      } else if (this.confirmation === 'partner') {
        return `${this.partner.username} has confirmed this exchange`
      }

      return ''
    },
    userForPreview () {
      const userForPreview = Object.assign({}, this.user)
      userForPreview.username = 'You'

      return userForPreview
    },
    ...mapState([
      'user'
    ])
  },
  watch: {
    status (newStatus) {
      if (newStatus === 'proposed') {
        this.selectedBookInstance = this.bookInstanceForRequester
      }
    }
  },
  methods: {
    getCssClass (books) {
      return books.length > 5 ? 'trade__books--grid' : 'trade__books--flex'
    },
    handleBookClick (bookInstance) {
      this.selectedBookInstance = bookInstance
    },
    handleTradeButtonClick (action) {
      let text = `Are you sure that you want to ${action} this trade?`

      const callback = () => {
        this.closeModal()

        const id = this.tradeRequest._id

        const data = {
          action
        }

        if (this.selectedBookInstance) {
          const key = this.userIsOwner ? 'bookInstanceForOwnerId' : 'bookInstanceForRequesterId'
          data[key] = this.selectedBookInstance._id
        }

        Api.trade(id, data)
          .then(userData => {
            this.setUser(userData)
            if (this.status === 'completed') {
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

        if (this.status === 'proposed') {
          this.selectedBookInstance = this.bookInstanceForRequester
        }

        if (this.status === 'completed') {
          setTimeout(this.animateBookSwap, 1000)
        }
      })
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
