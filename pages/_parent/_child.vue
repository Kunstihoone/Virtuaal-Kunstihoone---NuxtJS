<template>
  <ratio-container>
    <div id="video-wrapper" class="room-video" />

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
  </ratio-container>
</template>

<script>
import { mapState } from 'vuex'
import NavigationButton from '~/components/NavigationButton'
import MixinRoom from '~/mixins/MixinRoom'
import RatioContainer from '~/components/RatioContainer'
import PieceAudio from '~/components/PieceAudio'

export default {
  components: {
    NavigationButton,
    RatioContainer,
    PieceAudio
  },
  mixins: [MixinRoom],
  computed: {
    ...mapState({
      audioGuideState: (state) => state.audioGuideState
    })
  },
  async asyncData({ params, store, payload, route }) {
    if (payload) return { data: payload }
    else return { data: await store.getters.getSingleRoom(route.params.child) }
  }
}
</script>
