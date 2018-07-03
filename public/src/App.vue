<template>

  <div id="app"

  >
    <loading-icon></loading-icon>

    <transition name="modal">

      <success-modal v-if="modal.items.successModal.isActive"
      ></success-modal>

      <book-info-modal v-if="modal.items.bookInfoModal.isActive"
      ></book-info-modal>

      <warning-modal v-if="modal.items.warningModal.isActive"
      ></warning-modal>

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
import SuccessModal from '@/components/SuccessModal.vue'
import WarningModal from '@/components/WarningModal.vue'
import BookInfoModal from '@/components/BookInfoModal.vue'
import LoadingIcon from '@/components/LoadingIcon.vue'
import { mapState } from 'vuex'
export default {
  name: 'App',
  components: {
    SuccessModal,
    BookInfoModal,
    WarningModal,
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
