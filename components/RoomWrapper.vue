<template>
  <div class="room-wrapper">
    <video-player
      v-if="userReady"
      :video-src="data.acf.video"
      @playerLoaded="playerLoaded = true"
    />

    <template v-if="data && data.acf">
      <navigation-button
        v-for="(button, index) in data.acf.buttons"
        :key="index"
        :button-data="button"
      />
    </template>

    <piece-audio
      v-if="data.acf.audio_track && playerLoaded && !audioGuideState"
      :audio-data="data.acf.audio_track"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NavigationButton from '~/components/NavigationButton'
import PieceAudio from '~/components/PieceAudio'
import VideoPlayer from '~/components/VideoPlayer'

export default {
  components: {
    NavigationButton,
    PieceAudio,
    VideoPlayer
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      videoPaused: false,
      playerLoaded: false,
      showImage: true
    }
  },
  computed: {
    ...mapState({
      audioGuideState: (state) => state.audioGuideState,
      userReady: (state) => state.userReady
    })
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
    if (this.data.featured_image && this.data.featured_image.sizes.medium) {
      this.$store.commit(
        'SetPlaceholderImage',
        this.data.featured_image.sizes.medium
      )
    }
  }
}
</script>
