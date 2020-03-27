<template>
  <div class="exhibitions">
    <div v-for="exhibition in data" :key="exhibition.id">
      <nuxt-link
        :to="
          localePath({
            name: 'exhibition',
            params: {
              exhibition: exhibition.acf.post_type_slug
            }
          })
        "
      >
        {{ exhibition.title }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'index-page',
  async asyncData({ store, $axios, app }) {
    const queryParams = {
      lang: app.i18n.locale,
      acf: ['subtitle', 'duration', 'post_type_slug']
    }

    const data = await $axios.$get('pages', {
      params: queryParams
    })

    store.commit('SetExhibitions', data)

    return {
      data
    }
  }
}
</script>

<style lang="scss" scoped>
.exhibitions {
  margin-top: rem-calc(100);
}
</style>
