<template>
  <div class="details-corner">
    <button @click="detailsState = !detailsState" class="details-button button">
      <svg-icon name="icon-info" />
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
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  z-index: 40;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
}

.details-button {
  display: flex;
  width: 2rem;
  height: 2rem;
  padding: 0.4rem;
  border-radius: 50%;

  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
