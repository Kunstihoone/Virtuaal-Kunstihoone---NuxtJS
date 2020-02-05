<template>
  <div class="container">
    <div id="video-wrapper" class="room-video" />

    <buttons-layer v-if="data && data.acf">
      <navigation-button
        v-for="(button, index) in data.acf.buttons"
        :key="index"
        :button-data="button"
      />
    </buttons-layer>
  </div>
</template>

<script>
import NavigationButton from '~/components/NavigationButton'
import ButtonsLayer from '~/components/ButtonsLayer'
import MixinLeaveTransition from '~/mixins/MixinLeaveTransition'
import MixinRoom from '~/mixins/MixinRoom'

export default {
  components: {
    ButtonsLayer,
    NavigationButton
  },
  mixins: [MixinLeaveTransition, MixinRoom],
  async asyncData({ $axios, route }) {
    const data = await $axios.$get(
      `post-types/virtual-exhibitions/${route.params.child}`
    )

    return { data }
  }
}
</script>
