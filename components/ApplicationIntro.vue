<template>
  <div class="application-intro">
    <a
      :href="`https://kunstihoone.ee/${
        $i18n.locale === 'evk' ? 'et' : $i18n.locale
      }`"
      class="application-intro__logo"
      target="_blank"
    >
      <img src="~assets/kh-logo.svg" name="kh-logo" />
    </a>

    <div
      v-if="data.content"
      class="application-intro__text"
      v-html="data.content"
    />
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped>
.application-intro {
  @include row;

  // max-width: rem-calc(600);
  margin: 0 auto;
  margin-bottom: 1rem;
  justify-content: center;

  @include breakpoint('large') {
    max-width: 60%;
  }
}

.application-intro__logo {
  @include gutter;

  width: 100%;
  display: block;
  margin-top: 4.4rem;
  margin-bottom: 2rem;

  @include breakpoint('large') {
    margin-top: 2rem;
  }

  img {
    display: block;
    opacity: 1;
    width: 60%;
    height: auto;
    transition: opacity $transition-ease-in-out;
    margin: 0 auto;

    @include breakpoint('large') {
      width: 100%;
    }
  }

  &:hover {
    img {
      opacity: 0.8;
    }
  }
}

.application-intro__text {
  @include font-size(h3);
  @include grid(1);

  margin-bottom: 4rem;
  text-align: center;

  @include breakpoint('large') {
    @include grid(10/12);
  }

  ::v-deep:last-child {
    margin-bottom: 0;
  }
}

.application-intro__author {
  @include font-size(h6);

  break-inside: avoid;
  display: flex;
  flex-direction: column;
  // width: 50%;
  margin-bottom: 0.4rem;
}
</style>
