<template>
  <div v-if="modalData" class="detail-view">
    <details-slider
      v-if="modalData.acf && modalData.acf.detailed_view_content"
      :slides="modalData.acf.detailed_view_content"
    />

    <button
      @click="$store.commit('SetActiveModal', null)"
      class="detail-view__close button"
    >
      CLOSE
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
    modalName: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      modalData: null
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const modalData = await this.$axios.$get(
        `post-types/virtual-exhibitions/${this.modalName}`,
        {
          params: {
            acf: true
          }
        }
      )

      // console.log(modalData)
      this.modalData = modalData
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-view {
  position: fixed;
  top: 2rem;
  left: 2rem;
  width: calc(100vw - 4rem);
  height: calc(100vh - 4rem);
  z-index: 100;
  background-color: $black;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.detail-view__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style>
