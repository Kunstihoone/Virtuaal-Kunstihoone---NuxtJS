<template>
  <room-wrapper :data="data" />
</template>

<script>
import RoomWrapper from '~/components/RoomWrapper'

export default {
  components: {
    RoomWrapper
  },
  async asyncData({ $axios, params, store, route, isStatic }) {
    if (isStatic) {
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
