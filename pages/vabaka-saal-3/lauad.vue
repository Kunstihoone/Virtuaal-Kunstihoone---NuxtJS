<template>
  <div class="container">
    <video class="room-video" autoplay muted loop controls>
      <source src="/videos/416_VABAKA_SAAL_II_LAUAD.mov" />
      Your browser does not support the video tag.
    </video>

    <buttons-layer>
      <navigation-button
        :link-to="{ name: 'vabaka-saal-2' }"
        :position="{ top: '50%', left: '6%' }"
        icon="up"
      />

      <navigation-button
        :link-to="{ name: 'ekraanide-saal' }"
        :position="{ top: '44%', left: '60%' }"
        icon="up"
      />

      <navigation-button
        :link-to="{ name: 'vabaka-saal-3' }"
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
