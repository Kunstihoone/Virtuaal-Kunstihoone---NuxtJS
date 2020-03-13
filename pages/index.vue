<template>
  <div>
    <room-wrapper v-if="userReady" :data="data" />
    <img
      v-if="data.featured_image && data.featured_image.sizes.medium"
      :src="data.featured_image.sizes.medium"
      class="placeholder-image"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MixinTransitionOut from '~/mixins/MixinTransitionOut'
import RoomWrapper from '~/components/RoomWrapper'

export default {
  components: {
    RoomWrapper
  },
  mixins: [MixinTransitionOut],
  computed: {
    ...mapState({
      userReady: (state) => state.userReady
    })
  },
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

<style lang="scss" scoped>
.placeholder-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
