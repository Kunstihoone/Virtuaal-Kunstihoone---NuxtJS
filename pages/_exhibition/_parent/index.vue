<template>
  <room-wrapper :data="data" />
</template>

<script>
import fetchApi from '~/utils/fetchApi'
import RoomWrapper from '~/components/RoomWrapper'
import { fetchExhibitions, fetchSiteData } from '~/utils'

export default {
  components: {
    RoomWrapper,
  },
  async asyncData({ params, store, app }) {
    const lang = app.i18n.locale === 'evk' ? 'et' : app.i18n.locale
    if (!store.state.siteData) {
      const siteData = await fetchSiteData()
      store.commit('SetSiteData', siteData)
    }

    if (!store.state.exhibitions) {
      const exhibitions = await fetchExhibitions({ locale: lang })
      store.commit('SetExhibitions', exhibitions)
    }

    const data = await fetchApi({
      path: `post-types/${params.exhibition}/${params.parent}`,

      params: {
        acf: true,
      },
    })

    store.commit('SetCurrentExhibition', params.exhibition)
    store.commit('SetRoomsData', data)

    return { data }
  },
  head() {
    return this.metaData(this.data)
  },
}
</script>
