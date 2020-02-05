<template>
  <div class="container">
    <video class="room-video" autoplay muted loop>
      <source src="/videos/221_PEASAAL_HELIINSTALLATSIOON_KASSETID.mov" />
      Your browser does not support the video tag.
    </video>

    <buttons-layer>
      <navigation-button
        :link-to="{ name: 'peasaal-heliinstallatsioon' }"
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
