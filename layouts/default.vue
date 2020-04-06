<template>
  <main :class="{ 'modal-active': detailsLayer }" class="main">
    <ratio-container>
      <navigation-layer :current-room="currentRoom" />

      <nuxt />

      <placeholder-image
        v-if="placeholderImage"
        :placeholder-image="placeholderImage"
      />

      <transition name="fast-fade">
        <room-navigation
          v-if="getRouteBaseName() !== 'index'"
          :current-room="currentRoom"
        />
      </transition>

      <loading-indicatior v-if="placeholderVisible" />

      <details-layer v-if="detailsLayer" :details-layer="detailsLayer" />

      <transition name="fade">
        <splash-layer v-if="getRouteBaseName() !== 'index' && splashState" />
      </transition>
    </ratio-container>

    <background-audio
      v-if="
        getRouteBaseName() !== 'index' &&
          currentRoom &&
          currentRoom.acf.audio_track
      "
      :key="currentRoom.acf.audio_track.url"
      :audio-data="currentRoom.acf.audio_track"
    />

    <portrait-notification v-if="isWindowPortrait" />
  </main>
</template>

<script>
import anime from 'animejs'
import { mapState } from 'vuex'
import BackgroundAudio from '~/components/BackgroundAudio'
import NavigationLayer from '~/components/NavigationLayer/NavigationLayer'
import DetailsLayer from '~/components/DetailsLayer'
import SplashLayer from '~/components/SplashLayer'
import RatioContainer from '~/components/RatioContainer'
import RoomNavigation from '~/components/RoomNavigation'
import PlaceholderImage from '~/components/PlaceholderImage'
import LoadingIndicatior from '~/components/LoadingIndicatior'
import PortraitNotification from '~/components/PortraitNotification'

export default {
  components: {
    BackgroundAudio,
    NavigationLayer,
    DetailsLayer,
    SplashLayer,
    RatioContainer,
    RoomNavigation,
    PlaceholderImage,
    LoadingIndicatior,
    PortraitNotification
  },
  data() {
    return {
      isWindowPortrait: false
    }
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
    this.checkWindowPortrait()
    window.addEventListener('resize', this.checkWindowPortrait)

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      this.$store.commit('SetMutedRoomAudio', true)
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkWindowPortrait)
  },
  methods: {
    checkWindowPortrait() {
      this.isWindowPortrait = window.innerHeight > window.innerWidth
    },
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

  margin-bottom: 1rem;
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
  height: $nav-button-small;
  background-color: white;
  color: $black;
  padding: 0.3rem 0.6rem;
  border-radius: 0.6rem;
  font-size: 1rem;
  box-shadow: $button-shadow;
  line-height: 1;
  transition: 0.3s ease-in-out;
  cursor: pointer;

  @include breakpoint('large') {
    height: $nav-button-medium;
    padding: 0.5rem 0.8rem;
  }

  &.m-active,
  &:hover {
    box-shadow: 0px 2px 10px rgba(84, 84, 84, 0);
  }

  &.m-active {
    background-color: $gray;
  }

  &:hover {
    background-color: $lighter-gray;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fast-fade-enter-active,
.fast-fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fast-fade-enter,
.fast-fade-leave-to {
  opacity: 0;
}
</style>
