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

    <details-button v-if="detailsImage" :details-image="detailsImage" />
  </nav>
</template>

<script>
import DetailsButton from '~/components/DetailsButton'
import LanguageSwitcher from '~/components/LanguageSwitcher'

export default {
  components: {
    DetailsButton,
    LanguageSwitcher
  },
  props: {
    currentRoom: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      detailsImage: null
    }
  },
  watch: {
    $route() {
      this.changeDetailsImage()
    }
  },
  mounted() {
    this.changeDetailsImage()
  },
  methods: {
    changeDetailsImage() {
      if (this.$route.params.parent || this.$route.params.child) {
        if (
          this.currentRoom &&
          this.currentRoom.acf &&
          this.currentRoom.acf.label
        ) {
          this.detailsImage = this.currentRoom.acf.label
        } else {
          this.detailsImage = null
        }
      }
    }
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
