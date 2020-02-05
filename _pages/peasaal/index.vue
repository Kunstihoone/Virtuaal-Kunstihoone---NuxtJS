<template>
  <div class="container">
    <video class="room-video" autoplay muted loop>
      <source src="/videos/200_PEASAAL.mov" />
      Your browser does not support the video tag.
    </video>

    <back-button :link-to="{ name: 'index' }" />

    <buttons-layer>
      <navigation-button
        :link-to="{ name: 'peasaal-vasak' }"
        :position="{ top: '66%', left: '16%' }"
        icon="plus"
      />

      <navigation-button
        :link-to="{ name: 'peasaal-vaibad' }"
        :position="{ top: '60%', left: '51%' }"
        icon="plus"
      />

      <navigation-button
        :link-to="{ name: 'peasaal-parem' }"
        :position="{ top: '66%', left: '88%' }"
        icon="plus"
      />

      <navigation-button
        :link-to="{ name: 'peasaal-heliinstallatsioon' }"
        :position="{ top: '70%', left: '46%' }"
        icon="plus"
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
import BackButton from '~/components/BackButton'
import ButtonsLayer from '~/components/ButtonsLayer'
import NavigationButton from '~/components/NavigationButton'

export default {
  components: {
    BackButton,
    ButtonsLayer,
    NavigationButton
  }
}
</script>
