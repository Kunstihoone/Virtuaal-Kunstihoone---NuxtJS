<template>
  <div class="video-guide">
    <transition name="fade">
      <small-video-player
        v-if="
          !placeholderVisible &&
            audioGuideState &&
            currentRoom.acf.hand_sign_translation
        "
        :key="currentRoom.acf.hand_sign_translation"
        :video-src="currentRoom.acf.hand_sign_translation"
      />
    </transition>

    <menu-button
      @click.native="$store.commit('SetAudiGuideState', !audioGuideState)"
      :class="{ 'm-active': audioGuideState }"
      :icon="audioGuideState ? 'icon-hand-sign-off' : 'icon-hand-sign'"
      class="toggle-audio-guide"
    >
      <tool-tip class="toggle-audio-guide__tooltip">
        {{ $t('sign_language') }}
      </tool-tip>
    </menu-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import anime from 'animejs'
import SmallVideoPlayer from '~/components/SmallVideoPlayer'
import MenuButton from '~/components/MenuButton'
import ToolTip from '~/components/ToolTip'

export default {
  components: {
    SmallVideoPlayer,
    MenuButton,
    ToolTip
  },
  props: {
    currentRoom: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapState({
      audioGuideState: (state) => state.audioGuideState,
      placeholderVisible: (state) => state.placeholderVisible
    }),
    audioGuideTitle() {
      if (this.currentRoom.acf.audio_guide_title_est) {
        const locale = this.$i18n.locale
        if (locale === 'en') {
          return this.currentRoom.acf.audio_guide_title_eng
        } else if (locale === 'ru') {
          return this.currentRoom.acf.audio_guide_title_rus
        } else {
          return this.currentRoom.acf.audio_guide_title_est
        }
      } else {
        return null
      }
    }
  },
  methods: {
    playerEnter(el, done) {
      const tl = anime.timeline({
        easing: 'easeOutExpo',
        duration: 400,
        complete() {
          done()
        }
      })

      tl.add({
        targets: el,
        width: [0, '15rem'],
        opacity: [0, 1],
        easing: 'easeInOutQuad'
      })

      tl.add({
        targets: '.audio-player__title',
        opacity: [0, 1],
        easing: 'easeInOutQuad'
      })
    },
    playerLeave(el, done) {
      const tl = anime.timeline({
        easing: 'easeOutExpo',
        duration: 400,
        complete() {
          done()
        }
      })

      tl.add({
        targets: '.audio-player__title',
        opacity: [1, 0],
        easing: 'easeInOutQuad'
      })

      tl.add(
        {
          targets: el,
          width: 0,
          opacity: 0,
          easing: 'easeInOutQuad'
        },
        '-=200'
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.video-guide {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  z-index: 15;
  display: flex;
}

.toggle-audio-guide {
  margin-left: $menu-items-spacing-small;

  @include breakpoint('large') {
    margin-left: $menu-items-spacing-medium;
  }

  svg {
    opacity: 0.3;
    transition: opacity $transition-ease-in-out;
  }

  &.m-active {
    svg {
      opacity: 1;
    }
  }

  &:hover {
    .toggle-audio-guide__tooltip {
      transform: translateY(-0.4rem);
      opacity: 1;
    }
  }
}

.toggle-audio-guide__tooltip {
  right: 0%;
  bottom: 100%;
}
</style>
