<template>
  <nav class="nav-settings">
    <div class="nav-settings__buttons">
      <toggle-settings
        @click.native="toggleLanguages = !toggleLanguages"
        :toggle-state="toggleLanguages"
        class="nav-settings__button"
      />

      <menu-button
        :link-path="localePath('index')"
        icon="icon-home"
        component-element="nuxt-link"
        class="nav-settings__button"
      />
    </div>

    <language-switcher :class="{ 'm-menu-active': toggleLanguages }" />
  </nav>
</template>

<script>
import ToggleSettings from '~/components/ToggleSettings'
import LanguageSwitcher from '~/components/LanguageSwitcher'
import MenuButton from '~/components/MenuButton'

export default {
  components: {
    ToggleSettings,
    LanguageSwitcher,
    MenuButton
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
.nav-settings {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  z-index: 20;
}

.nav-settings__buttons {
  margin-bottom: 0.5rem;
  display: flex;
}

.nav-settings__button {
  margin-right: 0.5rem;
}
</style>
