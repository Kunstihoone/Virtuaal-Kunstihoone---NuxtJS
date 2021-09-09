<template>
  <div class="loading-indicator">
    <svg-icon
      v-for="index in 16"
      :key="index"
      name="loader"
      class="loading-indicator__icon"
    />
  </div>
</template>

<style lang="scss" scoped>
.loading-indicator {
  position: absolute;
  top: 1.4rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  z-index: 4;
}

@keyframes pulse {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.loading-indicator__icon {
  width: 0.6rem;
  height: 0.6rem;
  animation-name: pulse;
  animation-duration: 1s;
  animation-iteration-count: infinite;

  @include breakpoint('xlarge') {
    width: 1.2rem;
    height: 1.2rem;
  }

  ::v-deep path {
    fill: $white;
  }

  @for $i from 1 through 16 {
    &:nth-child(#{$i}) {
      animation-delay: 0.1s * $i;
    }
  }
}
</style>
