<template>
  <div class="book-container">
    {{ book.title }}
  </div>
</template>

<script>
export default {
  name: 'Book',
  props: [
    'book'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
