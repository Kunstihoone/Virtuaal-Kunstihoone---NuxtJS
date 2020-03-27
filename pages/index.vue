<template>
  <div class="exhibitions">
    <exhibition-item
      v-for="exhibition in data"
      :key="exhibition.id"
      :data="exhibition"
    />
  </div>
</template>

<script>
import ExhibitionItem from '~/components/ExhibitionItem'

export default {
  components: {
    ExhibitionItem
  },
  layout: 'index-page',
  async asyncData({ store, $axios, app }) {
    const queryParams = {
      lang: app.i18n.locale,
      acf: true,
      sort_order: 'DESC',
      sort_column: 'post_date'
    }

    const data = await $axios.$get('pages', {
      params: queryParams
    })

    store.commit('SetExhibitions', data)

    return {
      data
    }
  },
  head() {
    return this.metaData()
  }
}
</script>

<style lang="scss" scoped>
.exhibitions {
  @include row;

  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: rem-calc(100);
}
</style>
