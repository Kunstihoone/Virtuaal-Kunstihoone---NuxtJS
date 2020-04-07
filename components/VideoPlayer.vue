<template>
  <div id="video-wrapper" class="room-video" />
</template>

<script>
import anime from 'animejs'
import Player from '@vimeo/player'

export default {
  props: {
    videoSrc: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      videoStarted: false
    }
  },
  watch: {
    '$store.state.mutedRoomAudio'() {
      this.videoSetMuted(this.$store.state.mutedRoomAudio)
    }
  },
  mounted() {
    if (this.videoSrc) {
      const videoOptions = {
        url: this.videoSrc,
        background: true,
        playsinline: true
      }

      this.player = new Player('video-wrapper', videoOptions)

      document.addEventListener('keydown', this.addKeyEvent)

      this.player.on('eventName', (data) => {
        // Mute video, if mute toggle from settings
        this.videoSetMuted(this.$store.state.mutedRoomAudio)
      })

      this.player.on('timeupdate', () => {
        if (!this.videoStarted) {
          this.videoStarted = true

          anime({
            targets: '.placeholder-image',
            opacity: 0,
            easing: 'easeOutExpo',
            duration: 300,
            complete: (anim) => {
              this.$emit('playerLoaded')
              this.$store.commit('SetPlaceholderVisible', false)
              this.$store.commit('SetPlaceholderImage', null)
            }
          })
        }
      })
    }
  },
  beforeDestroy() {
    if (this.videoSrc) {
      document.removeEventListener('keydown', this.addKeyEvent)
    }
  },
  methods: {
    handleVideoState() {
      if (this.videoPaused) {
        this.player.play()
        this.videoPaused = false
      } else {
        this.player.pause()
        this.videoPaused = true
      }
    },
    addKeyEvent(event) {
      if (event.keyCode === 32) this.handleVideoState() // space
    },
    videoSetMuted(state) {
      this.player
        .setMuted(state)
        .then(function(muted) {})
        .catch(function(error) {
          // eslint-disable-next-line
          console.log('error on muted', error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.room-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: 1;

  /deep/ iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
