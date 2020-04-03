<template>
  <div class="nav-info">
    <button
      @click="layerState = !layerState"
      :class="{ 'm-active': layerState }"
      class="button nav-info__toggle"
    >
      Info
    </button>

    <transition name="fade">
      <info-layer v-if="layerState" />
    </transition>
  </div>
</template>

<script>
import InfoLayer from '~/components/InfoLayer'

export default {
  components: {
    InfoLayer
  },
  data() {
    return {
      layerState: false
    }
  },
  watch: {
    $route() {
      this.layerState = false
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-info {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
}
</style>
