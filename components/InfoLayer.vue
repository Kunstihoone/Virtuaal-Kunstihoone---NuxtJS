<template>
  <div v-if="exhibitionData" class="exhibition-impressum">
    <div>
      <header class="exhibition-impressum__header">
        <exhibition-item-dates
          :starting-date-time="exhibitionData.startsAt"
          :ending-date-time="exhibitionData.endsAt"
        />

        <h2 v-if="exhibitionData.localizations[$i18n.locale]?.title">
          {{ exhibitionData.localizations[$i18n.locale].title }}
        </h2>
      </header>
    </div>

    <div
      v-if="exhibitionData.localizations[$i18n.locale]?.impressum"
      v-html="$md.render(exhibitionData.localizations[$i18n.locale].impressum)"
    />

    <!-- <footer
      v-if="exhibitionData.acf && exhibitionData.acf.supporters"
      class="exhibition-impressum__supporters"
    >
      <p>{{ $t('supporters') }}:</p>

      <div class="supporters-list">
        <figure
          v-for="(supporter, index) in exhibitionData.acf.supporters"
          :key="index"
          class="supporters-list__logo"
        >
          <template v-if="supporter.supporter_url">
            <a :href="supporter.supporter_url" target="_blank">
              <img :src="supporter.supporter_logo.url" alt="" />
            </a>
          </template>

          <template v-else>
            <img :src="supporter.supporter_logo.url" alt="" />
          </template>
        </figure>
      </div>
    </footer> -->
  </div>
</template>

<script>
import ExhibitionItemDates from '~/components/ExhibitionItemDates'

export default {
  components: {
    ExhibitionItemDates,
  },
  created() {
    this.exhibitionData = this.$store.getters.getSingleExhibition(
      this.$route.params.exhibition,
    )
    console.log(this.exhibitionData.localizations)
  },
}
</script>

<style lang="scss" scoped>
.exhibition-impressum {
  position: absolute;
  top: 100%;
  right: 0;
  width: rem-calc(400);
  height: rem-calc(400);
  box-shadow: $button-shadow;
  border-radius: $layers-border-radius;
  overflow: hidden;
  background-color: $white;
  padding: 1rem;
  margin-top: $menu-items-spacing-small;
  margin-bottom: $menu-items-spacing-small;
  overflow-y: scroll;

  @include breakpoint('large') {
    margin-top: $menu-items-spacing-medium;
    margin-bottom: $menu-items-spacing-medium;
  }

  ::v-deep p {
    line-height: $body-line-height;
  }
}

.exhibition-impressum__header {
  margin-bottom: 1rem;

  h2 {
    line-height: $heading-line-height;
  }

  h2,
  p {
    margin-bottom: 0;
  }
}

.exhibition-impressum__curators {
  display: flex;
  margin-bottom: 1rem;

  p {
    margin-bottom: 0;
  }
}

.supporters-list {
  @include row;

  align-items: center;
  justify-content: flex-start;
  background-color: $white;

  p {
    margin-bottom: 0;
  }
}

.supporters-list__logo {
  @include grid(1/3);
  @include gutter;

  margin-top: 0.5rem;

  @include breakpoint(medium) {
    @include grid(1/6);
  }
}
</style>
