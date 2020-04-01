<template>
  <div class="language-switch">
    <nuxt-link
      v-for="locale in $i18n.locales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
      class="language-switch__link button"
      >{{ locale.full_name }}</nuxt-link
    >
  </div>
</template>

<script>
import ToggleSettings from '~/components/ToggleSettings'

export default {
  components: {
    ToggleSettings
  },
  data() {
    return {
      toggleLanguages: false
    }
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    }
  },
  watch: {
    $route() {
      this.toggleLanguages = false
    }
  }
}
</script>

<style lang="scss" scoped>
.language-switch {
  display: flex;
  flex-direction: column;
}

.language-switch__link {
  display: inline-flex;
  opacity: 0;
  transform: translateY(-1rem);
  pointer-events: none;
  transition: 0.2s ease;
  margin-bottom: 0.5rem;

  @for $i from 1 through 4 {
    &:nth-child(#{$i}) {
      transition-delay: #{-0.1 + (0.1 * $i)}s;
    }
  }

  .m-menu-active & {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  &.nuxt-link-active {
    background-color: $gray;
    box-shadow: 0px 2px 10px rgba(84, 84, 84, 0);
  }
}
</style>
