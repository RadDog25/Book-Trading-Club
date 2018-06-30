<template>
  <div class="starRating__container">
      <i v-for="i in numberOfFullStars"
      :key="i"
      class="fa fa-star starRating__star" aria-hidden="true"></i>

      <i v-if="hasHalfStar"
      class="fa fa-star-half-o starRating__star" aria-hidden="true"></i>
  </div>
</template>

<script>
export default {
  name: 'StarRating',
  props: [
    'averageRating'
  ],
  computed: {
    numberOfFullStars () {
      if (this.averageRating) return Math.floor(this.averageRating)
    },
    hasHalfStar () {
      if (this.averageRating) return this.averageRating.toString().includes('.5')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
