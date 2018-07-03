<template>
  <div class="loadingIcon__container"
  :class="{ active: isLoading }"
  >
    <div class="loadingIcon__square"></div>
    <div class="loadingIcon__square"></div>
    <div class="loadingIcon__square"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LoadingIcon',
  computed: {
    ...mapState([
      'isLoading'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
