<template>
  <div class="language-switch">
    <nuxt-link
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
      class="button"
      >{{ locale.name }}</nuxt-link
    >
  </div>
</template>

<script>
export default {
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    }
  }
}
</script>

<style lang="scss" scoped>
.language-switch {
  position: fixed;
  top: 1rem;
  left: 1rem;
  display: flex;

  .button {
    margin-right: 0.3rem;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    border-radius: 50%;
    padding: 0;
  }
}
</style>
