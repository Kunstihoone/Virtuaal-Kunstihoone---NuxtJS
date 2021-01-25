<template>
  <article class="single-exhibition">
    <h1>{{ data.title }}</h1>

    <nuxt-link
      :to="
        localePath({
          name: 'exhibition-parent',
          params: {
            exhibition: data.acf.post_type_slug,
            parent: 'fuajee',
          },
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
  async asyncData({ store, params }) {
    if (store.state.exhibitions) {
      const data = await store.getters.getSingleExhibition(params.exhibition)

      return {
        data,
      }
    } else {
      const data = await fetchApi({
        path: `post-types/exhibitions/${params.exhibition}`,
        params: {
          acf: true,
        },
      })

      return {
        data,
      }
    }
  },
  head() {
    return this.metaData(this.data)
  },
}
</script>

<style lang="scss" scoped>
.single-exhibition {
  margin-top: 100px;
}
</style>
