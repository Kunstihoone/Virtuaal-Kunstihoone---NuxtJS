<template>
  <div class="container">
    <video class="room-video" autoplay muted loop>
      <source src="videos/100_FUAJEE.mov" />
      Your browser does not support the video tag.
    </video>

    <buttons-layer>
      <navigation-button
        :link-to="{ name: 'fuajee-tekst' }"
        :position="{ top: '40%', left: '14%' }"
        icon="plus"
      />
      <navigation-button
        :link-to="{ name: 'peasaal' }"
        :position="{ top: '70%', left: '50%' }"
        icon="up"
      />
      <navigation-button
        :link-to="{ name: 'fuajee-padjad' }"
        :position="{ top: '76%', left: '88%' }"
        icon="plus"
      />
      <navigation-button
        :link-to="{ name: 'vabaka-saal-1' }"
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
    ButtonsLayer,
    NavigationButton
  },
  mixins: [MixinLeaveTransition]
}
</script>
