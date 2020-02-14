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
      const data = await store.getters.getSingleRoom(route.params.child)
      if (data.acf.label) {
        store.commit('SetDetailsButton', data.acf.label)
      } else {
        store.commit('SetDetailsButton', null)
      }
      return { data }
    }
  }
}
</script>
