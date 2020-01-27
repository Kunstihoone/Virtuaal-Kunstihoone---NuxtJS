<template>
  <div class="container">
    <video class="room-video" autoplay muted loop>
      <source src="/videos/300_VABAKA_SAAL_I.mov" />
      Your browser does not support the video tag.
    </video>

    <buttons-layer>
      <navigation-button
        :link-to="{ name: 'vabaka-saal-keha' }"
        :position="{ top: '60%', left: '40%' }"
        icon="plus"
      />
      <navigation-button
        :link-to="{ name: 'vabaka-saal-2' }"
        :position="{ top: '80%', left: '40%' }"
        icon="left"
      />
      <navigation-button
        :link-to="{ name: 'vabaka-saal-kann' }"
        :position="{ top: '60%', left: '60%' }"
        icon="right"
      />
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

export default {
  components: {
    NavigationButton,
    ButtonsLayer
  }
}
</script>
