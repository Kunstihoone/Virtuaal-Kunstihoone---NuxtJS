<template>
  <room-wrapper :data="data" />
</template>

<script>
import RoomWrapper from '~/components/RoomWrapper'
import fetchApi from '~/utils/fetchApi'

export default {
  components: {
    RoomWrapper,
  },
  async asyncData({ params, store }) {
    const data = await fetchApi({
      path: `post-types/${params.exhibition}/${params.child}`,
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
