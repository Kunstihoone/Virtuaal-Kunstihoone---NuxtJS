<template>
  <article class="single-exhibition">
    <h1>{{ data.title }}</h1>

    <nuxt-link
      :to="
        localePath({
          name: 'exhibition-parent',
          params: {
            exhibition: data.acf.post_type_slug,
            parent: 'fuajee'
          }
        })
      "
    >
      Sisene
    </nuxt-link>
  </article>
</template>

<script>
import fetchApi from '~/utils/fetchApi'

export default {
  async asyncData({ store, params, app }) {
    if (store.state.exhibition) {
      const data = await store.getters.getSingleExhibition(params.exhibition)

      return {
        data
      }
    } else {
      const data = await fetchApi({
        path: `post-types/exhibitions/${params.exhibition}`,
        params: {
          lang: app.i18n.locale === 'evk' ? 'et' : app.i18n.locale,
          acf: true,
          sort_order: 'DESC',
          sort_column: 'post_date'
        }
      })

      return {
        data
      }
    }
  },
  head() {
    return this.metaData(this.data)
  }
}
</script>

<style lang="scss" scoped>
.single-exhibition {
  margin-top: 100px;
}
</style>
