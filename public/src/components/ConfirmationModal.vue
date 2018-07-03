<template>
  <div class="confirmation__container modal__container layout-container"
  :class="{ 'confirmation__container--success': modal.isSuccess }"
  >
    <div class="confirmation__row modal__row">

      <img v-if="modal.isSuccess"
      class="modal__icon confirmation__icon"
      src="@/assets/done.svg"
      alt="success">

      <img v-else
      class="modal__icon confirmation__icon"
      src="@/assets/warning.svg"
      alt="success">

      <h3 class="modal__text confirmation__text hed4"
      v-html="modal.text"
      ></h3>

      <div class="modal__buttonsContainer">

        <a v-if="hasCallback"
        @click="modal.callback"
        class="modal__button confirmation__confirmButton button large">
          {{ modal.confirmText }}
        </a>

        <a @click="closeModal"
        class="modal__button confirmation__closeButton button large">
          {{ modal.closeText }}
        </a>

      </div>

    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Confirmation',
  props: [
    'modal'
  ],
  computed: {
    hasCallback () {
      const callback = this.modal.callback
      return callback && typeof callback === 'function'
    }
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
