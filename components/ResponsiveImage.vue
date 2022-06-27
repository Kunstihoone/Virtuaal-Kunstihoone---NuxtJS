<template>
  <img
    v-if="imageData.mime === 'image/gif'"
    :key="`gif-${imageData.ID}`"
    ref="imageData"
    :src="`${imageData.url}`"
    :alt="imageData.alternativeText"
    class="responsive-image lazyload"
  />
  <img
    v-else
    :key="imageData.ID"
    ref="imageData"
    :src="`${imageData.formats.thumbnail.url}`"
    :data-srcset="srcSet"
    :alt="imageData.alternativeText"
    :sizes="`${throttleSizes && '(min-width: 1000px) 793px, 100vw'}`"
    class="responsive-image lazyload"
  />
</template>

<script>
export default {
  props: {
    imageData: {
      type: Object,
      default: null,
    },
    throttleSizes: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    srcSet() {
      const formats = this.imageData.formats
      let srcSet = ''

      for (const key in formats) {
        const format = formats[key]
        srcSet += `${format.url} ${format.width}w, `
      }

      if (this.imageData.width > 1920) {
        srcSet += `${this.imageData.url} 2560w, `
      }

      return srcSet
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
