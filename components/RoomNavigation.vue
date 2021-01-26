<template>
  <nav class="room-navigation">
    <template v-for="(button, index) in currentRoom.acf.buttons">
      <button
        v-if="button.related_item.is_detail"
        :key="`nav-button-${index}`"
        :style="{
          top: `${button.position.top}%`,
          left: `${button.position.left}%`,
        }"
        :aria-label="button.related_item.post_title"
        class="room-navigation__link"
        @click="
          $store.commit('SetDetailsLayer', button.related_item.post_name) &
            analyticsEvent('Details layer', button.related_item.post_name)
        "
      >
        <svg-icon :name="button.icon" />
      </button>

      <navigation-button
        v-else-if="button.related_item"
        :key="`nav-button-${button.related_item.post_name}`"
        :style="{
          top: `${button.position.top}%`,
          left: `${button.position.left}%`,
        }"
        :button-data="button"
        :aria-label="button.related_item.post_title"
        class="room-navigation__link"
        @click.native="
          analyticsEvent(
            'Room navigation button',
            button.related_item.post_name,
          )
        "
      >
        <svg-icon :name="button.icon" />
      </navigation-button>

      <a
        v-else-if="button.external_link"
        :key="`nav-button-${index}`"
        :style="{
          top: `${button.position.top}%`,
          left: `${button.position.left}%`,
        }"
        :href="button.external_link.url"
        :aria-label="button.external_link.title"
        target="_blank"
        class="room-navigation__link"
        @click="analyticsEvent('External link', button.external_link.url)"
      >
        <svg-icon name="icon-external-link" />
      </a>
    </template>
  </nav>
</template>

<script>
import NavigationButton from '~/components/NavigationButton'

export default {
  components: {
    NavigationButton,
  },
  props: {
    currentRoom: {
      type: Object,
      default: null,
    },
  },
  methods: {
    analyticsEvent(name, destination) {
      this.$ga.event('Virtuaalnäitus', name, destination)
    },
  },
}
</script>

<style lang="scss" scoped>
.room-navigation {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
}

.room-navigation__link {
  position: absolute;
  border-radius: 50%;
  border-style: solid;
  border-color: white;
  border-width: 0.2rem;
  width: $nav-button-small;
  height: $nav-button-small;
  transform: translate(-50%, -50%) scale(1);
  transition: transform $transition-cubic-bezier,
    background-color $transition-ease-in-out;
  box-shadow: $button-shadow;
  background-color: $white;

  @include breakpoint('large') {
    background-color: transparent;
    width: $nav-button-medium / 2;
    height: $nav-button-medium / 2;
  }

  &:after {
    @include breakpoint('large') {
      @include absolute-center;

      content: '';
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
    }
  }

  svg {
    @include absolute-center;

    width: $nav-button-svg-small;
    height: $nav-button-svg-small;

    @include breakpoint('large') {
      width: $nav-button-svg-medium / 2;
      height: $nav-button-svg-medium / 2;
      opacity: 0;
      transition: opacity $transition-ease-in-out;
    }
  }

  &:hover {
    @include breakpoint('large') {
      transform: translate(-50%, -50%) scale(2);
      background-color: white;
      border-color: transparent;
    }

    svg {
      opacity: 1;
    }
  }
}
</style>
