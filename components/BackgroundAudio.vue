<template>
  <div class="background-audio">
    <audio
      ref="player"
      :src="audioData.url"
      crossorigin="anonymous"
      class="background-audio__player"
      loop
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
      default: null,
    },
  },
  watch: {
    '$store.state.mutedRoomAudio'() {
      this.$refs.player.muted = this.$store.state.mutedRoomAudio
    },
  },
  mounted() {
    this.$refs.player.muted = this.$store.state.mutedRoomAudio
  },
}
</script>

<style lang="scss" scoped>
.background-audio__player {
  display: none;
}
</style>
