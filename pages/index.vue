<template>
  <room-wrapper :data="data" />
</template>

<script>
import MixinTransitionOut from '~/mixins/MixinTransitionOut'
import RoomWrapper from '~/components/RoomWrapper'

export default {
  components: {
    RoomWrapper
  },
  mixins: [MixinTransitionOut],
  async asyncData({ params, store, payload, route }) {
    if (payload) {
      return { data: payload }
    } else {
      store.commit('SetDetailsButton', null)
      return { data: await store.getters.getSingleRoom('fuajee') }
    }
  }
}
</script>
