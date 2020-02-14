<template>
  <div class="details-slider">
    <button
      v-if="flattenedSlides.length > 1 && currentSlide > 0"
      @click="navLeft"
      class="details-slider__button m-left"
    >
      <svg-icon name="icon-arrow-left" />
    </button>

    <button
      v-if="
        flattenedSlides.length > 1 && flattenedSlides.length - 1 > currentSlide
      "
      @click="navRight"
      class="details-slider__button m-right"
    >
      <svg-icon name="icon-arrow-right" />
    </button>

    <div
      :style="{ transform: `translateX(${-100 * currentSlide}%)` }"
      class="details-slider__slides-wrapper"
    >
      <div
        v-for="(slide, index) in flattenedSlides"
        :key="index"
        class="details-slider__slide"
      >
        <slide-image
          v-if="slide.acf_fc_layout === 'image'"
          :image-data="slide.image"
        />
        <slide-video
          v-if="slide.acf_fc_layout === 'video'"
          :video-data="slide.video"
        />
        <slide-embed
          v-if="slide.acf_fc_layout === 'embed_video'"
          :embed-url="slide.embed_video_url"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SlideEmbed from '~/components/DetailsSlider/SlideEmbed'
import SlideImage from '~/components/DetailsSlider/SlideImage'
import SlideVideo from '~/components/DetailsSlider/SlideVideo'

export default {
  components: {
    SlideEmbed,
    SlideImage,
    SlideVideo
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
  computed: {
    flattenedSlides() {
      const flattenedSlides = []

      this.slides.forEach((slide) => {
        if (slide.acf_fc_layout === 'gallery_block') {
          slide.gallery.forEach((imageObject) => {
            flattenedSlides.push({
              acf_fc_layout: 'image',
              image: imageObject
            })
          })
        } else {
          flattenedSlides.push(slide)
        }
      })

      return flattenedSlides
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
      if (this.flattenedSlides.length - 1 > this.currentSlide) {
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
        this.$store.commit('SetModalData', null)
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
  height: 100%;
}

.details-slider__slide {
  position: relative;
  min-width: 100vw;
  min-height: 100vh;
  padding: 4rem;
  display: block;
}

/deep/ .detail-slide {
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

  h2 {
    color: white;
  }
}
</style>
