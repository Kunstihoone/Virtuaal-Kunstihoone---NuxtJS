<template>
  <component
    v-bind:is="componentElement"
    :to="linkPath"
    class="menu-button button"
  >
    <slot />
    <svg-icon :name="icon" />
  </component>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: null
    },
    componentElement: {
      type: String,
      default: 'button'
    },
    linkPath: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-button {
  position: relative;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  padding: 0;

  svg {
    @include absolute-center;

    width: 1.4rem;
    height: 1.4rem;
  }
}
</style>
