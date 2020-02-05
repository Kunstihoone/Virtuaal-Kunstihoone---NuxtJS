<template>
  <nuxt-link
    :to="buttonPath"
    :style="{
      top: `${buttonData.position.top}%`,
      left: `${buttonData.position.left}%`
    }"
    class="navigation-button"
  >
    <svg-icon :name="buttonData.icon" />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    buttonData: {
      type: Object,
      default: null
    }
  },
  computed: {
    buttonPath() {
      const slug = this.buttonData.related_item.post_name
      const parentSlug = this.buttonData.related_item.parent_slug

      if (parentSlug) {
        return {
          name: 'parent-child',
          params: {
            parent: parentSlug,
            child: slug
          }
        }
      } else {
        return {
          name: 'parent',
          params: {
            parent: slug
          }
        }
      }
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
