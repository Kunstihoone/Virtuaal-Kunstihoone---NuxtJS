<template>
  <button
    @click="$store.commit('SetModalData', modalData)"
    class="details-button button"
  >
    Detailid
  </button>
</template>

<script>
export default {
  props: {
    modalData: {
      type: Array,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.details-button {
  position: fixed;
  left: 1rem;
  bottom: 1rem;
  z-index: 40;
}
</style>
