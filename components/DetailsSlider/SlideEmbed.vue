<template>
  <div class="detail-slide">
    <div ref="vimeoSlide" class="detail-slide__embed" />
  </div>
</template>

<script>
import Player from '@vimeo/player'

export default {
  props: {
    embedUrl: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      initialMutedState: null
    }
  },
  mounted() {
    this.initialMutedState = this.$store.state.mutedRoomAudio
    this.$store.commit('SetMutedRoomAudio', true)

    const videoOptions = {
      url: this.embedUrl,
      width: 1920,
      controls: false,
      autoplay: true,
      loop: true
    }

    this.player = new Player(this.$refs.vimeoSlide, videoOptions)

    this.player.on('play', () => {
      this.$store.commit('SetAudioPlayerState', false)
    })
  },
  beforeDestroy() {
    this.$store.commit('SetMutedRoomAudio', this.initialMutedState)
  }
}
</script>

<style lang="scss" scoped>
.detail-slide__embed {
  position: absolute;
  width: 100%;
  height: 100%;

  /deep/ iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
