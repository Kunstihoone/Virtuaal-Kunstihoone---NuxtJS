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
        :audio-guide-title="audioGuideTitle"
      />
    </transition>

    <button
      @click="$store.commit('SetAudiGuideState', !audioGuideState)"
      :class="{ 'm-active': audioGuideState }"
      class="toggle-audio-guide button"
    >
      <tool-tip class="toggle-audio-guide__tooltip">
        {{ $t('video_guide') }}
      </tool-tip>
      <svg-icon :name="audioGuideState ? 'icon-close' : 'icon-video'" />
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import anime from 'animejs'
import SmallVideoPlayer from '~/components/SmallVideoPlayer'
import ToolTip from '~/components/ToolTip'

export default {
  components: {
    SmallVideoPlayer,
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
  width: 2rem;
  height: 2rem;
  padding: 0.4rem;
  border-radius: 50%;
  margin-left: $menu-items-spacing;

  svg {
    width: 100%;
    height: 100%;
    opacity: 0.3;
    transition: 0.3s ease;
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
