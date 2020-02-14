<template>
  <div class="details-corner">
    <button @click="detailsState = !detailsState" class="details-button button">
      {{ $t('details') }}
    </button>

    <transition name="fade">
      <label-layer
        v-if="detailsState"
        @closeLabel="detailsState = false"
        :label-image="detailsImage"
      />
    </transition>
  </div>
</template>

<script>
import LabelLayer from '~/components/LabelLayer'

export default {
  components: {
    LabelLayer
  },
  props: {
    detailsImage: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      detailsState: false
    }
  }
}
</script>

<style lang="scss" scoped>
.details-corner {
  position: fixed;
  left: 1rem;
  bottom: 1rem;
  z-index: 40;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
}
</style>
