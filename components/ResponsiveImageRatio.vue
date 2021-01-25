<template>
  <div :style="ratioBox" class="responsive-image-ratio">
    <responsive-image :image-data="imageData" />
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
    ratioBox() {
      const ratio = this.imageData.height / this.imageData.width

      return {
        paddingTop: ratio * 100 + '%',
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.responsive-image-ratio {
  position: relative;

  /deep/ img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
