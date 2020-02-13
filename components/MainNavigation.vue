<template>
  <nav class="main-navigation">
    <button
      @click="$store.commit('SetSplashState', true)"
      class="main-navigation__info button"
    >
      Info
    </button>

    <language-switcher />

    <details-button v-if="detailsButton" :details-image="detailsButton" />
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import DetailsButton from '~/components/DetailsButton'
import LanguageSwitcher from '~/components/LanguageSwitcher'

export default {
  components: {
    DetailsButton,
    LanguageSwitcher
  },
  computed: {
    ...mapState({
      detailsButton: (state) => state.detailsButton
    })
  }
}
</script>

<style lang="scss" scoped>
.main-navigation {
  position: fixed;
  z-index: 60;
  opacity: 1;
  transition: 0.3s ease;

  .modal-active & {
    opacity: 0;
  }
}

.main-navigation__info {
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  z-index: 40;
}
</style>
