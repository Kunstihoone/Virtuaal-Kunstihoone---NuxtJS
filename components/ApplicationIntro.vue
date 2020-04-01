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

    <div class="application-intro__text">
      <p>
        Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh,
        ut fermentum massa justo sit amet risus. Aenean lacinia bibendum nulla
        sed consectetur. Etiam porta sem malesuada magna mollis euismod. Cras
        justo odio, dapibus ac facilisis in, egestas eget quam. Etiam porta sem
        malesuada magna mollis euismod.
      </p>
    </div>
  </div>
</template>

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
  @include font-size(h2);

  text-align: center;
  margin-bottom: 2rem;
}
</style>
