<template>
  <nav class="main-navigation">
    <a
      class="main-navigation__info button"
      href="https://digigiid.ee/naituste-arhiiv/sona-mojutus"
      target="_blank"
    >
      {{ $t('digital_guide') }}
    </a>

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
  z-index: 60;
  opacity: 1;
  transition: 0.3s ease;

  .modal-active & {
    opacity: 0;
  }
}

.main-navigation__info {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 40;
}
</style>
