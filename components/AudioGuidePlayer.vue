<template>
  <div v-if="activeTrack" class="audio-guide-player">
    <div class="audio-guide-player__inner">
      <audio
        ref="player"
        :src="activeTrack.url"
        crossorigin="anonymous"
        class="audio-guide-player__player"
        autoplay
        controls
      />

      <button
        class="audio-guide-player__control"
        @click="$store.commit('SetAudioPlayerState', !playerState)"
      >
        <svg-icon v-if="!playerState" name="icon-play" />
        <svg-icon v-else name="icon-pause" />
      </button>

      <h4 class="audio-guide-player__title">
        {{ audioGuideTitle }}
      </h4>

      <div
        :style="{ width: playerTrackProgress + '%' }"
        class="audio-guide-player__progress"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    activeTrack: {
      type: Object,
      default: null,
    },
    audioGuideTitle: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      trackDuration: 0,
      playerTrackProgress: 0,
    }
  },
  computed: {
    ...mapState({
      playerState: (state) => state.audioPlayerState,
    }),
  },
  watch: {
    playerState() {
      if (this.playerState) {
        this.$refs.player.play()
      } else {
        this.$refs.player.pause()
      }
    },
  },
  mounted() {
    this.$refs.player.onloadeddata = () => {
      this.trackDuration = this.$refs.player.duration
      this.progressCounter = setInterval(() => {
        this.playerCurrentProgress()
      }, 33)
    }

    this.$refs.player.onplay = () => {
      this.$store.commit('SetAudioPlayerState', true)
    }

    this.$refs.player.onpause = () => {
      this.$store.commit('SetAudioPlayerState', false)
    }

    this.$refs.player.onended = () => {
      this.$store.commit('SetAudioPlayerState', false)
    }
  },
  beforeDestroy() {
    clearInterval(this.progressCounter)
  },
  methods: {
    playerCurrentProgress() {
      this.playerTrackProgress =
        (this.$refs.player.currentTime / this.trackDuration) * 100
    },
  },
}
</script>

<style lang="scss" scoped>
.audio-guide-player__inner {
  position: relative;
  background-color: white;
  color: $black;
  padding: 0.4rem 0.8rem;
  border-radius: $layers-border-radius;
  z-index: 15;
  transform-origin: bottom right;
  display: flex;
  align-items: center;
  overflow: hidden;
  box-shadow: $button-shadow;
  height: 2rem;
  width: 100%;
}

.audio-guide-player__title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.audio-guide-player__player {
  display: none;
}

.audio-guide-player__progress {
  position: absolute;
  width: 0%;
  height: 100%;
  left: 0;
  background-color: $gray;
  z-index: -1;
}

.audio-guide-player__control {
  margin-right: 1rem;
  width: 1.2rem;
  height: 1.2rem;
  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
