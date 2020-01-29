<template>
  <div class="container">
    <video class="room-video" autoplay muted loop controls>
      <source src="/videos/414_VABAKA_SAAL_II_PANNOO.mov" />
      Your browser does not support the video tag.
    </video>

    <buttons-layer>
      <navigation-button
        :link-to="{ name: 'vabaka-saal-3-pannoo-3' }"
        :position="{ top: '50%', left: '6%' }"
        icon="left"
      />

      <navigation-button
        :link-to="{ name: 'vabaka-saal-3-pannoo-5' }"
        :position="{ top: '50%', left: '94%' }"
        icon="right"
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
