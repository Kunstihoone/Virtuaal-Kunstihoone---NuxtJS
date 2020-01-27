import Vue from 'vue'

export const state = () => ({
  activeModal: null
})

export const mutations = {
  SetActiveModal(state, value) {
    Vue.set(state, 'activeModal', value)
  }
}
