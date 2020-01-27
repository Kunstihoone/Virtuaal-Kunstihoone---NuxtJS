<template>
  <div class="container">
    <video class="room-video" autoplay muted loop>
      <source src="/videos/120_FUAJEE_PADJAD.mov" />
      Your browser does not support the video tag.
    </video>

    <buttons-layer>
      <navigation-button
        :link-to="{ name: 'index' }"
        :position="{ top: '94%', left: '50%' }"
        icon="down"
      />
    </buttons-layer>

    <details-button modal-name="alison-odaniel" />
  </div>
</template>

<script>
import ButtonsLayer from '~/components/ButtonsLayer'
import DetailsButton from '~/components/DetailsButton'
import NavigationButton from '~/components/NavigationButton'
import MixinLeaveTransition from '~/mixins/MixinLeaveTransition'

export default {
  components: {
    ButtonsLayer,
    DetailsButton,
    NavigationButton
  },
  mixins: [MixinLeaveTransition]
}
</script>
