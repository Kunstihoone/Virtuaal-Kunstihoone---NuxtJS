<template>
  <div class="notification-modal">
    <button
      :aria-label="$t('close_notification')"
      class="notification-modal__close"
      @click="$emit('closeNotification')"
    >
      <svg-icon name="icon-close" />
    </button>

    <div class="notification-modal__content" v-html="notification" />
  </div>
</template>

<script>
export default {
  props: {
    notification: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped>
.notification-modal {
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: rem-calc(320);
  box-shadow: $button-shadow;
  background-color: $kh-yellow;
  border-radius: $layers-border-radius;
  padding: 1rem;
  margin-top: $menu-items-spacing-small;
  margin-bottom: $menu-items-spacing-small;

  @include breakpoint('large') {
    width: rem-calc(400);
    margin-top: $menu-items-spacing-medium;
    margin-bottom: $menu-items-spacing-medium;
  }
}

.notification-modal__close {
  position: absolute;
  top: 1rem;
  right: 1rem;

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }
}

.notification-modal__content {
  padding-right: 1.2rem;

  ::v-deep a {
    color: $black;
    text-decoration: underline;
  }

  ::v-deep:last-child {
    margin-bottom: 0;
  }
}
</style>
