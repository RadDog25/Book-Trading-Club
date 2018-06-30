<template>
  <div class="confirmation-container confirmation-container-warning modal__container layout-container">
    <div class="confirmation modal__row">
      <img class="icon" src="@/assets/close2red.svg" alt="success">
      <h3 class="text hed4">Are you sure that you want to remove <b>{{ book.title }}</b> from your library?</h3>

      <div class="buttons-container">
        <a @click="handleConfirmDeleteBook" class="button large">Delete</a>
        <a @click="closeModal" class="button large gray">Cancel</a>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import User from '../User.js'
export default {
  name: 'WarningModal',
  computed: {
    ...mapState([
      'modal'
    ]),
    book () {
      return this.modal.items.warningModal.book
    }
  },
  methods: {
    ...mapMutations([
      'set'
    ]),
    ...mapActions([
      'closeModal',
      'delete'
    ]),
    handleConfirmDeleteBook () {
      this.deleteBookFromUser()
        .then(() => {
          this.closeModal()
        })
    },
    deleteBookFromUser () {
      return new Promise((resolve, reject) => {
        window.axios({
          method: 'delete',
          url: '/api/deletebook',
          data: {
            book: this.book
          }
        })
          .then(response => {
            this.set({
              key: 'user',
              value: new User(response.data)
            })

            resolve()
          })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
