<template>
  <div class="application-intro">
    <a
      :href="
        `https://kunstihoone.ee/${$i18n.locale === 'evk' ? 'et' : $i18n.locale}`
      "
      class="application-intro__logo"
      target="_blank"
    >
      <svg-icon name="kh-logo" />
    </a>

    <div class="application-intro__text" v-html="data.content" />
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.application-intro {
  max-width: rem-calc(600);
  margin: 0 auto;
}

.application-intro__logo {
  width: 100%;
  display: block;
  margin-bottom: 2rem;
  margin-top: 2rem;

  svg {
    width: 100%;
    height: auto;
  }
}

.application-intro__text {
  @include font-size(h4);

  margin-bottom: 2rem;
  column-count: 2;
  column-gap: 1rem;
}
</style>
