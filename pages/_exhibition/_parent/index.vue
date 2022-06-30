<template>
  <room-wrapper :data="data" />
</template>

<script>
import RoomWrapper from '~/components/RoomWrapper'
import { fetchExhibitions, fetchSingleView, fetchSiteData } from '~/utils'

export default {
  components: {
    RoomWrapper,
  },
  async asyncData({ params, store, app }) {
    if (!store.state.siteData) {
      const siteData = await fetchSiteData()
      store.commit('SetSiteData', siteData)
    }

    if (!store.state.exhibitions) {
      const exhibitions = await fetchExhibitions()
      store.commit('SetExhibitions', exhibitions)
    }

    const currentView = await fetchSingleView({
      slug: params.parent,
    })

    store.commit('SetCurrentExhibition', params.exhibition)
    store.commit('SetRoomsData', currentView.data)
    return { data: currentView.data }
  },
  head() {
    return this.metaData(this.data)
  },
}
</script>
