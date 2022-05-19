<template>
  <nav :class="{ 'm-menu-active': toggleMenu }" class="nav-settings">
    <div class="nav-settings__top-nav">
      <menu-button
        :icon="toggleMenu ? 'icon-close' : 'icon-languages'"
        :class="{ 'm-active': toggleMenu }"
        button-event="Toggle languages"
        class="nav-settings__toggle"
        @click.native="toggleMenu = !toggleMenu"
      >
        <tool-tip>
          {{ $t('languages') }}
        </tool-tip>
      </menu-button>

      <div class="nav-settings__menu-items">
        <nuxt-link
          v-for="locale in $i18n.locales"
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
          :class="{ 'm-active': locale.code === $i18n.locale }"
          :tabindex="tabindex"
          class="nav-settings__menu-item button"
        >
          {{ locale.full_name }}
        </nuxt-link>
      </div>

      <menu-button
        :link-path="localePath('index')"
        icon="icon-home"
        component-element="nuxt-link"
        button-event="Home page"
        class="nav-settings__button"
      >
        <tool-tip>
          {{ $t('frontpage') }}
        </tool-tip>
      </menu-button>

      <menu-button
        :class="{ 'm-active': fullscreen }"
        icon="icon-fullscreen"
        button-event="Toggle fullscreen"
        class="nav-settings__button"
        @click.native="toggleFullscreen"
      >
        <tool-tip>
          {{ $t('full_screen') }}
        </tool-tip>
      </menu-button>

      <menu-button
        :class="{ 'm-active': mutedRoomAudio }"
        :icon="mutedRoomAudio ? 'icon-muted' : 'icon-mute'"
        button-event="Toggle mute"
        class="nav-settings__button nav-settings__mute"
        @click.native="handleMute"
      >
        <tool-tip>
          {{ $t('mute_bg') }}
        </tool-tip>
      </menu-button>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import MenuButton from '~/components/MenuButton'
import ToolTip from '~/components/ToolTip'

export default {
  components: {
    MenuButton,
    ToolTip,
  },
  data() {
    return {
      toggleMenu: false,
    }
  },
  computed: {
    ...mapState({
      fullscreen: (state) => state.fullscreen,
      mutedRoomAudio: (state) => state.mutedRoomAudio,
    }),
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
    tabindex() {
      return this.toggleMenu ? '0' : '-1'
    },
  },
  watch: {
    $route() {
      this.toggleMenu = this.getRouteBaseName(this.$route) === 'index'
    },
  },
  mounted() {
    document.addEventListener('fullscreenchange', this.handleFullScreen)
    this.toggleMenu = this.getRouteBaseName(this.$route) === 'index'
  },
  beforeDestroy() {
    document.removeEventListener('fullscreenchange', this.handleFullScreen)
  },
  methods: {
    handleFullScreen() {
      this.$store.commit('SetFullscreen', document.fullscreenElement)
    },
    handleMute() {
      this.$store.commit('SetMutedRoomAudio', !this.mutedRoomAudio)
    },
    toggleFullscreen() {
      if (this.fullscreen) {
        this.closeFullscreen()
      } else {
        this.openFullscreen()
      }
    },
    openFullscreen() {
      const elem = document.documentElement
      if (elem.requestFullscreen) {
        elem.requestFullscreen()
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen()
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen()
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen()
      }
    },

    /* Close fullscreen */
    closeFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        /* IE/Edge */
        document.msExitFullscreen()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.nav-settings {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  z-index: 10;
}

.nav-settings__top-nav {
  margin-bottom: $menu-items-spacing-small;
  display: flex;

  @include breakpoint('large') {
    margin-bottom: $menu-items-spacing-medium;
  }
}

.nav-settings__toggle,
.nav-settings__button {
  &:not(:last-child) {
    margin-right: $menu-items-spacing-small;

    @include breakpoint('large') {
      margin-right: $menu-items-spacing-medium;
    }
  }
}

.nav-settings__menu-items {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 2.5rem;
  left: 0;
  width: rem-calc(128);
  pointer-events: none;

  @include breakpoint('large') {
    width: 100%;
  }
}

.nav-settings__button {
  position: relative;
  z-index: 12;

  ::v-deep .tooltip {
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(0.2rem);
  }

  &:hover {
    ::v-deep .tooltip {
      transform: translateX(-50%) translateY(0.4rem);
      opacity: 1;
    }
  }
}

.nav-settings__toggle {
  ::v-deep .tooltip {
    top: 100%;
    left: 0;
    transform: translateY(0.2rem);
  }

  &:hover {
    ::v-deep .tooltip {
      transform: translateY(0.4rem);
      opacity: 1;
    }
  }
}

.nav-settings__menu-item {
  margin-bottom: $menu-items-spacing-small;
  transform: translateY(-0.6rem);
  z-index: 10;
  opacity: 0;
  transition: $transition-ease-in-out;
  pointer-events: none;

  .m-menu-active & {
    opacity: 1;
    pointer-events: auto;
  }

  @for $i from 1 through 6 {
    &:nth-child(#{$i}) {
      transition: background-color $transition-ease-in-out,
        0.3s opacity ease-in-out #{-0.1 + (0.1 * $i)}s,
        0.3s transform ease-in-out #{-0.1 + (0.1 * $i)}s;
    }
  }

  @include breakpoint('large') {
    margin-bottom: $menu-items-spacing-medium;
  }

  .m-menu-active & {
    transform: translateY(0);
  }
}

.nav-settings__mute {
  @include breakpoint('large', max) {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(0);
  }
}

.nav-settings__mute {
  .m-mobile-device & {
    display: none;
  }
}
</style>
