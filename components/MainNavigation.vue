<template>
  <nav class="main-navigation">
    <corner-info />

    <language-switcher />

    <toggle-label v-if="detailsImage" :details-image="detailsImage" />

    <audio-guide
      v-if="getRouteBaseName() !== 'index' && $i18n.locale !== 'evk'"
      :current-room="currentRoom"
    />

    <video-guide
      v-else-if="getRouteBaseName() !== 'index' && $i18n.locale === 'evk'"
      :current-room="currentRoom"
    />
  </nav>
</template>

<script>
import AudioGuide from '~/components/AudioGuide'
import CornerInfo from '~/components/CornerInfo'
import ToggleLabel from '~/components/ToggleLabel'
import LanguageSwitcher from '~/components/LanguageSwitcher'
import VideoGuide from '~/components/VideoGuide'

export default {
  components: {
    AudioGuide,
    CornerInfo,
    ToggleLabel,
    LanguageSwitcher,
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
.main-navigation {
  opacity: 1;
  transition: 0.3s ease;

  .modal-active & {
    opacity: 0;
  }
}

.main-navigation__info {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 40;
}
</style>
