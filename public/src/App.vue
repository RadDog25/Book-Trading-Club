<template>

  <div id="app"

  >
    <loading-icon></loading-icon>

    <transition name="modal">

      <confirmation-modal v-if="modal.items.confirmationModal.isActive"
      :modal="modal.items.confirmationModal"
      ></confirmation-modal>

      <book-info-modal v-if="modal.items.bookInfoModal.isActive"
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
import ConfirmationModal from '@/components/ConfirmationModal.vue'
import BookInfoModal from '@/components/BookInfoModal.vue'
import LoadingIcon from '@/components/LoadingIcon.vue'
import { mapState } from 'vuex'
export default {
  name: 'App',
  components: {
    BookInfoModal,
    ConfirmationModal,
    LoadingIcon
  },
  computed: {
    viewClass () {
      if (this.$route.name) {
        return `${this.$route.name.toLowerCase()}-view`
      }

      return ''
    },
    ...mapState([
      'modal'
    ])
  }
}
</script>

<style src="./scss/main.scss"
lang="scss"
></style>
