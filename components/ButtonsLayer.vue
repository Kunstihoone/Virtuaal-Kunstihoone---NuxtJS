<template>
  <nav
    :style="{ width: portraitWith }"
    :class="[orientation === 'landscape' ? 'm-landscape' : 'm-portrait']"
    class="buttons-layer"
  >
    <slot />
  </nav>
</template>

<script>
import anime from 'animejs'

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

    const tl = anime.timeline({
      easing: 'easeOutExpo',
      duration: 800
    })

    tl.add({
      targets: ['.navigation-button'],
      opacity: [0, 1],
      delay: anime.stagger(100),
      easing: 'easeInOutQuad'
    })
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
.buttons-layer {
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
}
</style>
