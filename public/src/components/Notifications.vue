<template>
  <div v-if="newNotifications.length"
  class="notifications__container main-menu-item dropdown-item">

    <div class="notifications__iconContainer">
      <img class="notifications__icon" src="@/assets/bell.svg" />
      <div v-if="newNotifications.length" class="notifications__number">
        {{ newNotifications.length }}
      </div>
    </div>

    <div class="notifications__items dropdown-menu">
      <div v-for="item in newNotifications"
      class="notifications__item dropdown-menu-item"
      :key="item._id"
      >
        <a :href="`/#${item.link}`"
        class="normal-link hover-opacity"
        >
            <div class="notifications__itemMessage">
                {{ item.content }}
            </div>
            <div class="notifications__itemTime">
              {{ getTime(item.createdAt) }}
            </div>
        </a>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import moment from 'moment'

export default {
  name: 'Notifications',
  computed: {
    ...mapState([
      'user'
    ]),
    newNotifications () {
      return this.user.notifications.filter(item => item.new)
    }
  },
  methods: {
    ...mapMutations([
      'setUser'
    ]),
    getTime (dateString) {
      return moment(dateString).fromNow()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
