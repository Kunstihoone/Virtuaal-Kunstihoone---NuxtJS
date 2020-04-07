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
  margin-bottom: $menu-items-spacing-small;
  width: rem-calc(220);
  box-shadow: $button-shadow;
  border-radius: $layers-border-radius;
  overflow: hidden;
  background-color: $white;

  @include breakpoint('large') {
    width: rem-calc(320);
    margin-bottom: $menu-items-spacing-medium;
  }
}
</style>
