<template>
  <div class="container">
    <video class="room-video" autoplay muted loop>
      <source src="/videos/230_PEASAAL_VASAK.mov" />
      Your browser does not support the video tag.
    </video>

    <buttons-layer>
      <navigation-button
        :link-to="{ name: 'peasaal-vasak-1' }"
        :position="{ top: '48%', left: '6%' }"
        icon="plus"
      />

      <navigation-button
        :link-to="{ name: 'peasaal-vasak-2' }"
        :position="{ top: '48%', left: '28%' }"
        icon="plus"
      />

      <navigation-button
        :link-to="{ name: 'peasaal-vasak-3' }"
        :position="{ top: '48%', left: '50%' }"
        icon="plus"
      />

      <navigation-button
        :link-to="{ name: 'peasaal-vasak-4' }"
        :position="{ top: '48%', left: '72%' }"
        icon="plus"
      />

      <navigation-button
        :link-to="{ name: 'peasaal-vasak-5' }"
        :position="{ top: '48%', left: '94%' }"
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
