<template>
  <nuxt-link :to="linkTo" class="back-button button">
    <svg-icon name="icon-arrow-left" /> Tagasi
  </nuxt-link>
</template>

<script>
export default {
  props: {
    linkTo: {
      type: [Object, String],
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.back-button {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 40;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.4rem;
    width: 0.8rem;
    height: 0.8rem;
  }
}
</style>
