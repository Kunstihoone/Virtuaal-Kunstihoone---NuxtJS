<template>
  <ratio-container>
    <div id="video-wrapper" class="room-video" />

    <template v-if="data && data.acf">
      <navigation-button
        v-for="(button, index) in data.acf.buttons"
        :key="index"
        :button-data="button"
      />
    </template>
  </ratio-container>
</template>

<script>
import NavigationButton from '~/components/NavigationButton'
import MixinRoom from '~/mixins/MixinRoom'
import RatioContainer from '~/components/RatioContainer'

export default {
  components: {
    NavigationButton,
    RatioContainer
  },
  mixins: [MixinRoom],
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
