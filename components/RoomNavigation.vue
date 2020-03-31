<template>
  <nav class="room-navigation">
    <template
      v-for="(button, index) in navigationButtons"
      :button-data="button"
    >
      <button
        v-if="button.link_to_details"
        :style="{
          top: `${button.position.top}%`,
          left: `${button.position.left}%`
        }"
        @click="$store.commit('SetDetailsLayerState', true)"
        :key="`nav-button-${index}`"
        class="room-navigation__link"
      >
        <svg-icon :name="button.icon" />
      </button>
      <navigation-button
        v-else
        :style="{
          top: `${button.position.top}%`,
          left: `${button.position.left}%`
        }"
        :button-data="button"
        :key="`nav-button-${button.related_item.post_name}`"
        class="room-navigation__link"
      >
        <svg-icon :name="button.icon" />
      </navigation-button>
    </template>
  </nav>
</template>

<script>
import NavigationButton from '~/components/NavigationButton'

export default {
  components: {
    NavigationButton
  },
  props: {
    navigationButtons: {
      type: Array,
      default: null
    }
  },
  methods: {
    showPlaceholder() {
      this.$store.commit('SetPlaceholderVisible', true)
    },
    preloadPlaceholder(button) {
      const room = this.$store.getters.getSingleRoom(
        button.related_item.post_name
      )

      if (room.featured_image && room.featured_image.sizes.medium) {
        this.$store.commit(
          'SetPlaceholderImage',
          room.featured_image.sizes.medium
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.room-navigation {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
}

.room-navigation__link {
  position: absolute;
  border-radius: 50%;
  border: 0.2rem solid white;
  width: 1rem;
  height: 1rem;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%) scale(1);
  transition: transform $transition-cubic-bezier, background-color 0.2s ease;
  box-shadow: $button-shadow;

  &:after {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: '';
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }

  svg {
    opacity: 0;
    width: 0.6rem;
    height: 0.6rem;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translate(-50%, -50%) scale(2);
    background-color: white;

    svg {
      opacity: 1;
    }
  }
}
</style>
