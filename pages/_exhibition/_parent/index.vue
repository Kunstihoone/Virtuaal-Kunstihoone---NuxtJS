<template>
  <room-wrapper :data="data" />
</template>

<script>
import RoomWrapper from '~/components/RoomWrapper'

export default {
  components: {
    RoomWrapper
  },
  async asyncData({ $axios, params, store, route }) {
    if (
      !store.state.roomsData ||
      store.state.currentExhibition !== params.exhibition
    ) {
      const siteData = await $axios.get(`post-types/${params.exhibition}`, {
        params: {
          acf: true
        }
      })
      store.commit('SetCurrentExhibition', params.exhibition)
      store.commit('SetRoomsData', siteData.data)
    }

    const data = await store.getters.getSingleRoom(route.params.parent)

    return { data }
  },
  head() {
    return this.metaData(this.data)
  }
}
</script>
