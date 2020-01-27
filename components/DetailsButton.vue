<template>
  <button
    @click="$store.commit('SetActiveModal', modalName)"
    class="details-button button"
  >
    DETAILS
  </button>
</template>

<script>
export default {
  props: {
    modalName: {
      type: String,
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
