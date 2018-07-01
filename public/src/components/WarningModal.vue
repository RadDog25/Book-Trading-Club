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
import { mapState, mapActions } from 'vuex'
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
    ...mapActions([
      'closeModal',
      'deleteBook'
    ]),
    handleConfirmDeleteBook () {
      this.deleteBook(this.book)
        .then(() => {
          this.closeModal()
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
