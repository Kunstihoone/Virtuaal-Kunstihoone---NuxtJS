<template>
  <main :class="{ 'modal-active': detailsLayer }" class="main">
    <ratio-container>
      <navigation-layer :current-room="currentRoom" />

      <nuxt />

      <placeholder-image
        v-if="placeholderImage"
        :placeholder-image="placeholderImage"
      />

      <room-navigation
        v-if="getRouteBaseName() !== 'index'"
        :current-room="currentRoom"
      />

      <transition name="fade">
        <loading-indicatior v-if="placeholderVisible" />
      </transition>

      <details-layer v-if="detailsLayer" :details-layer="detailsLayer" />

      <transition name="fade">
        <splash-layer v-if="getRouteBaseName() !== 'index' && splashState" />
      </transition>
    </ratio-container>
  </main>
</template>

<script>
import anime from 'animejs'
import { mapState } from 'vuex'
import NavigationLayer from '~/components/NavigationLayer/NavigationLayer'
import DetailsLayer from '~/components/DetailsLayer'
import SplashLayer from '~/components/SplashLayer'
import RatioContainer from '~/components/RatioContainer'
import RoomNavigation from '~/components/RoomNavigation'
import PlaceholderImage from '~/components/PlaceholderImage'
import LoadingIndicatior from '~/components/LoadingIndicatior'

export default {
  components: {
    NavigationLayer,
    DetailsLayer,
    SplashLayer,
    RatioContainer,
    RoomNavigation,
    PlaceholderImage,
    LoadingIndicatior
  },
  computed: {
    ...mapState({
      splashState: (state) => state.splashState,
      placeholderImage: (state) => state.placeholderImage,
      placeholderVisible: (state) => state.placeholderVisible,
      detailsLayer: (state) => state.detailsLayer,
      navigationButtons: (state) => state.navigationButtons
    }),
    currentRoom() {
      if (this.$route.params.child || this.$route.params.parent) {
        return this.$store.getters.getSingleRoom(
          this.$route.params.child
            ? this.$route.params.child
            : this.$route.params.parent
        )
      } else {
        return null
      }
    }
  },
  watch: {
    $route() {
      this.$store.commit('SetNavigationButtons', null)
      this.$store.commit('SetDetailsLayer', null)

      if (this.getRouteBaseName() === 'index') {
        this.$store.commit('SetPlaceholderImage', null)
        this.$store.commit('SetPlaceholderVisible', false)
      }
    }
  },
  mounted() {
    window.onpopstate = (event) => {
      this.$store.commit('SetPlaceholderImage', null)
    }
  },
  methods: {
    playerEnter(el, done) {
      anime({
        targets: el,
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 800
      })
    },
    playerLeave(el, done) {
      anime({
        targets: el,
        opacity: [1, 0],
        easing: 'easeOutExpo',
        duration: 600,
        complete: (anim) => {
          done()
        }
      })
    }
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: 'Favorit';
  font-display: auto;
  src: url('~assets/fonts/FavoritPro-Book.woff2') format('woff2'),
    url('~assets/fonts/FavoritPro-Book.woff') format('woff');
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

html {
  @include global-map-loop($root-fonts-sizes, font-size);
}

body {
  font-family: $body-font-family;
  background-color: $black;
  overflow: hidden;
  color: $black;
}

p {
  margin-bottom: 1rem;
}

h1 {
  @include font-size(h1);
}

h2 {
  @include font-size(h2);
}

h3 {
  @include font-size(h3);
}
h4 {
  @include font-size(h4);
}
h5 {
  @include font-size(h5);
}

h6 {
  @include font-size(h6);
}

.main {
  position: relative;
  height: 100vh;
}

.button {
  display: inline-block;
  height: 2rem;
  background-color: white;
  color: $black;
  padding: 0.5rem 0.8rem;
  border-radius: 0.6rem;
  font-size: 1rem;
  box-shadow: $button-shadow;
  line-height: 1;
  transition: 0.3s ease-in-out;
  cursor: pointer;

  &.m-active,
  &:hover {
    background-color: $gray;
    box-shadow: 0px 2px 10px rgba(84, 84, 84, 0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
