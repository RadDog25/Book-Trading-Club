<template>
  <div class="userPreview__container">

      <img class="userPreview__avatar" :src="avatarImageUrl">

      <div class="userPreview__info">
        <div class="userPreview__username">
          <b>{{ user.username }}</b>
        </div>

        <div class="userPreview__location">
          {{ user.location }}
        </div>
      </div>

    </div>
</template>

<script>
export default {
  name: 'UserPreview',
  props: [
    'user'
  ],
  computed: {
    avatarImageUrl () {
      return require(`@/assets/profile${this.user.avatar + 1}.png`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
