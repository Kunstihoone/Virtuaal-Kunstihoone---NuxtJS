<template>
  <room-wrapper :data="data" />
</template>

<script>
import RoomWrapper from '~/components/RoomWrapper'

export default {
  components: {
    RoomWrapper
  },
  async asyncData({ $axios, params, store }) {
    if (
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
    }

    const data = await store.getters.getSingleRoom(params.child)
    console.log(data)
    return { data }
  },
  head() {
    return this.metaData(this.data)
  }
}
</script>
