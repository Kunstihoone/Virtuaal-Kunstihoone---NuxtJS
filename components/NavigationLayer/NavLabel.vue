<template>
  <transition name="fade">
    <div v-if="currentRoom.acf.label" class="nav-label">
      <div class="nav-label__buttons">
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
          <a
            v-if="
              detailsState &&
                currentRoom.acf.digital_guide_links &&
                currentRoom.acf.digital_guide_links[currentLocaleIso]
            "
            :href="currentRoom.acf.digital_guide_links[currentLocaleIso]"
            @click="$store.commit('SetAudioPlayerState', false)"
            target="blank"
            class="nav-label__guide-link button"
          >
            {{ $t('digital_guide') }}
          </a>
        </transition>
      </div>

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
  },
  computed: {
    currentLocaleIso() {
      return this.$i18n.locales.find((lang) => lang.code === this.$i18n.locale)
        .iso
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

  //   &:hover {
  //     .nav-label__guide-link {
  //       opacity: 1;
  //       pointer-events: auto;
  //     }
  //   }
}

.nav-label__buttons {
  display: flex;
}

// .nav-label__guide-link {
//   opacity: 0;
//   pointer-events: none;
//   transition: opacity 0.3s ease;
// }

.nav-label__toggle {
  margin-right: $menu-items-spacing;

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
