<template>
  <room-wrapper :data="data" />
</template>

<script>
import fetchApi from '~/utils/fetchApi'
import RoomWrapper from '~/components/RoomWrapper'

export default {
  components: {
    RoomWrapper,
  },
  async asyncData({ params, store }) {
    const data = await fetchApi({
      path: `post-types/${params.exhibition}/${params.parent}`,

      params: {
        acf: true,
      },
    })

    store.commit('SetCurrentExhibition', params.exhibition)
    store.commit('SetRoomsData', [data])

    return { data }
  },
  head() {
    return this.metaData(this.data)
  },
}
</script>
