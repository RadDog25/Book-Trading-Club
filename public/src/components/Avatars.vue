<template>
  <div class="avatars-container">
    <h1 class="heading hed2">Avatar</h1>
    <div class="avatars">
      <a v-for="(imageUrl, index) in avatarImageUrls"
      class="avatar-container selectable-box-container"
      :class="{ 'is-selected': index === user.avatar }"
      :key="index"
      @click="handleClick(index)"
      >
        <img class="avatar selectable-box"
        :src="imageUrl">
      </a>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Avatars',
  data () {
    return {

    }
  },
  computed: {
    avatarImageUrls () {
      return Array(9)
        .fill(null)
        .map((i, index) => require(`@/assets/profile${index + 1}.png`))
    },
    ...mapState([
      'user'
    ])
  },
  methods: {
    handleClick (index) {
      this.updateAvatar(index)
    },
    ...mapActions([
      'updateAvatar'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
