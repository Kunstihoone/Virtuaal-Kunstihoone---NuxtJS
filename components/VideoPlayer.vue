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
  mounted() {
    if (this.videoSrc) {
      const videoOptions = {
        url: this.videoSrc,
        width: 1920,
        controls: false,
        autoplay: true,
        quality: '1080p',
        loop: true
      }

      this.player = new Player('video-wrapper', videoOptions)

      document.addEventListener('keydown', this.addKeyEvent)

      this.player.on('timeupdate', () => {
        if (!this.videoStarted) {
          this.videoStarted = true

          anime({
            targets: '.placeholder-image',
            opacity: 0,
            easing: 'easeOutExpo',
            duration: 500,
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
