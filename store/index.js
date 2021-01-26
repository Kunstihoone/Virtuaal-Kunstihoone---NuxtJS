import Vue from 'vue'
import fetchApi from '~/utils/fetchApi'

export const state = () => ({
  audioGuideState: false,
  audioPlayerState: false,
  currentExhibition: undefined,
  detailsLayer: false,
  detailsData: null,
  exhibitions: null,
  fullscreen: false,
  mutedRoomAudio: false,
  navigationButtons: null,
  placeholderImage: null,
  placeholderVisible: false,
  roomsData: null,
  siteData: null,
  splashState: true,
  userReady: false,
})

export const mutations = {
  SetAudiGuideState(state, value) {
    Vue.set(state, 'audioGuideState', value)
  },
  SetAudioPlayerState(state, value) {
    Vue.set(state, 'audioPlayerState', value)
  },
  SetCurrentExhibition(state, value) {
    Vue.set(state, 'currentExhibition', value)
  },
  SetDetailsLayer(state, value) {
    Vue.set(state, 'detailsLayer', value)
  },
  SetDetailsData(state, value) {
    Vue.set(state, 'detailsData', value)
  },
  SetExhibitions(state, value) {
    Vue.set(state, 'exhibitions', value)
  },
  SetFullscreen(state, value) {
    Vue.set(state, 'fullscreen', value)
  },
  SetMutedRoomAudio(state, value) {
    Vue.set(state, 'mutedRoomAudio', value)
  },
  SetNavigationButtons(state, value) {
    Vue.set(state, 'navigationButtons', value)
  },
  SetPlaceholderImage(state, value) {
    Vue.set(state, 'placeholderImage', value)
  },
  SetPlaceholderVisible(state, value) {
    Vue.set(state, 'placeholderVisible', value)
  },
  SetRoomsData(state, value) {
    Vue.set(state, 'roomsData', value)
  },
  SetSiteData(state, value) {
    Vue.set(state, 'siteData', value)
  },
  SetSplashState(state, value) {
    Vue.set(state, 'splashState', value)
  },

  SetUserReady(state, value) {
    Vue.set(state, 'userReady', value)
  },
}

export const actions = {
  async nuxtServerInit({ commit }, { app }) {
    const lang = app.i18n.locale === 'evk' ? 'et' : app.i18n.locale

    const siteData = await fetchApi({
      path: 'site-data',
      params: {
        lang,
      },
    })

    commit('SetSiteData', siteData)

    const exhibitions = await fetchApi({
      path: 'post-types/exhibitions',
      params: {
        acf: true,
        sort_order: 'ASC',
        sort_column: 'menu_order',
        lang,
      },
    })

    commit('SetExhibitions', exhibitions)
  },
}

export const getters = {
  getSingleRoom: (state) => (slug) => {
    return state.roomsData.find(
      (event) => decodeURIComponent(event.slug) === slug,
    )
  },
  getExhibitions: (state) => {
    return state.exhibitions
  },
  getSingleExhibition: (state) => (slug) => {
    return state.exhibitions.find(
      (exhibition) =>
        decodeURIComponent(exhibition.acf.entry_room.post_type) === slug,
    )
  },
}
