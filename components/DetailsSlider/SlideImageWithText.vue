<template>
  <div class="detail-slide">
    <div class="detail-slide__image-wrapper">
      <responsive-image :image-data="imageData" />
    </div>

    <div class="detail-slide__text-wrapper">
      <p v-html="text" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageData: {
      type: Object,
      default: null
    },
    text: {
      type: String,
      default: null
    }
  },
  computed: {
    currentLocaleIso() {
      return this.$i18n.locales.find((lang) => lang.code === this.$i18n.locale)
        .iso
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-slide {
  @include row();
}

.detail-slide__image-wrapper,
.detail-slide__text-wrapper {
  @include grid(1/2);
}

.detail-slide__image-wrapper {
  position: relative;
  background-color: black;
}

.detail-slide__text-wrapper {
  @include grid(1/2);
  @include gutter;

  border-radius: 0 $layers-border-radius $layers-border-radius 0;
  height: 100%;
  overflow-y: auto;
  background-color: $white;
}
</style>
