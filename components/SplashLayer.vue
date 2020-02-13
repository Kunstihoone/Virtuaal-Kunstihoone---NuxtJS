<template>
  <div class="splash">
    <svg-icon name="kh-logo" />
    <button @click="$store.commit('SetSplashState', false)" class="button">
      Sisene
    </button>
  </div>
</template>

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
    margin-bottom: 1rem;
  }
}
</style>
