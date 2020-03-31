<template>
  <div v-if="modalData" class="details-layer">
    <details-slider :slides="modalData" />

    <button
      @click="$store.commit('SetDetailsLayerState', null)"
      class="details-layer__close button"
    >
      <svg-icon name="icon-close" />
    </button>
  </div>
</template>

<script>
import DetailsSlider from '~/components/DetailsSlider'

export default {
  components: {
    DetailsSlider
  },
  props: {
    currentRoom: {
      type: Object,
      default: null
    }
  },
  computed: {
    modalData() {
      if (this.currentRoom && this.currentRoom.acf) {
        if (this.$i18n.locale === 'en' && this.currentRoom.acf.details_eng) {
          return this.currentRoom.acf.details_eng
        } else if (
          this.$i18n.locale === 'ru' &&
          this.currentRoom.acf.details_rus
        ) {
          return this.currentRoom.acf.details_rus
        } else {
          return this.currentRoom.acf.details_est
        }
      } else {
        return null
      }
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
