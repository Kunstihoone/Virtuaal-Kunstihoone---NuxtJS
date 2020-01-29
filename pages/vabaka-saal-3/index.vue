<template>
  <div class="container">
    <video class="room-video" autoplay muted loop controls>
      <source src="/videos/410_VABAKA_SAAL_II_PANNOO.mov" />
      Your browser does not support the video tag.
    </video>

    <buttons-layer>
      <navigation-button
        :link-to="{ name: 'ekraanide-saal' }"
        :position="{ top: '60%', left: '10%' }"
        icon="plus"
      />

      <!-- <navigation-button
        :link-to="{ name: 'ekraanide-saal' }"
        :position="{ top: '54%', left: '42%' }"
        icon="plus"
      /> -->

      <navigation-button
        :link-to="{ name: 'vabaka-saal-3-pannoo' }"
        :position="{ top: '90%', left: '10%' }"
        icon="plus"
      />

      <navigation-button
        :link-to="{ name: 'vabaka-saal-3-pannoo-2' }"
        :position="{ top: '50%', left: '24%' }"
        icon="plus"
      />

      <navigation-button
        :link-to="{ name: 'vabaka-saal-3-pannoo-3' }"
        :position="{ top: '50%', left: '36%' }"
        icon="plus"
      />

      <navigation-button
        :link-to="{ name: 'vabaka-saal-3-pannoo-4' }"
        :position="{ top: '50%', left: '48%' }"
        icon="plus"
      />

      <navigation-button
        :link-to="{ name: 'vabaka-saal-3-pannoo-5' }"
        :position="{ top: '50%', left: '62%' }"
        icon="plus"
      />

      <navigation-button
        :link-to="{ name: 'vabaka-saal-3-lauad' }"
        :position="{ top: '60%', left: '54%' }"
        icon="plus"
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
