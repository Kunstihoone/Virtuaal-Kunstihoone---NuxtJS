<template>
  <nav class="main-navigation">
    <a class="main-navigation__info button">Info</a>

    <audio-guide v-if="$route.name !== 'index'" />

    <details-button v-if="detailsButton" :modal-data="detailsButton"
      >Detailid</details-button
    >
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import AudioGuide from '~/components/AudioGuide'
import DetailsButton from '~/components/DetailsButton'

export default {
  components: {
    AudioGuide,
    DetailsButton
  },
  computed: {
    ...mapState({
      detailsButton: (state) => state.detailsButton
    })
  }
}
</script>

<style lang="scss" scoped>
.main-navigation {
  z-index: 60;
  opacity: 1;
  transition: 0.3s ease;

  .modal-active & {
    opacity: 0;
  }
}

.main-navigation__info {
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  z-index: 40;
}
</style>
