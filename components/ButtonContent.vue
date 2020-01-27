<template>
  <svg-icon :name="icons[icon]" />
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      icons: {
        up: 'icon-arrow-up',
        right: 'icon-arrow-right',
        down: 'icon-arrow-down',
        left: 'icon-arrow-left',
        close: 'icon-close',
        plus: 'icon-plus',
        audio: 'icon-audio'
      }
    }
  }
}
</script>
