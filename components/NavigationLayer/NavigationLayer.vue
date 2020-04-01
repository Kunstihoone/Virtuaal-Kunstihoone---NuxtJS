<template>
  <div class="navigation-layer">
    <nav-settings class="navigation-layer__bottom-layer" />

    <nav-info
      v-if="getRouteBaseName() !== 'index'"
      class="navigation-layer__bottom-layer"
    />

    <nav-label v-if="detailsImage" :details-image="detailsImage" />

    <audio-guide
      v-if="getRouteBaseName() !== 'index' && $i18n.locale !== 'evk'"
      :current-room="currentRoom"
      class="navigation-layer__bottom-layer"
    />

    <video-guide
      v-else-if="getRouteBaseName() !== 'index' && $i18n.locale === 'evk'"
      :current-room="currentRoom"
      class="navigation-layer__bottom-layer"
    />
  </div>
</template>

<script>
import AudioGuide from '~/components/AudioGuide'
import NavInfo from '~/components/NavigationLayer/NavInfo'
import NavLabel from '~/components/NavigationLayer/NavLabel'
import NavSettings from '~/components/NavigationLayer/NavSettings'
import VideoGuide from '~/components/VideoGuide'

export default {
  components: {
    AudioGuide,
    NavInfo,
    NavLabel,
    NavSettings,
    VideoGuide
  },
  props: {
    currentRoom: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      detailsImage: null
    }
  },
  watch: {
    $route() {
      this.changeDetailsImage()
    }
  },
  mounted() {
    this.changeDetailsImage()
  },
  methods: {
    changeDetailsImage() {
      if (this.$route.params.parent || this.$route.params.child) {
        if (
          this.currentRoom &&
          this.currentRoom.acf &&
          this.currentRoom.acf.label
        ) {
          this.detailsImage = this.currentRoom.acf.label
        } else {
          this.detailsImage = null
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navigation-layer__bottom-layer {
  opacity: 1;
  transition: 0.3s ease;

  .modal-active & {
    opacity: 0;
  }
}
</style>
