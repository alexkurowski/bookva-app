import Config from '@/config/config'

const state = {
  modalShown: false,
  modalType: '',

  modalBody: '',
}

const mutations = {
  modalSet (state, value) {
    if (Config.modalTypes.includes(value)) {
      state.modalType  = value
    } else {
      throw `Unknown modal type: ${ value }`
    }
  },

  modalShow (state) {
    state.modalShown = true
  },

  modalHide (state) {
    state.modalShown = false
  },

  modalSetBody (state, value) {
    state.modalBody = value
  }
}

const actions = {
  modalShow (context, type) {
    context.commit('modalSet', type)
    setTimeout(() => {
      context.commit('modalShow')
    }, 0)
  }
}

export default {
  state,
  mutations,
  actions
}
