<template>
  <div class="portrait-notification">
    <h3>{{ $t('landscape_notification') }}</h3>
  </div>
</template>

<style lang="scss" scoped>
.portrait-notification {
  @include gutter;

  position: fixed;
  background-color: $white;
  width: 100%;
  height: 100%;
  z-index: 5000;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
}
</style>
