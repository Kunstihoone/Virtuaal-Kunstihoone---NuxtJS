<template>
  <div class="label-layer">
    <svg-icon
      @click="$emit('closeLabel')"
      class="label-layer__close"
      name="icon-close"
    />

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
  margin-bottom: 1rem;
  width: rem-calc(320);
  box-shadow: $button-shadow;
  border-radius: 0.6rem;
  overflow: hidden;
}

.label-layer__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 1.4rem;
  height: 1.4rem;
  cursor: pointer;
}
</style>
