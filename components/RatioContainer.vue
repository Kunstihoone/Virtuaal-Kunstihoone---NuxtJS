<template>
  <div class="ratio-container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.ratio-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;

  &.m-landscape {
    padding-top: (9 / 16) * 100%;
  }

  &.m-portrait {
    height: 100%;
  }
}
</style>
