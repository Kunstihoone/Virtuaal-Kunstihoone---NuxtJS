<template>
  <img
    :src="placeholderImage"
    :class="{ 'm-visible': $store.state.placeholderVisible }"
    class="placeholder-image"
  />
</template>
<script>
export default {
  props: {
    placeholderImage: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.placeholder-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
  z-index: 2;

  &.m-visible {
    opacity: 1;
  }
}
</style>
