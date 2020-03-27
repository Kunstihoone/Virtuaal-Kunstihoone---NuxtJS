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
          this.$emit('playerLoaded')

          anime({
            targets: '.placeholder-image',
            opacity: 0,
            easing: 'easeOutExpo',
            // delay: 600,
            duration: 500,
            complete: (anim) => {
              this.$store.commit('SetPlaceholderImage', null)
            }
          })

          anime({
            targets: '.navigation-button',
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 500
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
