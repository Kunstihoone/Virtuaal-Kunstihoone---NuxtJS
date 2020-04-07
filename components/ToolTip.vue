<template>
  <span class="tooltip"><slot /></span>
</template>

<style lang="scss" scoped>
.tooltip {
  @include font-size(h6);

  position: absolute;
  background-color: $gray;
  color: $black;
  padding: 0.2rem 0.5rem;
  border-radius: $layers-border-radius;
  box-shadow: $button-shadow;
  line-height: 1;
  white-space: nowrap;
  transition: $transition-ease-in-out;
  cursor: pointer;
  pointer-events: none;
  opacity: 0;
  z-index: 16;
}
</style>
