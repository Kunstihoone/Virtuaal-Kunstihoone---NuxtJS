<template>
  <nuxt-link
    :to="
      localePath({
        name: 'exhibition',
        params: {
          exhibition: data.acf.post_type_slug
        }
      })
    "
    :class="{
      'm-disabled': $i18n.locale === 'evk' && !item.acf.in_sign_language
    }"
    class="exhibition-item"
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
    ExhibitionItemDates
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.exhibition-item {
  width: 100%;
  margin-bottom: 2 * $gutters-small;
  text-align: center;
  font-size: inherit;
  color: $black;
  max-width: rem-calc(600);

  &.m-disabled {
    opacity: 0.6;
    pointer-events: none;
  }
}

.exhibition-item__thumbnail {
  margin: 0 auto;
  margin-bottom: $gutters-small;

  /deep/ img {
    object-fit: cover;
  }
}

.exhibition-item__content {
  padding: 0 $gutters-small;

  time {
    display: inline-block;
    margin-bottom: 0.4rem;
  }

  h2 {
    font-weight: bold;
    line-height: 1;
    margin-bottom: 0.4rem;
  }

  .m-disabled & {
    opacity: 0.6;
  }
}
</style>
