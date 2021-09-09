<template>
  <div class="nav-label">
    <div class="nav-label__buttons">
      <transition name="fade">
        <menu-button
          v-if="currentRoom.acf.label"
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
            currentRoom.acf.curators_essay_links &&
            currentRoom.acf.curators_essay_links[currentLocaleIso]
          "
          :href="currentRoom.acf.curators_essay_links[currentLocaleIso].url"
          target="_blank"
          class="nav-label__guide-link button"
          @click="$store.commit('SetAudioPlayerState', false)"
        >
          {{
            currentRoom.acf.curators_essay_links[currentLocaleIso].title
              ? currentRoom.acf.curators_essay_links[currentLocaleIso].title
              : $t('curators_essay')
          }}
        </a>
        <a
          v-else-if="
            currentRoom.acf.digital_guide_links &&
            currentRoom.acf.digital_guide_links[
              $i18n.locale === 'evk' ? 'evk' : currentLocaleIso
            ]
          "
          :href="
            currentRoom.acf.digital_guide_links[
              $i18n.locale === 'evk' ? 'evk' : currentLocaleIso
            ]
          "
          target="_blank"
          class="nav-label__guide-link button"
          @click="$store.commit('SetAudioPlayerState', false)"
        >
          {{ $t('digital_guide') }}
        </a>
      </transition>
    </div>

    <transition name="fade">
      <label-layer v-if="detailsState" :label-image="currentRoom.acf.label" />
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
