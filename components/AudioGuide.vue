<template>
  <div class="audio-guide">
    <button
      v-if="!showAudioPlayer"
      @click="showAudioPlayer = true"
      class="toggle-audio-guide button"
    >
      Audiogiid on <ButtonContent icon="audio" />
    </button>

    <div v-if="showAudioPlayer" class="audio-player">
      <h4 class="audio-player__title">Sõna mõjutus kolofoon - audiogiid</h4>
    </div>
  </div>
</template>

<script>
import ButtonContent from '~/components/ButtonContent'

export default {
  components: {
    ButtonContent
  },
  data() {
    return {
      showAudioPlayer: false
    }
  }
}
</script>

<style lang="scss" scoped>
.toggle-audio-guide {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 40;
}

.toggle-audio-guide {
  svg {
    width: 1rem;
    height: 1rem;
    margin-left: 0.4rem;
  }
}

.audio-player {
  position: fixed;
  left: 50%;
  bottom: 2rem;
  transform: translateX(-50%);
  background-color: white;
  color: $black;
  padding: 0.4rem 0.8rem;
  border-radius: 0.8rem;
  z-index: 40;
}
</style>
