<template>
  <main :class="{ 'modal-active': activeModal }" class="main">
    <div class="main__content">
      {{ activeModal }}
      <audio-guide />
      <main-navigation />
      <nuxt />
    </div>

    <details-layer v-if="activeModal" :modal-name="activeModal" />
  </main>
</template>

<script>
import { mapState } from 'vuex'
import AudioGuide from '~/components/AudioGuide'
import MainNavigation from '~/components/MainNavigation'
import DetailsLayer from '~/components/DetailsLayer'

export default {
  components: {
    AudioGuide,
    MainNavigation,
    DetailsLayer
  },
  computed: {
    ...mapState({
      activeModal: (state) => state.activeModal
    })
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: 'Favorit';
  font-display: auto;
  src: url('~assets/fonts/Favorit_Regular-Tallinn.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Favorit';
  font-display: auto;
  src: url('~assets/fonts/FavoritPro-Bold.woff2') format('woff2'),
    url('~assets/fonts/FavoritPro-Bold.woff') format('woff');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'Favorit Mono';
  font-display: auto;
  src: url('~assets/fonts/FavoritMonoStd-Book.woff2') format('woff2'),
    url('~assets/fonts/FavoritMonoStd-Book.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

html {
  @include global-map-loop($root-fonts-sizes, font-size);
}

body {
  font-family: 'Favorit';
  background-color: black;
  color: white;
  overflow: hidden;
}

.main__content {
  .modal-active & {
    filter: blur(20px);
  }
}

.container {
  width: 100vw;
  height: 100vh;
}

.room-video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.button {
  background-color: white;
  color: $black;
  padding: 0.4rem 0.8rem;
  border-radius: 0.6rem;
  font-size: 1rem;
  box-shadow: $button-shadow;
  line-height: 1;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: $gray;
  }
}
</style>
