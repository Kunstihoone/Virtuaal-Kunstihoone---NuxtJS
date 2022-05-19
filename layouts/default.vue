<template>
  <main class="main">
    <ratio-container
      :style="{ width: containerWidth }"
      :class="[
        containerOrientation === 'landscape' ? 'm-landscape' : 'm-portrait',
        detailsLayer ? 'm-modal-active' : '',
        isMobileDevide ? 'm-mobile-device' : '',
      ]"
    >
      <transition name="fade">
        <splash-layer v-if="getRouteBaseName() !== 'index' && splashState" />
      </transition>

      <navigation-layer :current-room="currentRoom" />

      <nuxt />

      <placeholder-image
        v-if="placeholderImage"
        :placeholder-image="placeholderImage"
      />

      <transition name="fast-fade">
        <room-navigation
          v-if="currentRoom && getRouteBaseName() !== 'index'"
          :current-room="currentRoom"
        />
      </transition>

      <loading-indicatior v-if="placeholderVisible" />

      <details-layer v-if="detailsLayer" :details-layer="detailsLayer" />
    </ratio-container>

    <feedback-button />

    <background-audio
      v-if="!splashState && backgroundAudio"
      :key="backgroundAudio.url"
      :audio-data="backgroundAudio"
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
import FeedbackButton from '~/components/FeedbackButton'

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
    PortraitNotification,
    FeedbackButton,
  },
  data() {
    return {
      isWindowPortrait: false,
      containerOrientation: 'landscape',
      containerWidth: '100%',
      isMobileDevide: false,
    }
  },
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
    }
  },
  computed: {
    ...mapState({
      splashState: (state) => state.splashState,
      placeholderImage: (state) => state.placeholderImage,
      placeholderVisible: (state) => state.placeholderVisible,
      detailsLayer: (state) => state.detailsLayer,
      navigationButtons: (state) => state.navigationButtons,
      currentRoom: (state) => state.roomsData,
    }),
    backgroundAudio() {
      return this.currentRoom && this.currentRoom.acf.audio_track
        ? this.currentRoom.acf.audio_track
        : null
    },
  },
  watch: {
    $route() {
      this.$store.commit('SetNavigationButtons', null)
      this.$store.commit('SetDetailsLayer', null)

      if (this.getRouteBaseName() === 'index') {
        this.$store.commit('SetPlaceholderImage', null)
        this.$store.commit('SetPlaceholderVisible', false)
      }
    },
  },
  mounted() {
    if (this.$i18n.locale === 'evk') {
      this.$store.commit('SetAudiGuideState', true)
    } else {
      this.$store.commit('SetAudiGuideState', false)
    }

    window.onpopstate = (event) => {
      this.$store.commit('SetPlaceholderImage', null)
    }

    this.handleResize()
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('orientationchange', this.handleOrientation)

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      this.isMobileDevide = true
      this.$store.commit('SetMutedRoomAudio', true)
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('orientationchange', this.handleOrientation)
  },
  methods: {
    handleOrientation() {
      setTimeout(() => {
        this.handleResize()
      }, 300)
    },
    handleResize() {
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      const ratio = windowHeight / windowWidth

      this.isWindowPortrait = windowHeight > windowWidth

      if (ratio * 100 < 56.25) {
        this.containerOrientation = 'portrait'
        this.containerWidth = `${(16 / 9) * windowHeight}px`
      } else {
        this.containerOrientation = 'landscape'
        this.containerWidth = '100%'
      }
    },
    playerEnter(el, done) {
      anime({
        targets: el,
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 800,
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
        },
      })
    },
  },
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

b,
strong {
  font-weight: bold;
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

.button {
  display: inline-block;
  height: $nav-button-small;
  background-color: white;
  color: $black;
  padding: 0.3rem 0.6rem;
  border-radius: $layers-border-radius;
  font-size: 1rem;
  box-shadow: $button-shadow;
  line-height: 1;
  transition: $transition-ease-in-out;
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
  transition: opacity $transition-ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fast-fade-enter-active,
.fast-fade-leave-active {
  transition: opacity $transition-ease-in-out;
}

.fast-fade-enter,
.fast-fade-leave-to {
  opacity: 0;
}
</style>
