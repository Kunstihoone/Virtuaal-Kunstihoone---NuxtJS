import Vue from 'vue'

export const state = () => ({
  detailsButton: null,
  modalData: null,
  audioGuideState: false,
  audioGuideTrack: undefined,
  audioGuideTitle: undefined,
  audioPlayerState: false,
  exhibitions: null,
  currentExhibition: undefined,
  userReady: false,
  roomsData: null,
  siteData: null,
  splashState: true,
  placeholderImage: null
})

export const mutations = {
  SetDetailsButton(state, value) {
    Vue.set(state, 'detailsButton', value)
  },
  SetModalData(state, value) {
    Vue.set(state, 'modalData', value)
  },
  SetAudioGuideTrack(state, value) {
    Vue.set(state, 'audioGuideTrack', value)
  },
  SetAudioGuideTitle(state, value) {
    Vue.set(state, 'audioGuideTitle', value)
  },
  SetAudioPlayerState(state, value) {
    Vue.set(state, 'audioPlayerState', value)
  },
  SetSiteData(state, value) {
    Vue.set(state, 'siteData', value)
  },
  SetUserReady(state, value) {
    Vue.set(state, 'userReady', value)
  },
  SetRoomsData(state, value) {
    Vue.set(state, 'roomsData', value)
  },
  SetExhibitions(state, value) {
    Vue.set(state, 'exhibitions', value)
  },
  SetCurrentExhibition(state, value) {
    Vue.set(state, 'currentExhibition', value)
  },
  SetAudiGuideState(state, value) {
    Vue.set(state, 'audioGuideState', value)
  },
  SetSplashState(state, value) {
    Vue.set(state, 'splashState', value)
  },
  SetPlaceholderImage(state, value) {
    Vue.set(state, 'placeholderImage', value)
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { app }) {
    const siteData = await app.$axios.get('site-data', {
      params: {
        include_menus: true,
        include_taxonomies: true,
        lang: app.i18n.locale
      }
    })
    commit('SetSiteData', siteData.data)
  },

  async getSiteData({ commit }, lang) {
    const siteData = await this.$axios.get('site-data', {
      params: {
        include_menus: true,
        include_taxonomies: true,
        lang
      }
    })

    commit('SetSiteData', siteData.data)
  }
}

export const getters = {
  getSingleRoom: (state) => (slug) => {
    return state.roomsData.find(
      (event) => decodeURIComponent(event.slug) === slug
    )
  },
  getExhibitions: (state) => {
    return state.exhibitions
  },
  getSingleExhibition: (state) => (slug) => {
    return state.exhibitions.find(
      (exhibition) => decodeURIComponent(exhibition.acf.post_type_slug) === slug
    )
  }
}
