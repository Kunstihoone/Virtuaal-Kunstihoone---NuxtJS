<template>
  <div class="details-slider">
    <button @click="navLeft" class="details-slider__button m-left">
      <button-content icon="left" />
    </button>
    <button @click="navRight" class="details-slider__button m-right">
      <button-content icon="right" />
    </button>

    <div
      :style="{ transform: `translateX(${-100 * currentSlide}%)` }"
      class="details-slider__slides-wrapper"
    >
      <detail-slide
        v-for="(slide, index) in slides"
        :slide-content="slide"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import ButtonContent from '~/components/ButtonContent'
import DetailSlide from '~/components/DetailSlide'

export default {
  components: {
    ButtonContent,
    DetailSlide
  },
  props: {
    slides: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      currentSlide: 0
    }
  },
  mounted() {
    window.addEventListener('keydown', (e) => this.keyDownListener(e))
  },
  beforeDestroy() {
    window.removeEventListener('keydown', (e) => this.keyDownListener(e))
  },
  methods: {
    navLeft() {
      if (this.currentSlide > 0) {
        this.currentSlide--
      }
    },

    navRight() {
      if (this.slides.length - 1 > this.currentSlide) {
        this.currentSlide++
      }
    },
    keyDownListener(e) {
      const key = e.which || e.keyCode

      if (key === 37) {
        this.navLeft()
      } else if (key === 39) {
        this.navRight()
      } else if (key === 27) {
        this.$emit('closeModal')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.details-slider {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  h2 {
    position: fixed;
    top: 4rem;
    left: 4rem;
    color: white;
    z-index: 50;
  }
}

.details-slider__button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background-color: white;
  border-radius: 50%;
  transition: $transition-cubic-bezier, background-color 0.2s ease;
  box-shadow: $button-shadow;

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }

  &.m-left {
    left: 1rem;
  }

  &.m-right {
    right: 1rem;
  }
}

.details-slider__slides-wrapper {
  position: relative;
  display: flex;
  transition: transform 0.3s ease;
}
</style>
