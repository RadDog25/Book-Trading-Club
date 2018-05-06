<template>
  <div class="confirmation-container layout-container">
    <div class="confirmation">
      <img class="icon" src="@/assets/done.svg" alt="success">
      <h2 class="text hed2">{{ confirmation.text }}</h2>
      <a @click="closeConfirmation"
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
      'confirmation'
    ])
  },
  methods: {
    ...mapActions([
      'closeConfirmation'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
