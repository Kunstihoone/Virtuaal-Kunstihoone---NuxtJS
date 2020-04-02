import Vue from 'vue'

export const state = () => ({
  audioGuideState: false,
  audioPlayerState: false,
  navigationButtons: null,
  currentExhibition: undefined,
  detailsLayer: false,
  exhibitions: null,
  userReady: false,
  roomsData: null,
  siteData: null,
  splashState: true,
  placeholderImage: null,
  placeholderVisible: false,
  fullscreen: false,
  muted: false,
  mutedRoomAudio: false
})

export const mutations = {
  SetDetailsLayer(state, value) {
    Vue.set(state, 'detailsLayer', value)
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
  },
  SetFullscreen(state, value) {
    Vue.set(state, 'fullscreen', value)
  },
  SetMute(state, value) {
    Vue.set(state, 'muted', value)
  },
  SetMutedRoomAudio(state, value) {
    Vue.set(state, 'mutedRoomAudio', value)
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { app }) {
    const lang = app.i18n.locale === 'evk' ? 'et' : app.i18n.locale

    const siteData = await app.$axios.get('site-data', {
      params: {
        include_menus: true,
        include_taxonomies: true,
        lang
      }
    })
    commit('SetSiteData', siteData.data)

    const queryParams = {
      acf: true,
      sort_order: 'DESC',
      sort_column: 'post_date',
      lang
    }

    const exhibitions = await app.$axios.$get('post-types/exhibitions', {
      params: queryParams
    })

    commit('SetExhibitions', exhibitions)
  },

  async getSiteData({ commit }, locale) {
    const lang = locale === 'evk' ? 'et' : locale

    const siteData = await this.$axios.get('site-data', {
      params: {
        include_menus: true,
        include_taxonomies: true,
        lang
      }
    })

    commit('SetSiteData', siteData.data)

    const queryParams = {
      acf: true,
      sort_order: 'DESC',
      sort_column: 'post_date',
      lang
    }

    const exhibitions = await this.$axios.$get('post-types/exhibitions', {
      params: queryParams
    })

    commit('SetExhibitions', exhibitions)
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
