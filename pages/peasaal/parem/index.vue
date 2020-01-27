<template>
  <div class="container">
    <video class="room-video" autoplay muted loop>
      <source src="/videos/240_PEASAAL_PAREM.mov" />
      Your browser does not support the video tag.
    </video>

    <buttons-layer>
      <navigation-button
        :link-to="{ name: 'peasaal-parem-close-up' }"
        :position="{ top: '60%', left: '50%' }"
        icon="plus"
      />

      <navigation-button
        :link-to="{ name: 'peasaal' }"
        :position="{ top: '94%', left: '50%' }"
        icon="down"
      />
    </buttons-layer>
  </div>
</template>

<script>
import NavigationButton from '~/components/NavigationButton'
import ButtonsLayer from '~/components/ButtonsLayer'

export default {
  components: {
    NavigationButton,
    ButtonsLayer
  }
}
</script>
