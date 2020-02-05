import Player from '@vimeo/player'

export default {
  data() {
    return {
      videoPaused: false
    }
  },
  mounted() {
    if (this.data.acf.video) {
      const videoOptions = {
        url: this.data.acf.video,
        width: 1920,
        controls: false,
        background: true,
        playsinline: true,
        quality: '1080p'
      }

      this.player = new Player('video-wrapper', videoOptions)

      document.addEventListener('keydown', this.addKeyEvent)
    }
  },
  beforeDestroy() {
    if (this.data.acf.video) {
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
