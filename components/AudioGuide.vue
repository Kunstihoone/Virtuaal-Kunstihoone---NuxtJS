<template>
  <div class="audio-guide">
    <transition @enter="playerEnter" @leave="playerLeave" :css="false">
      <audio-player
        v-if="audioGuideState && activeTrack"
        :key="activeTrack.ID"
        :active-track="activeTrack"
        :audio-guide-title="audioGuideTitle"
      />
    </transition>
    <button
      @click="$store.commit('SetAudiGuideState', !audioGuideState)"
      :class="{ 'm-active': audioGuideState }"
      class="toggle-audio-guide button"
    >
      <tool-tip class="toggle-audio-guide__tooltip">{{
        $t('audio_guide')
      }}</tool-tip>
      <svg-icon :name="audioGuideState ? 'icon-audio' : 'icon-no-audio'" />
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import anime from 'animejs'
import AudioPlayer from '~/components/AudioPlayer'
import ToolTip from '~/components/ToolTip'

export default {
  components: {
    AudioPlayer,
    ToolTip
  },
  computed: {
    ...mapState({
      activeTrack: (state) => state.audioGuideTrack,
      audioGuideTitle: (state) => state.audioGuideTitle,
      audioGuideState: (state) => state.audioGuideState
    })
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
.audio-guide {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  z-index: 120;
  display: flex;
}

.toggle-audio-guide {
  width: 2rem;
  height: 2rem;
  padding: 0.4rem;
  border-radius: 50%;
  margin-left: 0.4rem;

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
      // transform: translate(-50%, -0.4rem);
      transform: translateY(-0.4rem);

      opacity: 1;
    }
  }
}

.toggle-audio-guide__tooltip {
  position: absolute;
  right: 0%;
  bottom: 100%;
  transform: translateY(-0.2rem);
  opacity: 0;
  pointer-events: none;
  transition: 0.2s ease;
}
</style>
