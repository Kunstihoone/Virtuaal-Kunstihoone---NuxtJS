<template>
  <div class="splash">
    <button
      @click="handleClick"
      tabindex="1"
      :class="{ 'm-ready': buttonReady }"
      class="button"
    >
      Jätka
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttonReady: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.buttonReady = true
    }, 1000)
  },
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
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  z-index: 50;
  background-color: rgba(250, 250, 250, 0.8);
}

.splash__logo {
  width: 24rem;
  height: 4rem;
  margin-bottom: 2rem;
}

.intro-button {
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

  svg {
    opacity: 0;
    width: 0.6rem;
    height: 0.6rem;
    transition: opacity $transition-ease-in-out;
  }

  &.m-ready {
    transform: translate(-50%, -50%) scale(2);
    background-color: white;

    svg {
      opacity: 1;
    }
  }
}
</style>
