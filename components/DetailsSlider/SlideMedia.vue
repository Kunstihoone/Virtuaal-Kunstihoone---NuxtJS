<template>
  <div class="detail-slide slide-media">
    <slide-video
      v-if="processData?.file.data?.attributes.mime === 'video/mp4'"
      :video-data="processData.file.data.attributes"
    />
    <responsive-image
      v-else-if="processData?.file.data"
      :image-data="processData.file.data.attributes"
    />
    <p
      v-if="processData?.localizations[$i18n.locale]?.title"
      class="detail-slide__title"
    >
      {{ processData?.localizations[$i18n.locale].title }}
    </p>
    <p
      v-else-if="processData?.localizations[$i18n.locale]?.caption"
      class="detail-slide__title"
    >
      {{ processData?.localizations[$i18n.locale].caption }}
    </p>
  </div>
</template>

<script>
import SlideVideo from '~/components/DetailsSlider/SlideVideo'
import { flattenLocalization } from '~/utils'

export default {
  components: {
    SlideVideo,
  },
  props: {
    mediaData: {
      type: Object,
      default: null,
    },
  },
  computed: {
    processData() {
      const data = {
        ...this.mediaData.data.attributes,
        localizations: flattenLocalization(this.mediaData.data),
      }
      return data
    },
  },
}
</script>

<style lang="scss" scoped>
.detail-slide__title {
  position: absolute;
  top: 100%;
  margin-top: 0.6rem;
  color: white;
  text-align: center;
  width: 50%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
