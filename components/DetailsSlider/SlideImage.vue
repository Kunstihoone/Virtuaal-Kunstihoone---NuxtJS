<template>
  <div class="detail-slide">
    <responsive-image :image-data="imageData" />
    <p
      v-if="imageData.acf && imageData.acf[`image_title_${currentLocaleIso}`]"
      class="detail-slide__title"
    >
      {{ imageData.acf[`image_title_${currentLocaleIso}`] }}
    </p>
    <p v-else-if="imageData.caption" class="detail-slide__title">
      {{ imageData.caption }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    imageData: {
      type: Object,
      default: null,
    },
  },
  computed: {
    currentLocaleIso() {
      return this.$i18n.locales.find((lang) => lang.code === this.$i18n.locale)
        .iso
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
