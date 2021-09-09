<template>
  <div v-if="exhibitionData" class="exhibition-impressum">
    <div>
      <header class="exhibition-impressum__header">
        <exhibition-item-dates
          :starting-date-time="exhibitionData.acf.duration.starting_time"
          :ending-date-time="exhibitionData.acf.duration.ending_time"
        />

        <h2>{{ exhibitionData.title }}</h2>

        <p v-if="exhibitionData.acf.sub_title">
          {{ exhibitionData.acf.sub_title }}
        </p>
      </header>

      <template v-if="exhibitionData.acf">
        <div
          v-if="exhibitionData.acf.artists"
          class="exhibition-impressum__artists"
          v-html="exhibitionData.acf.artists"
        />

        <div
          v-if="exhibitionData.acf.curators"
          class="exhibition-impressum__curators"
        >
          <p>
            {{
              exhibitionData.acf.curators.length > 1
                ? $t('curators')
                : $t('curator')
            }}:&nbsp;
          </p>

          <p
            v-for="(curator, index) in exhibitionData.acf.curators"
            :key="index"
          >
            {{ curator.curator_name }}
          </p>
        </div>

        <div
          v-if="exhibitionData.acf.team"
          class="exhibition-impressum__team"
          v-html="exhibitionData.acf.team"
        />
      </template>
    </div>

    <footer
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
    </footer>
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
