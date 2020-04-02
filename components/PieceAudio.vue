<template>
  <div class="piece-audio">
    <audio
      ref="player"
      :src="audioData.url"
      crossorigin="anonymous"
      class="piece-audio__player"
      autoplay
      controls
    />
  </div>
</template>

<script>
export default {
  props: {
    audioData: {
      type: Object,
      default: null
    }
  },
  watch: {
    '$store.state.muted'() {
      this.$refs.player.muted = this.$store.state.muted
    },
    '$store.state.mutedRoomAudio'() {
      this.$refs.player.muted = this.$store.state.mutedRoomAudio
    }
  }
}
</script>

<style lang="scss" scoped>
.piece-audio__player {
  display: none;
}
</style>
