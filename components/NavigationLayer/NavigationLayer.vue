<template>
  <div class="navigation-layer">
    <nav-settings class="navigation-layer__bottom-layer" />

    <nav-info
      v-if="getRouteBaseName() !== 'index'"
      class="navigation-layer__bottom-layer"
    />

    <nav-label
      v-if="currentRoom && getRouteBaseName() !== 'index'"
      :current-room="
        $store.state.detailsData ? $store.state.detailsData : currentRoom
      "
    />

    <audio-guide
      v-if="
        currentRoom && getRouteBaseName() !== 'index' && $i18n.locale !== 'evk'
      "
      :current-room="
        $store.state.detailsData ? $store.state.detailsData : currentRoom
      "
    />

    <video-guide
      v-else-if="
        currentRoom && getRouteBaseName() !== 'index' && $i18n.locale === 'evk'
      "
      :current-room="
        $store.state.detailsData ? $store.state.detailsData : currentRoom
      "
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
    VideoGuide,
  },
  props: {
    currentRoom: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      detailsImage: null,
    }
  },
}
</script>

<style lang="scss" scoped>
.navigation-layer__bottom-layer {
  opacity: 1;
  transition: opacity $transition-ease-in-out;

  .m-modal-active & {
    opacity: 0;
  }
}
</style>
