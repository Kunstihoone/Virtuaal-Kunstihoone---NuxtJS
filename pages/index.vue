<template>
  <div class="splash">
    <svg-icon name="kh-logo" />
    <nuxt-link class="button-intro" to="fuajee">Sisene</nuxt-link>
  </div>
</template>

<style lang="scss" scoped>
.splash {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  svg {
    width: 24rem;
    height: 4rem;
    margin-bottom: 1rem;
  }
}

.button-intro {
  background-color: $white;
  padding: 0.4rem 0.8rem;
  color: $black;
  border-radius: 10px;
  box-shadow: $button-shadow;
}
</style>
