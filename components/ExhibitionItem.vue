<template>
  <nuxt-link
    v-if="data.entry_room.post_name"
    :to="
      localePath({
        name: 'exhibition-parent',
        params: {
          exhibition: data.entry_room.post_type,
          parent: data.entry_room.post_name,
        },
      })
    "
    :class="{
      'm-disabled': $i18n.locale === 'evk' && !data.acf.in_sign_language,
    }"
    class="exhibition-item"
    @click.native="enterExhibition"
  >
    <responsive-image-ratio
      v-if="data.featured_image"
      :image-data="data.featured_image"
      class="exhibition-item__thumbnail"
    />

    <div class="exhibition-item__content">
      <exhibition-item-dates
        :starting-date-time="data.acf.duration.starting_time"
        :ending-date-time="data.acf.duration.ending_time"
      />

      <h2>{{ data.title }}</h2>

      <p v-if="data.acf.subtitle">{{ data.acf.subtitle }}</p>
    </div>
  </nuxt-link>
</template>

<script>
import ExhibitionItemDates from '~/components/ExhibitionItemDates'

export default {
  components: {
    ExhibitionItemDates,
  },
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  methods: {
    enterExhibition() {
      this.$store.commit('SetUserReady', true)
      this.$store.commit('SetSplashState', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.exhibition-item {
  @include gutter;

  position: relative;
  text-align: center;
  display: block;
  color: $black;
  margin: 0 auto;
  margin-bottom: 2rem;
  width: 100%;

  @include breakpoint('large') {
    max-width: 60%;
    margin-bottom: 3rem;
  }

  &.m-disabled {
    opacity: 0.6;
    pointer-events: none;
  }
}

.exhibition-item__thumbnail {
  margin-bottom: 0;
  margin-bottom: 0.6rem;
  background-color: $kh-yellow;

  ::v-deep img {
    object-fit: cover;
  }
}

.exhibition-item__content {
  top: 100%;
  width: 100%;
  padding: 0 $gutters-small;

  time {
    display: inline-block;
    margin-bottom: 0.4rem;
  }

  h2 {
    line-height: 1;
    margin-bottom: 0.4rem;
  }

  .m-disabled & {
    opacity: 0.6;
  }
}
</style>
