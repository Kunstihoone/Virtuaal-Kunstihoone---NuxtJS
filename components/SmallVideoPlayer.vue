<template>
  <div id="small-video" class="small-video" />
</template>

<script>
import Player from '@vimeo/player'

export default {
  props: {
    videoSrc: {
      type: String,
      default: null
    }
  },
  mounted() {
    if (this.videoSrc) {
      const videoOptions = {
        url: this.videoSrc,
        dnt: true,
        autoplay: true,
        muted: true,
        controls: false,
        loop: true
      }

      this.player = new Player('small-video', videoOptions)
    }
  }
}
</script>

<style lang="scss" scoped>
.small-video {
  position: absolute;
  bottom: 100%;
  bottom: calc(100% + 1rem);
  right: 0;
  width: rem-calc(320);
  height: rem-calc(320 * (9 / 16));
  box-shadow: $button-shadow;
  border-radius: $layers-border-radius;
  overflow: hidden;
  background-color: $kh-yellow;
  z-index: 15;

  /deep/ iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
