<template>
  <div class="audio-guide">
    <button @click="showAudioPlayer = true" class="toggle-audio-guide button">
      Audiogiid {{ showAudioPlayer ? 'off' : 'on' }}
      <ButtonContent icon="audio" />
    </button>

    <audio-player v-if="showAudioPlayer" :active-track="activeTrack" />
  </div>
</template>

<script>
import ButtonContent from '~/components/ButtonContent'
import AudioPlayer from '~/components/AudioPlayer'

export default {
  components: {
    ButtonContent,
    AudioPlayer
  },
  data() {
    return {
      showAudioPlayer: false
    }
  },
  computed: {
    activeTrack() {
      return this.$store.state.audioGuideTrack
    }
  }
}
</script>

<style lang="scss" scoped>
.audio-guide {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 40;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.toggle-audio-guide {
  svg {
    width: 1rem;
    height: 1rem;
    margin-left: 0.4rem;
  }
}
</style>
