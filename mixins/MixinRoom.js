import anime from 'animejs'
import Player from '@vimeo/player'

export default {
  data() {
    return {
      videoPaused: false,
      playerLoaded: false
    }
  },
  transition: {
    leave(el, done) {
      anime({
        targets: '.ratio-container',
        opacity: 0,
        easing: 'easeOutExpo',
        duration: 600,

        complete(anim) {
          done()
        }
      })
    }
  },
  created() {
    if (this.data.acf.audio_guide_est) {
      const locale = this.$i18n.locale

      let audioGuideTrack, audioGuideTitle

      if (locale === 'en') {
        audioGuideTrack = this.data.acf.audio_guide_eng
        audioGuideTitle = this.data.acf.audio_guide_title_eng
      } else if (locale === 'ru') {
        audioGuideTrack = this.data.acf.audio_guide_rus
        audioGuideTitle = this.data.acf.audio_guide_title_rus
      } else {
        audioGuideTrack = this.data.acf.audio_guide_est
        audioGuideTitle = this.data.acf.audio_guide_title_est
      }

      this.$store.commit('SetAudioGuideTrack', audioGuideTrack)
      this.$store.commit('SetAudioGuideTitle', audioGuideTitle)
    } else {
      this.$store.commit('SetAudioGuideTrack', null)
    }
  },
  mounted() {
    if (this.data.acf.video) {
      const videoOptions = {
        url: this.data.acf.video,
        width: 1920,
        controls: false,
        autoplay: true,
        quality: '1080p',
        loop: true
        // background: true,
        // playsinline: true,
      }

      this.player = new Player('video-wrapper', videoOptions)

      document.addEventListener('keydown', this.addKeyEvent)

      this.player.on('loaded', () => {
        this.playerLoaded = true

        const tl = anime.timeline({
          easing: 'easeOutExpo',
          duration: 800
        })

        tl.add({
          targets: ['.room-video'],
          opacity: [0, 1],
          easing: 'easeInOutQuad'
        })

        tl.add({
          targets: ['.navigation-button'],
          opacity: [0, 1],
          delay: anime.stagger(100),
          easing: 'easeInOutQuad'
        })
      })
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
