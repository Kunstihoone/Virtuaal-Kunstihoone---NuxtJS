<template>
  <div class="container">
    <video class="room-video" autoplay muted loop>
      <source src="/videos/235_PEASAAL_VASAK_05.mov" />
      Your browser does not support the video tag.
    </video>

    <buttons-layer>
      <navigation-button
        :link-to="{ name: 'peasaal-vasak-4' }"
        :position="{ top: '50%', left: '6%' }"
        icon="left"
      />

      <navigation-button
        :link-to="{ name: 'peasaal-vasak' }"
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
