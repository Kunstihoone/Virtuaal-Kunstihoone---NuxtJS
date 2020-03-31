<template>
  <exhibitions-slider :exhibitions="data" />
</template>

<script>
import ExhibitionsSlider from '~/components/ExhibitionsSlider'

export default {
  components: {
    ExhibitionsSlider
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

<style lang="scss" scoped></style>
