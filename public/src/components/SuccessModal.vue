<template>
  <div class="confirmation-container modal__container layout-container">
    <div class="confirmation modal__row">
      <img class="icon" src="@/assets/done.svg" alt="success">
      <h2 class="text hed2">{{ modal.items.successModal.text }}</h2>
      <a @click="closeModal"
      class="button large green">OK</a>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Confirmation',
  computed: {
    ...mapState([
      'modal'
    ])
  },
  methods: {
    ...mapActions([
      'closeModal'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
