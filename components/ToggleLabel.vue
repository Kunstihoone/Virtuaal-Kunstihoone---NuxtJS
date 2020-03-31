<template>
  <div class="details-corner">
    <button @click="detailsState = !detailsState" class="toggle-label button">
      <tool-tip>
        {{ $t('details_label') }}
      </tool-tip>
      <svg-icon :name="detailsState ? 'icon-close' : 'icon-info'" />
    </button>

    <transition name="fade">
      <label-layer v-if="detailsState" :label-image="detailsImage" />
    </transition>
  </div>
</template>

<script>
import LabelLayer from '~/components/LabelLayer'
import ToolTip from '~/components/ToolTip'

export default {
  components: {
    LabelLayer,
    ToolTip
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
}

.toggle-label {
  display: flex;
  width: 2rem;
  height: 2rem;
  padding: 0.4rem;
  border-radius: 50%;

  svg {
    width: 100%;
    height: 100%;
  }

  &:hover {
    /deep/ .tooltip {
      transform: translateY(-0.4rem);
      opacity: 1;
    }
  }
}

/deep/ .tooltip {
  left: 0%;
  bottom: 100%;
}
</style>
