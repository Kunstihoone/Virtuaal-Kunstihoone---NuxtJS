<template>
  <nav :class="{ 'm-menu-active': toggleMenu }" class="nav-settings">
    <div class="nav-settings__buttons">
      <toggle-settings
        @click.native="toggleMenu = !toggleMenu"
        :toggle-state="toggleMenu"
        class="nav-settings__button"
      />

      <transition name="fade">
        <menu-button
          v-if="getRouteBaseName() !== 'index'"
          :link-path="localePath('index')"
          icon="icon-home"
          component-element="nuxt-link"
          class="nav-settings__button"
        />
      </transition>
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
      <div class="nav-settings__utility">
        <menu-button
          @click.native="toggleFullscreen"
          :class="{ 'm-active': fullscreen }"
          icon="icon-fullscreen"
          class="nav-settings__button"
        >
          <tool-tip class="toggle-audio-guide__tooltip">
            {{ $t('full_screen') }}
          </tool-tip>
        </menu-button>

        <menu-button
          @click.native="handleMute"
          :class="{ 'm-active': muted }"
          icon="icon-mute"
          class="nav-settings__button"
        >
          <tool-tip class="toggle-audio-guide__tooltip">
            {{ $t('mute') }}
          </tool-tip>
        </menu-button>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import ToggleSettings from '~/components/ToggleSettings'
import LanguageSwitcher from '~/components/LanguageSwitcher'
import MenuButton from '~/components/MenuButton'
import ToolTip from '~/components/ToolTip'

export default {
  components: {
    ToggleSettings,
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
    }
  },
  mounted() {
    document.addEventListener('fullscreenchange', this.handleFullScreen)
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

.nav-settings__buttons {
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

.nav-settings__menu-item {
  pointer-events: none;
  margin-bottom: $menu-items-spacing;
}

.nav-settings__menu-item,
.nav-settings__utility {
  opacity: 0;
  transition: 0.2s ease;
  transform: translateY(-0.6rem);

  @for $i from 1 through 6 {
    &:nth-child(#{$i}) {
      transition-delay: #{-0.1 + (0.1 * $i)}s;
    }
  }

  .m-menu-active & {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }
}

.nav-settings__utility {
  display: flex;
}
</style>
