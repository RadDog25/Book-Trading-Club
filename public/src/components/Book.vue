<template>
  <div class="book__container">
    <img
    :src="book.thumbnail" :alt="book.title"
    class="book__image">

    <div class="book__layer">
      <img @click.stop="handleInfoClick"
      class="book__infoIcon" src="@/assets/info.svg" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Book',
  props: [
    'book'
  ],
  methods: {
    ...mapActions([
      'openBookInfoModal'
    ]),
    handleInfoClick () {
      this.openBookInfoModal(this.book)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
