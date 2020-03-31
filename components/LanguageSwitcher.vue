<template>
  <nav :class="{ 'm-menu-active': toggleLanguages }" class="language-switch">
    <toggle-settings
      @click.native="toggleLanguages = !toggleLanguages"
      :toggle-state="toggleLanguages"
      class="language-switch__toggle"
    />

    <div class="language-switch__locales">
      <nuxt-link
        v-for="locale in $i18n.locales"
        :key="locale.code"
        :to="switchLocalePath(locale.code)"
        class="language-switch__link button"
        >{{ locale.full_name }}</nuxt-link
      >
    </div>
  </nav>
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
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  z-index: 20;
}

.language-switch__locales {
  display: flex;
  align-items: center;
}

.language-switch__toggle,
.language-switch__link {
  margin-right: 0.5rem;
}

.language-switch__link {
  display: inline-flex;
  opacity: 0;
  transform: translateX(-1rem);
  pointer-events: none;
  transition: 0.2s ease;

  @for $i from 1 through 4 {
    &:nth-child(#{$i}) {
      transition-delay: #{-0.1 + (0.1 * $i)}s;
    }
  }

  .m-menu-active & {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(0);
  }

  &.nuxt-link-active {
    background-color: $gray;
    box-shadow: 0px 2px 10px rgba(84, 84, 84, 0);
  }
}

.language-switch.m-menu-active .language-switch__link {
  @for $i from 1 through 4 {
    &:nth-child(#{$i}) {
      // transition-delay: #{-2 + (2 * $i)}s;
    }
  }
}
</style>
