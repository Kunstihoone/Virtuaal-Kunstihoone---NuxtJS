<template>
  <div v-if="activeTrack" class="audio-player">
    <div class="audio-player__inner">
      <audio
        ref="player"
        :src="activeTrack.url"
        crossorigin="anonymous"
        class="audio-player__player"
        autoplay
        controls
      />

      <button @click="playPauseClick" class="audio-player__control">
        <svg-icon v-if="!playerState" name="icon-play" />
        <svg-icon v-else name="icon-pause" />
      </button>

      <h4 class="audio-player__title">
        Sõna mõjutus kolofoon - audiogiid
      </h4>

      <div
        :style="{ width: playerTrackProgress + '%' }"
        class="audio-player__progress"
      />
    </div>
  </div>
</template>

<script>
// import anime from 'animejs'

export default {
  props: {
    activeTrack: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      trackDuration: 0,
      playerTrackProgress: 0,
      playerState: false
    }
  },
  computed: {
    // playerState() {
    //   return this.$refs.player.paused
    // }
  },
  mounted() {
    this.$refs.player.onloadeddata = () => {
      this.trackDuration = this.$refs.player.duration
      this.progressCounter = setInterval(() => {
        this.playerCurrentProgress()
      }, 33)
    }

    this.$refs.player.onplay = () => {
      this.playerState = true
    }

    this.$refs.player.onpause = () => {
      this.playerState = false
    }

    this.$refs.player.onended = () => {
      this.playerState = false
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
    playPauseClick() {
      if (this.playerState) {
        this.$refs.player.pause()
      } else {
        this.$refs.player.play()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.audio-player__inner {
  position: relative;
  background-color: white;
  color: $black;
  padding: 0.4rem 0.8rem;
  border-radius: 0.8rem;
  z-index: 40;
  transform-origin: bottom right;
  display: flex;
  align-items: center;
  overflow: hidden;
  box-shadow: $button-shadow;
  margin-top: 0.6rem;
  height: 4rem;
}

.audio-player__player {
  display: none;
}

.audio-player__progress {
  position: absolute;
  width: 0%;
  height: 100%;
  left: 0;
  background-color: $gray;
  transition: width 0.3s ease;
  z-index: -1;
}

.audio-player__control {
  margin-right: 1rem;
  width: 1.2rem;
  height: 1.2rem;
  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
