<template>
  <div class="room-wrapper">
    <video-player
      v-if="userReady"
      :video-src="data.acf.video"
      @playerLoaded="onPlayerLoaded"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VideoPlayer from '~/components/VideoPlayer'

export default {
  components: {
    VideoPlayer,
  },
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      videoPaused: false,
      playerLoaded: false,
      showImage: true,
    }
  },
  computed: {
    ...mapState({
      audioGuideState: (state) => state.audioGuideState,
      userReady: (state) => state.userReady,
    }),
  },
  mounted() {
    if (this.data.featured_image && this.data.featured_image.sizes.medium) {
      this.$store.commit(
        'SetPlaceholderImage',
        this.data.featured_image.sizes.large,
      )
      this.$store.commit('SetPlaceholderVisible', true)
    }
  },
  methods: {
    onPlayerLoaded() {
      this.playerLoaded = true

      if (this.data.acf.buttons) {
        this.$store.commit('SetNavigationButtons', this.data.acf.buttons)
      }
    },
  },
}
</script>
