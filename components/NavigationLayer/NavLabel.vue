<template>
  <div class="nav-label">
    <div class="nav-label__buttons">
      <transition name="fade">
        <menu-button
          v-if="currentRoom.localizations[$i18n.locale]?.label.data"
          :icon="detailsState ? 'icon-close' : 'icon-info'"
          button-event="Toggle label"
          class="nav-label__toggle"
          @click.native="detailsState = !detailsState"
        >
          <tool-tip>
            {{ $t('details_label') }}
          </tool-tip>
        </menu-button>
      </transition>

      <transition name="fade">
        <a
          v-if="
            currentRoom.localizations[$i18n.locale]?.externalLink &&
            currentRoom.localizations[$i18n.locale]?.externalLinkLabel
          "
          :href="currentRoom.localizations[$i18n.locale].externalLink"
          target="_blank"
          class="nav-label__guide-link button"
          @click="$store.commit('SetAudioPlayerState', false)"
        >
          {{ currentRoom.localizations[$i18n.locale].externalLinkLabel }}
        </a>
      </transition>
    </div>

    <transition name="fade">
      <label-layer
        v-if="
          detailsState &&
          currentRoom.localizations[$i18n.locale]?.label.data.attributes.file
            .data?.attributes
        "
        :label-image="
          currentRoom.localizations[$i18n.locale].label.data.attributes.file
            .data.attributes
        "
      />
    </transition>
  </div>
</template>

<script>
import LabelLayer from '~/components/LabelLayer'
import ToolTip from '~/components/ToolTip'
import MenuButton from '~/components/MenuButton'

export default {
  components: {
    LabelLayer,
    ToolTip,
    MenuButton,
  },
  props: {
    currentRoom: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      detailsState: false,
    }
  },
  computed: {
    currentLocaleIso() {
      return this.$i18n.locales.find((lang) => lang.code === this.$i18n.locale)
        .iso
    },
  },
}
</script>

<style lang="scss" scoped>
.nav-label {
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  z-index: 25;
}

.nav-label__buttons {
  display: flex;
}

.nav-label__toggle {
  margin-right: $menu-items-spacing-small;

  @include breakpoint('large') {
    margin-right: $menu-items-spacing-medium;
  }

  &:hover {
    ::v-deep .tooltip {
      transform: translateY(-0.4rem);
      opacity: 1;
    }
  }
}

::v-deep .tooltip {
  left: 0%;
  bottom: 100%;
}
</style>
