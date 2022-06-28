<template>
  <div v-if="slides" class="details-layer">
    <details-slider :slides="slides" />

    <button
      class="details-layer__close button"
      @click="$store.commit('SetDetailsLayer', null)"
    >
      <svg-icon name="icon-close" />
    </button>
  </div>
</template>

<script>
import DetailsSlider from '~/components/DetailsSlider/DetailsSlider'
import { fetchOverlayData } from '~/utils'

export default {
  components: {
    DetailsSlider,
  },
  props: {
    detailsLayer: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      slides: null,
    }
  },
  // computed: {
  //   slides() {
  //     if (this.modalData && this.modalData.acf) {
  //       if (this.$i18n.locale === 'en' && this.modalData.acf.details_eng) {
  //         return this.modalData.acf.details_eng
  //       } else if (
  //         this.$i18n.locale === 'ru' &&
  //         this.modalData.acf.details_rus
  //       ) {
  //         return this.modalData.acf.details_rus
  //       } else {
  //         return this.modalData.acf.details_est
  //       }
  //     } else {
  //       return null
  //     }
  //   },
  // },
  mounted() {
    this.fetchDetails()
  },
  beforeDestroy() {
    this.$store.commit('SetDetailsData', null)
  },
  methods: {
    async fetchDetails() {
      const data = await fetchOverlayData({
        slug: this.detailsLayer,
      })

      this.$store.commit('SetDetailsData', data.data)
      this.slides = data.data.overlaySlides
    },
  },
}
</script>

<style lang="scss" scoped>
.details-layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.66);

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.details-layer__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;

  svg {
    @include absolute-center;

    width: 1.2rem;
    height: 1.2rem;
  }
}
</style>
