<template>

  <div id="app"

  >

    <transition name="fade">
      <confirmation v-if="confirmation.isActive"
      ></confirmation>
    </transition>

    <transition name="fade">
      <book-info-modal v-if="bookInfoModal.isActive"
      ></book-info-modal>
    </transition>

    <transition name="fade" mode="out-in">
      <router-view
      class="background-cover"
      :class="viewClass"
      />
    </transition>

  </div>

</template>

<script>
import Confirmation from '@/components/Confirmation.vue'
import BookInfoModal from '@/components/BookInfoModal.vue'
import { mapState } from 'vuex'
export default {
  name: 'App',
  components: {
    Confirmation,
    BookInfoModal
  },
  computed: {
    viewClass () {
      if (this.$route.name) {
        return `${this.$route.name.toLowerCase()}-view`
      }

      return ''
    },
    ...mapState([
      'confirmation',
      'bookInfoModal'
    ])
  }
}
</script>

<style src="./scss/main.scss"
lang="scss"
></style>
