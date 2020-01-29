import Vue from 'vue'

export const state = () => ({
  activeModal: null,
  audioGuideTrack: undefined
})

export const mutations = {
  SetActiveModal(state, value) {
    Vue.set(state, 'activeModal', value)
  },
  SetAudioGuideTrack(state, value) {
    Vue.set(state, 'audioGuideTrack', value)
  }
}
