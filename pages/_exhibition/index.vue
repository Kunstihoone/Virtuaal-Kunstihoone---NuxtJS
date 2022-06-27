<template>
  <article class="single-exhibition">
    <h1>{{ data.attributes.title }}</h1>

    <nuxt-link
      :to="
        localePath({
          name: 'exhibition-parent',
          params: {
            exhibition: data.attributes.slug,
            parent: data.attributes.homeView.data.attributes.slug,
          },
        })
      "
    >
      Sisene
    </nuxt-link>
  </article>
</template>

<script>
import { fetchSingleExhibition } from '~/utils'

export default {
  async asyncData({ app, store, params }) {
    const locale = app.i18n.locale === 'evk' ? 'et' : app.i18n.locale

    store.commit('SetRoomsData', null)

    if (store.state.exhibitions) {
      const data = await store.getters.getSingleExhibition(params.exhibition)

      return {
        data,
      }
    } else {
      const data = fetchSingleExhibition({ params, locale })

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
