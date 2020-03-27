<template>
  <span class="tooltip"><slot /></span>
</template>

<style lang="scss" scoped>
.tooltip {
  @include font-size(h6);

  background-color: $gray;
  color: $black;
  padding: 0.2rem 0.5rem;
  border-radius: 0.6rem;
  box-shadow: $button-shadow;
  line-height: 1;
  white-space: nowrap;
  transition: 0.3s ease-in-out;
  cursor: pointer;
}
</style>
