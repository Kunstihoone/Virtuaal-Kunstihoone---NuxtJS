<template>
  <main :class="{ 'modal-active': modalData }" class="main">
    <main-navigation v-if="$route.name !== 'index'" />
    <nuxt />
    <details-layer v-if="modalData" :modal-data="modalData" />
  </main>
</template>

<script>
import { mapState } from 'vuex'
import MainNavigation from '~/components/MainNavigation'
import DetailsLayer from '~/components/DetailsLayer'

export default {
  components: {
    MainNavigation,
    DetailsLayer
  },
  computed: {
    ...mapState({
      modalData: (state) => state.modalData
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
  background-color: #fff7cd;
  color: white;
  overflow: hidden;
}

.main {
  position: relative;
  height: 100vh;
}

.room-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;

  iframe {
    width: 100%;
    height: 100%;
  }
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
