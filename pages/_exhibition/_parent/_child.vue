<template>
  <room-wrapper :data="data" />
</template>

<script>
import RoomWrapper from '~/components/RoomWrapper'
import fetchApi from '~/utils/fetchApi'

export default {
  components: {
    RoomWrapper
  },
  async asyncData({ params, store, isStatic, app }) {
    if (!process.browser && process.env.NODE_ENV !== 'development') {
      const data = await fetchApi({
        path: `post-types/${params.exhibition}/${params.child}`,
        params: {
          acf: true
        }
      })

      store.commit('SetCurrentExhibition', params.exhibition)
      store.commit('SetRoomsData', [data])

      return { data }
    } else if (
      !store.state.roomsData ||
      store.state.currentExhibition !== params.exhibition
    ) {
      const getRooms = await fetchApi({
        path: `post-types/${params.exhibition}`,
        params: {
          acf: true,
          'tax_query[0][taxonomy]': 'type',
          'tax_query[0][terms]': 'details-overlay',
          'tax_query[0][field]': 'slug',
          'tax_query[0][operator]': 'NOT IN'
        }
      })

      store.commit('SetCurrentExhibition', params.exhibition)
      store.commit('SetRoomsData', getRooms)

      const lang = app.i18n.locale === 'evk' ? 'et' : app.i18n.locale
      if (!store.state.siteData) {
        const siteData = await fetchApi({
          path: 'site-data',
          params: {
            lang
          }
        })
        store.commit('SetSiteData', siteData)
      }

      if (!store.state.exhibitions) {
        const queryParams = {
          acf: true,
          sort_order: 'DESC',
          sort_column: 'post_date',
          lang
        }

        const exhibitions = await fetchApi({
          path: 'post-types/exhibitions',
          params: queryParams
        })

        store.commit('SetExhibitions', exhibitions)
      }

      const data = getRooms.find((event) => {
        return decodeURIComponent(event.slug) === params.child
      })

      return { data }
    } else {
      const data = await store.getters.getSingleRoom(params.child)
      return { data }
    }
  },
  head() {
    return this.metaData(this.data)
  }
}
</script>
