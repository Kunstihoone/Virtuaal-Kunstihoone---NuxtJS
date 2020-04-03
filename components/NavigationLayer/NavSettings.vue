<template>
  <nav :class="{ 'm-menu-active': toggleMenu }" class="nav-settings">
    <div class="nav-settings__top-nav">
      <menu-button
        @click.native="toggleMenu = !toggleMenu"
        :icon="toggleMenu ? 'icon-close' : 'icon-settings'"
        class="nav-settings__button"
      >
        <tool-tip>
          {{ $t('menu') }}
        </tool-tip>
      </menu-button>

      <div class="nav-settings__utility">
        <menu-button
          :link-path="localePath('index')"
          icon="icon-home"
          component-element="nuxt-link"
          class="nav-settings__button"
        >
          <tool-tip>
            {{ $t('frontpage') }}
          </tool-tip>
        </menu-button>

        <menu-button
          @click.native="toggleFullscreen"
          :class="{ 'm-active': fullscreen }"
          icon="icon-fullscreen"
          class="nav-settings__utility-button"
        >
          <tool-tip>
            {{ $t('full_screen') }}
          </tool-tip>
        </menu-button>

        <menu-button
          @click.native="handleMute"
          :class="{ 'm-active': muted }"
          icon="icon-mute"
          class="nav-settings__utility-button"
        >
          <tool-tip>
            {{ $t('mute_bg') }}
          </tool-tip>
        </menu-button>
      </div>
    </div>

    <div class="nav-settings__menu-items">
      <nuxt-link
        v-for="locale in $i18n.locales"
        :key="locale.code"
        :to="switchLocalePath(locale.code)"
        :class="{ 'm-active': locale.code === $i18n.locale }"
        class="nav-settings__menu-item button"
      >
        {{ locale.full_name }}
      </nuxt-link>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import LanguageSwitcher from '~/components/LanguageSwitcher'
import MenuButton from '~/components/MenuButton'
import ToolTip from '~/components/ToolTip'

export default {
  components: {
    LanguageSwitcher,
    MenuButton,
    ToolTip
  },
  data() {
    return {
      toggleMenu: false
    }
  },
  computed: {
    ...mapState({
      fullscreen: (state) => state.fullscreen,
      muted: (state) => state.muted
    }),
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    }
  },
  watch: {
    $route() {
      this.toggleMenu = false

      if (this.getRouteBaseName() === 'index') {
        this.toggleMenu = true
      } else {
        this.toggleMenu = false
      }
    }
  },
  mounted() {
    document.addEventListener('fullscreenchange', this.handleFullScreen)

    if (this.getRouteBaseName() === 'index') {
      this.toggleMenu = true
    }
  },
  beforeDestroy() {
    document.removeEventListener('fullscreenchange', this.handleFullScreen)
  },
  methods: {
    handleFullScreen() {
      this.$store.commit('SetFullscreen', document.fullscreenElement)
    },
    handleMute() {
      this.$store.commit('SetMute', !this.muted)
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
    }
  }
}
</script>

<style lang="scss" scoped>
$menu-items-spacing: 0.5rem;

.nav-settings {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  z-index: 10;
}

.nav-settings__top-nav {
  margin-bottom: $menu-items-spacing;
  display: flex;
}

.nav-settings__button {
  margin-right: $menu-items-spacing;
}

.nav-settings__menu-items {
  display: flex;
  flex-direction: column;
}

.nav-settings__utility-button,
.nav-settings__button {
  position: relative;
  z-index: 12;

  /deep/ .tooltip {
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(0.2rem);
  }

  &:hover {
    /deep/ .tooltip {
      transform: translateX(-50%) translateY(0.4rem);
      opacity: 1;
    }
  }
}

.nav-settings__utility-button,
.nav-settings__menu-item {
  opacity: 0;
  transition: 0.2s ease;
  pointer-events: none;

  .m-menu-active & {
    opacity: 1;
    pointer-events: auto;
  }

  @for $i from 1 through 6 {
    &:nth-child(#{$i}) {
      transition: background-color 0.3s ease-in-out,
        0.3s opacity ease-in-out #{-0.1 + (0.1 * $i)}s,
        0.3s transform ease-in-out #{-0.1 + (0.1 * $i)}s;
    }
  }
}

.nav-settings__menu-item {
  margin-bottom: $menu-items-spacing;
  transform: translateY(-0.6rem);
  z-index: 10;

  .m-menu-active & {
    transform: translateY(0);
  }
}

.nav-settings__utility {
  display: flex;
}

.nav-settings__utility-button {
  transform: translateX(-0.6rem);

  &:not(:last-child) {
    margin-right: $menu-items-spacing;
  }

  .m-menu-active & {
    transform: translateX(0);
  }
}
</style>
