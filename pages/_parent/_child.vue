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
  async asyncData({ $axios, route }) {
    const data = await $axios.$get(
      `post-types/virtual-exhibitions/${route.params.child}`
    )

    return { data }
  }
}
</script>
