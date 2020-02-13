<template>
  <div
    :style="{ width: portraitWith }"
    :class="[orientation === 'landscape' ? 'm-landscape' : 'm-portrait']"
    class="ratio-container"
  >
    <slot />
  </div>
</template>

<script>
export default {
  data() {
    return {
      orientation: 'landscape',
      portraitWith: '100%'
    }
  },
  mounted() {
    this.orientationListener()
    window.addEventListener('resize', this.orientationListener)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.orientationListener)
  },
  methods: {
    orientationListener() {
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      const ratio = windowHeight / windowWidth

      if (ratio * 100 < 56.25) {
        this.orientation = 'portrait'
        this.portraitWith = `${(16 / 9) * windowHeight}px`
      } else {
        this.orientation = 'landscape'
        this.portraitWith = '100%'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ratio-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  z-index: 10;

  &.m-landscape {
    padding-top: (9 / 16) * 100%;
  }

  &.m-portrait {
    height: 100%;
  }

  .modal-active & {
    opacity: 0.2;
  }
}
</style>
