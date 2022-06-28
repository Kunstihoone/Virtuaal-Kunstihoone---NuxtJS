<template>
  <div class="room-wrapper">
    <video-player
      v-if="userReady"
      :video-src="data.video"
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
    if (
      this.data.featuredImage.data?.attributes.file.data?.attributes.formats
        .large
    ) {
      this.$store.commit(
        'SetPlaceholderImage',
        this.data.featuredImage.data.attributes.file.data.attributes.formats
          .large.url,
      )
      this.$store.commit('SetPlaceholderVisible', true)
    }
  },
  methods: {
    onPlayerLoaded() {
      this.playerLoaded = true

      if (this.data.buttons) {
        this.$store.commit('SetNavigationButtons', this.data.buttons)
      }
    },
  },
}
</script>
