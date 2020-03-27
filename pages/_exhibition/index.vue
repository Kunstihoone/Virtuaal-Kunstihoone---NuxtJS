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
export default {
  layout: 'index-page',
  async asyncData({ store, params, $axios, app }) {
    if (store.state.exhibition) {
      const data = await store.getters.getSingleExhibition(params.exhibition)

      return {
        data
      }
    } else {
      const queryParams = {
        lang: app.i18n.locale,
        acf: true,
        sort_order: 'DESC',
        sort_column: 'post_date'
      }

      const data = await $axios.$get(`pages/${params.exhibition}`, {
        params: queryParams
      })

      return {
        data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.single-exhibition {
  margin-top: 100px;
}
</style>
