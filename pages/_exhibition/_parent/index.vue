<template>
  <room-wrapper :data="data" />
</template>

<script>
import RoomWrapper from '~/components/RoomWrapper'

export default {
  components: {
    RoomWrapper
  },
  async asyncData({ $axios, params, store, route, isStatic, app }) {
    if (!process.browser && process.env.NODE_ENV !== 'development') {
      const data = await $axios.get(
        `post-types/${params.exhibition}/${params.parent}`,
        {
          params: {
            acf: true
          }
        }
      )

      store.commit('SetCurrentExhibition', params.exhibition)
      store.commit('SetRoomsData', [data.data])

      return { data: data.data }
    } else if (
      !store.state.roomsData ||
      store.state.currentExhibition !== params.exhibition
    ) {
      const getRooms = await $axios.get(`post-types/${params.exhibition}`, {
        params: {
          acf: true,
          'tax_query[0][taxonomy]': 'type',
          'tax_query[0][terms]': 'details-overlay',
          'tax_query[0][field]': 'slug',
          'tax_query[0][operator]': 'NOT IN'
        }
      })

      store.commit('SetCurrentExhibition', params.exhibition)
      store.commit('SetRoomsData', getRooms.data)

      const lang = app.i18n.locale === 'evk' ? 'et' : app.i18n.locale
      const lang = 'et'
      if (!store.state.siteData) {
        const siteData = await $axios.get('site-data', {
          params: {
            lang
          }
        })
        store.commit('SetSiteData', siteData.data)
      }

      if (!store.state.exhibitions) {
        const queryParams = {
          acf: true,
          sort_order: 'DESC',
          sort_column: 'post_date',
          lang
        }

        const exhibitions = await $axios.$get('post-types/exhibitions', {
          params: queryParams
        })

        store.commit('SetExhibitions', exhibitions)
      }

      const data = getRooms.data.find((event) => {
        return decodeURIComponent(event.slug) === params.parent
      })

      return { data }
    } else {
      const data = await store.getters.getSingleRoom(params.parent)
      return { data }
    }
  },
  head() {
    return this.metaData(this.data)
  }
}
</script>
