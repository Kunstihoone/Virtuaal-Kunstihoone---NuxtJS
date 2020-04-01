<template>
  <div v-if="modalData" class="details-layer">
    <details-slider :slides="slides" />

    <button
      @click="$store.commit('SetDetailsLayer', null)"
      class="details-layer__close button"
    >
      <svg-icon name="icon-close" />
    </button>
  </div>
</template>

<script>
import DetailsSlider from '~/components/DetailsSlider/DetailsSlider'

export default {
  components: {
    DetailsSlider
  },
  props: {
    detailsLayer: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      modalData: null
    }
  },
  computed: {
    slides() {
      if (this.modalData && this.modalData.acf) {
        if (this.$i18n.locale === 'en' && this.modalData.acf.details_eng) {
          return this.modalData.acf.details_eng
        } else if (
          this.$i18n.locale === 'ru' &&
          this.modalData.acf.details_rus
        ) {
          return this.modalData.acf.details_rus
        } else {
          return this.modalData.acf.details_est
        }
      } else {
        return null
      }
    }
  },
  mounted() {
    this.fetchDetails()
  },
  methods: {
    async fetchDetails() {
      const data = await this.$axios.$get(
        `post-types/${this.$route.params.exhibition}/${this.detailsLayer}`
      )
      this.modalData = data
    }
  }
}
</script>

<style lang="scss" scoped>
.details-layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;

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
