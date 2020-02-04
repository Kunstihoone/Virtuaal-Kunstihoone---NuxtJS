<template>
  <div class="detail-slide">
    <responsive-image
      v-if="slideContent.acf_fc_layout === 'image'"
      :image-data="slideContent.image"
    />
    <video v-else-if="slideContent.acf_fc_layout === 'video'">
      <source
        :src="slideContent.video.url"
        :type="slideContent.video.mime_type"
      />
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script>
export default {
  props: {
    slideContent: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-slide {
  width: calc(100vw - 4rem);
  height: calc(100vh - 4rem);
  flex-shrink: 0;

  img,
  video {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  h2 {
    color: white;
  }
}
</style>
