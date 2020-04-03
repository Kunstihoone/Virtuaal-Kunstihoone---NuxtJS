<template>
  <div @click="enterExhibition" class="exhibition-item">
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
  </div>
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
  },
  methods: {
    enterExhibition() {
      this.$store.commit('SetUserReady', true)
      this.$store.commit('SetSplashState', false)
      this.$store.commit(
        'SetPlaceholderImage',
        this.data.featured_image.sizes.large
      )
      this.$store.commit('SetPlaceholderVisible', true)

      this.$router.push(
        this.localePath({
          name: 'exhibition-parent',
          params: {
            exhibition: this.data.acf.post_type_slug,
            parent: this.data.acf.entry_room.post_name
          }
        })
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.exhibition-item {
  position: relative;
  text-align: center;
  color: $black;
  max-width: rem-calc(600);
  margin: 0 auto;
  margin-bottom: 2rem;

  &.m-disabled {
    opacity: 0.6;
    pointer-events: none;
  }
}

.exhibition-item__thumbnail {
  margin-bottom: 0;
  margin-bottom: 0.6rem;

  /deep/ img {
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
