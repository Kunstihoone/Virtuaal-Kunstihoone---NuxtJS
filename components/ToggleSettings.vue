<template>
  <menu-button :icon="toggleState ? 'icon-close' : 'icon-settings'" />
</template>

<script>
import MenuButton from '~/components/MenuButton'

export default {
  components: {
    MenuButton
  },
  props: {
    toggleState: {
      type: Boolean,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .menu-button {
  margin-right: 0.3rem;
}
</style>
