<template>
  <nav class="room-navigation">
    <template v-for="(button, index) in navigationButtons">
      <button
        v-if="button.related_item.is_detail"
        :style="{
          top: `${button.position.top}%`,
          left: `${button.position.left}%`
        }"
        @click="$store.commit('SetDetailsLayer', button.related_item.post_name)"
        :key="`nav-button-${index}`"
        class="room-navigation__link"
      >
        <svg-icon :name="button.icon" />
      </button>

      <a
        v-else-if="button.external_link"
        :style="{
          top: `${button.position.top}%`,
          left: `${button.position.left}%`
        }"
        :key="`nav-button-${index}`"
        :href="button.external_link.url"
        target="_blank"
        class="room-navigation__link"
      >
        <svg-icon name="icon-external-link" />
      </a>

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
  z-index: 5;
}

.room-navigation__link {
  position: absolute;
  border-radius: 50%;
  border-style: solid;
  border-color: white;
  border-width: 0.2rem;
  width: 1rem;
  height: 1rem;
  background: none;
  transform: translate(-50%, -50%) scale(1);
  transition: transform $transition-cubic-bezier, background-color 0.2s ease;
  box-shadow: $button-shadow;

  &:after {
    @include absolute-center;

    content: '';
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }

  svg {
    @include absolute-center;

    opacity: 0;
    width: 0.6rem;
    height: 0.6rem;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translate(-50%, -50%) scale(2);
    background-color: white;
    border-color: transparent;

    svg {
      opacity: 1;
    }
  }
}
</style>
