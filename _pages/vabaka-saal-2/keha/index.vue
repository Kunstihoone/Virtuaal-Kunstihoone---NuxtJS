a<template>
  <div class="container">
    <video class="room-video" autoplay muted loop>
      <source src="/videos/312_VABAKA_SAAL_KEHA.mov" />
      Your browser does not support the video tag.
    </video>

    <buttons-layer>
      <navigation-button
        :link-to="{ name: 'vabaka-saal-2-keha-2' }"
        :position="{ top: '50%', left: '94%' }"
        icon="right"
      />

      <navigation-button
        :link-to="{ name: 'vabaka-saal-2' }"
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
