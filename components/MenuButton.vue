<template>
  <component
    v-bind:is="componentElement"
    :to="linkPath"
    @click="analyticsEvent"
    class="menu-button button"
  >
    <slot />
    <svg-icon :name="icon" />
  </component>
</template>

<script>
export default {
  props: {
    buttonEvent: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    componentElement: {
      type: String,
      default: 'button',
    },
    linkPath: {
      type: String,
      default: null,
    },
  },
  methods: {
    analyticsEvent() {
      this.$ga.event('Virtuaalnäitus', 'Menu button click', this.buttonEvent)
    },
  },
}
</script>

<style lang="scss" scoped>
.menu-button {
  position: relative;
  width: $nav-button-small;
  height: $nav-button-small;
  border-radius: 50%;
  padding: 0;

  @include breakpoint('large') {
    width: $nav-button-medium;
    height: $nav-button-medium;
  }

  svg {
    @include absolute-center;

    width: $nav-button-svg-small;
    height: $nav-button-svg-small;

    @include breakpoint('large') {
      width: $nav-button-svg-medium;
      height: $nav-button-svg-medium;
    }
  }
}
</style>
