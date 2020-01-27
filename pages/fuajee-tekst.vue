<template>
  <div class="container">
    <video class="room-video" autoplay muted loop>
      <source src="/videos/110_FUAJEE_TEKST.mov" />
      Your browser does not support the video tag.
    </video>

    <buttons-layer>
      <navigation-button
        :link-to="{ name: 'index' }"
        :position="{ top: '94%', left: '50%' }"
        icon="down"
      />
    </buttons-layer>
  </div>
</template>

<script>
import NavigationButton from '~/components/NavigationButton'
import ButtonsLayer from '~/components/ButtonsLayer'
import MixinLeaveTransition from '~/mixins/MixinLeaveTransition'

export default {
  components: {
    NavigationButton,
    ButtonsLayer
  },
  mixins: [MixinLeaveTransition]
}
</script>
