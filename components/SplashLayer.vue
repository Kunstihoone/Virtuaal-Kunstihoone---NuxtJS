<template>
  <div class="splash">
    <svg-icon name="kh-logo" />
    <p>Press space to pause</p>
    <button @click="handleClick" class="button">
      {{ $t('enter') }}
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$store.commit('SetSplashState', false)
      this.$store.commit('SetUserReady', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.splash {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  z-index: 5000;
  background-color: $bg-color;

  svg {
    width: 24rem;
    height: 4rem;
    margin-bottom: 0.7rem;
  }
}
</style>
