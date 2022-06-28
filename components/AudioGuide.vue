<template>
  <div v-if="activeTrack" class="audio-guide">
    <transition :css="false" @enter="playerEnter" @leave="playerLeave">
      <audio-guide-player
        v-if="audioGuideState && activeTrack"
        :key="activeTrack.id"
        :active-track="activeTrack"
        :audio-guide-title="audioGuideTitle"
      />
    </transition>

    <menu-button
      :class="{ 'm-active': audioGuideState }"
      :icon="audioGuideState ? 'icon-no-audio' : 'icon-audio'"
      button-event="Toggle audio guide"
      class="toggle-audio-guide button"
      @click.native="$store.commit('SetAudiGuideState', !audioGuideState)"
    >
      <tool-tip class="toggle-audio-guide__tooltip">
        {{ $t('audio_guide') }}
      </tool-tip>
    </menu-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import anime from 'animejs'
import AudioGuidePlayer from '~/components/AudioGuidePlayer'
import MenuButton from '~/components/MenuButton'
import ToolTip from '~/components/ToolTip'

export default {
  components: {
    AudioGuidePlayer,
    MenuButton,
    ToolTip,
  },
  props: {
    currentRoom: {
      type: Object,
      default: null,
    },
  },
  computed: {
    ...mapState({
      audioGuideState: (state) => state.audioGuideState,
      placeholderVisible: (state) => state.placeholderVisible,
    }),
    audioGuideTitle() {
      if (this.currentRoom.localizations[this.$i18n.locale].audioGuideTitle) {
        return this.currentRoom.localizations[this.$i18n.locale].audioGuideTitle
      } else {
        return null
      }
    },
    activeTrack() {
      return this.currentRoom.localizations[this.$i18n.locale].audioGuide.data
        ?.attributes.file.data
    },
  },
  methods: {
    playerEnter(el, done) {
      const tl = anime.timeline({
        easing: 'easeOutExpo',
        duration: 400,
        complete() {
          done()
        },
      })

      tl.add({
        targets: el,
        width: [0, '15rem'],
        opacity: [0, 1],
        easing: 'easeInOutQuad',
      })

      tl.add({
        targets: '.audio-player__title',
        opacity: [0, 1],
        easing: 'easeInOutQuad',
      })
    },
    playerLeave(el, done) {
      const tl = anime.timeline({
        easing: 'easeOutExpo',
        duration: 400,
        complete() {
          done()
        },
      })

      tl.add({
        targets: '.audio-player__title',
        opacity: [1, 0],
        easing: 'easeInOutQuad',
      })

      tl.add(
        {
          targets: el,
          width: 0,
          opacity: 0,
          easing: 'easeInOutQuad',
        },
        '-=200',
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.audio-guide {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  z-index: 120;
  display: flex;
}

.toggle-audio-guide {
  margin-left: $menu-items-spacing-small;

  @include breakpoint('medium') {
    margin-left: $menu-items-spacing-medium;
  }

  svg {
    opacity: 0.3;
    transition: opacity 0.3s $transition-ease-in-out;
  }

  &.m-active {
    svg {
      opacity: 1;
    }
  }

  &:hover {
    .toggle-audio-guide__tooltip {
      transform: translateY(-0.4rem);

      opacity: 1;
    }
  }
}

.toggle-audio-guide__tooltip {
  right: 0%;
  bottom: 100%;
  transform: translateY(-0.2rem);
}
</style>
