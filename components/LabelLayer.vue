<template>
  <div class="label-layer">
    <responsive-image :image-data="labelImage" />
  </div>
</template>

<script>
export default {
  props: {
    labelImage: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.label-layer {
  position: absolute;
  bottom: 100%;
  left: 0;
  margin-bottom: 1rem;
  width: rem-calc(320);
  box-shadow: $button-shadow;
  border-radius: 0.6rem;
  overflow: hidden;
}
</style>
