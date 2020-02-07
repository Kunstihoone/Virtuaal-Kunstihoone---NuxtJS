import Vue from 'vue'

export const state = () => ({
  activeModal: null,
  audioGuideTrack: undefined,
  roomsData: null,
  siteData: null
})

export const mutations = {
  SetActiveModal(state, value) {
    Vue.set(state, 'activeModal', value)
  },
  SetAudioGuideTrack(state, value) {
    Vue.set(state, 'audioGuideTrack', value)
  },
  SetSiteData(state, value) {
    Vue.set(state, 'siteData', value)
  },
  SetRoomsData(state, value) {
    Vue.set(state, 'roomsData', value)
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { app }) {
    const siteData = await app.$axios.get('site-data', {
      params: {
        include_menus: true,
        include_taxonomies: true
      }
    })
    commit('SetSiteData', siteData.data)

    const rooms = await app.$axios.$get(
      'post-types/virtual-exhibitions?acf=true'
    )
    commit('SetRoomsData', rooms)
  }
}

export const getters = {
  getSingleRoom: (state) => (slug) => {
    return state.roomsData.find(
      (event) => decodeURIComponent(event.slug) === slug
    )
  }
}
