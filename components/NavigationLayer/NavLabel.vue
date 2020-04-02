<template>
  <transition name="fade">
    <div v-if="currentRoom.acf.label" class="nav-label">
      <menu-button
        @click.native="detailsState = !detailsState"
        :icon="detailsState ? 'icon-close' : 'icon-info'"
        class="nav-label__toggle"
      >
        <tool-tip>
          {{ $t('details_label') }}
        </tool-tip>
      </menu-button>

      <transition name="fade">
        <label-layer v-if="detailsState" :label-image="currentRoom.acf.label" />
      </transition>
    </div>
  </transition>
</template>

<script>
import LabelLayer from '~/components/LabelLayer'
import ToolTip from '~/components/ToolTip'
import MenuButton from '~/components/MenuButton'

export default {
  components: {
    LabelLayer,
    ToolTip,
    MenuButton
  },
  props: {
    currentRoom: {
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
.nav-label {
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  z-index: 25;
}

.nav-label__toggle {
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
