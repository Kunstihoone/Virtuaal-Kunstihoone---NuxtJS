<template>
  <img
    v-if="imageData"
    :key="imageData.ID"
    :src="
      imageData.sizes && imageData.sizes.thumbnail_lqip
        ? imageData.sizes.thumbnail_lqip
        : ''
    "
    :data-src="defaultImage"
    :data-srcset="imageData.srcset"
    :alt="imageData.alt"
    class="responsive-image lazyload"
    data-sizes="auto"
  />
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
    defaultImage() {
      if (this.imageData.sizes && this.imageData.sizes.large) {
        return this.imageData.sizes.large
      } else {
        return this.imageData.url
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.responsive-image {
  width: 100%;
  opacity: 0;
}

.responsive-image.lazyloaded {
  opacity: 1;
}
</style>
