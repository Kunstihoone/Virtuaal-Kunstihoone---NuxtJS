<template>
  <div class="audio-guide">
    <button
      @click="$store.commit('SetAudiGuideState', !audioGuideState)"
      :class="{ 'm-active': audioGuideState }"
      class="toggle-audio-guide button"
    >
      {{ $t('audio_guide') }}
      <svg-icon :name="audioGuideState ? 'icon-audio' : 'icon-no-audio'" />
    </button>
    <transition @enter="playerEnter" @leave="playerLeave" :css="false">
      <audio-player
        v-if="audioGuideState && activeTrack"
        :key="activeTrack.ID"
        :active-track="activeTrack"
        :audio-guide-title="audioGuideTitle"
      />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import anime from 'animejs'
import AudioPlayer from '~/components/AudioPlayer'

export default {
  components: {
    AudioPlayer
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
        height: [0, '4.6rem'],
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
          height: 0,
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
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 120;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.toggle-audio-guide {
  svg {
    width: 0.82rem;
    height: 0.82rem;
    margin-left: 0.4rem;
    opacity: 0.3;
    transition: 0.3s ease;
  }

  &.m-active {
    svg {
      opacity: 1;
    }
  }
}
</style>
