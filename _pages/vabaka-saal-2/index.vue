<template>
  <div class="container">
    <video class="room-video" autoplay muted loop>
      <source src="/videos/310_VABAKA_SAAL_I_KEHA.mov" />
      Your browser does not support the video tag.
    </video>

    <buttons-layer>
      <navigation-button
        :link-to="{ name: 'vabaka-saal-2-kinosaal' }"
        :position="{ top: '56%', left: '46%' }"
        icon="up"
      />
      <navigation-button
        :link-to="{ name: 'vabaka-saal-2-keha' }"
        :position="{ top: '56%', left: '34%' }"
        icon="plus"
      />
      <navigation-button
        :link-to="{ name: 'index' }"
        :position="{ top: '50%', left: '6%' }"
        icon="left"
      />
      <navigation-button
        :link-to="{ name: 'vabaka-saal-3' }"
        :position="{ top: '56%', left: '68%' }"
        icon="up"
      />
      <navigation-button
        :link-to="{ name: 'vabaka-saal-1-kann' }"
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
