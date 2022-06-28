<template>
  <div class="details-slider">
    <button
      v-if="slides.length > 1 && currentSlide > 0"
      class="details-slider__button m-left"
      @click="navLeft"
    >
      <svg-icon name="icon-arrow-left" />
    </button>

    <button
      v-if="slides.length > 1 && slides.length - 1 > currentSlide"
      class="details-slider__button m-right"
      @click="navRight"
    >
      <svg-icon name="icon-arrow-right" />
    </button>
    <div
      :style="{ transform: `translateX(${-100 * currentSlide}%)` }"
      class="details-slider__slides-wrapper"
    >
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="details-slider__slide"
      >
        <slide-media
          v-if="slide.__component === 'slides.media-slide'"
          :media-data="slide.media"
        />
        <slide-image-with-text
          v-if="slide.__component === 'slides.image-with-text'"
          :image-data="slide.media"
          :text="slide.text"
        />
        <slide-embed
          v-else-if="slide.__component === 'slides.embed-video'"
          :embed-url="slide.videoUrl"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SlideEmbed from '~/components/DetailsSlider/SlideEmbed'
import SlideMedia from '~/components/DetailsSlider/SlideMedia'
import SlideImageWithText from '~/components/DetailsSlider/SlideImageWithText'

export default {
  components: {
    SlideEmbed,
    SlideMedia,
    SlideImageWithText,
  },
  props: {
    slides: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      currentSlide: 0,
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
        this.$store.commit('SetDetailsLayer', null)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.details-slider {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
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
  transition: transform $transition-ease-in-out;
  height: 100%;
}

.details-slider__slide {
  position: relative;
  min-width: 100%;
  min-height: 100%;
  display: block;
  padding: 3rem;

  @include breakpoint(large) {
    padding: 4rem;
  }
}

::v-deep .detail-slide {
  position: relative;
  width: 100%;
  height: 100%;
  flex-shrink: 0;

  img,
  video {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
