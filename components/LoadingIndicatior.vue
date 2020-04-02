<template>
  <div class="loading-indicator">
    <svg-icon
      v-for="index in 10"
      :key="index"
      name="loader"
      class="loading-indicator__icon"
    />
  </div>
</template>

<style lang="scss" scoped>
.loading-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  max-width: rem-calc(300);
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
  width: 10%;
  height: auto;
  animation-name: pulse;
  animation-duration: 1s;
  animation-iteration-count: infinite;

  /deep/ path {
    fill: $white;
  }

  @for $i from 1 through 10 {
    &:nth-child(#{$i}) {
      animation-delay: 0.1s * $i;
    }
  }
}
</style>
