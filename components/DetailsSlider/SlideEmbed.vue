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
  mounted() {
    this.$store.commit('SetMutedRoomAudio', true)

    const videoOptions = {
      url: this.embedUrl,
      width: 1920,
      controls: false,
      autoplay: true
    }

    this.player = new Player(this.$refs.vimeoSlide, videoOptions)

    this.player.on('play', () => {
      this.$store.commit('SetAudioPlayerState', false)
    })

    this.player
      .setMuted(this.$store.state.muted)
      .then(function(muted) {})
      .catch(function(error) {
        console.log('error on muted', error)
        // an error occurred
      })
  },
  beforeDestroy() {
    this.$store.commit('SetMutedRoomAudio', false)
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
