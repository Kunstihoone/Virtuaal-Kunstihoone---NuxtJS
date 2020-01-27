<template>
  <nuxt-link :to="linkTo" :style="position" class="navigation-button">
    <button-content :icon="icon" />
  </nuxt-link>
</template>

<script>
import ButtonContent from '~/components/ButtonContent'

export default {
  components: {
    ButtonContent
  },
  props: {
    linkTo: {
      type: [Object, String],
      default: null
    },
    position: {
      type: Object,
      default: null
    },
    icon: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.navigation-button {
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
  opacity: 0;

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
