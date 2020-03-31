import Vue from 'vue'

export const state = () => ({
  audioGuideState: false,
  audioPlayerState: false,
  navigationButtons: null,
  currentExhibition: undefined,
  detailsLayerState: false,
  exhibitions: null,
  userReady: false,
  roomsData: null,
  siteData: null,
  splashState: true,
  placeholderImage: null,
  placeholderVisible: true
})

export const mutations = {
  SetDetailsLayerState(state, value) {
    Vue.set(state, 'detailsLayerState', value)
  },
  SetAudioPlayerState(state, value) {
    Vue.set(state, 'audioPlayerState', value)
  },
  SetNavigationButtons(state, value) {
    Vue.set(state, 'navigationButtons', value)
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
  },
  SetPlaceholderVisible(state, value) {
    Vue.set(state, 'placeholderVisible', value)
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
