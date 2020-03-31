<template>
  <button class="button">
    <svg-icon :name="toggleState ? 'icon-close' : 'icon-settings'" />
  </button>
</template>

<script>
export default {
  props: {
    toggleState: {
      type: Boolean,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  position: relative;
  margin-right: 0.3rem;
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  border-radius: 50%;
  padding: 0;

  svg {
    @include absolute-center;

    width: 1.4rem;
    height: 1.4rem;
  }
}
</style>
