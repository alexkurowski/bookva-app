import Config from '@/config/config'

const state = {
  modalShown: false,
  modalType: '',

  modalContentKey: '',
  modalStoreCommit: '',
  modalStoreDispatch: '',
  modalStoreParams: undefined,
}

const mutations = {
  modalShow (state) {
    state.modalShown = true
  },

  modalHide (state) {
    state.modalShown = false
  },

  modalSetType (state, value) {
    if (Config.modalTypes.includes(value)) {
      state.modalType  = value
    } else {
      throw `Unknown modal type: ${ value }`
    }
  },

  modalSetContent (state, value) {
    state.modalContentKey = value
  },

  modalSetCallback (state, params) {
    state.modalStoreCommit = params.commit
    state.modalStoreDispatch = params.dispatch
    state.modalStoreParams = params.params
  },
}

const actions = {
  modalShow (context, params) {
    context.commit('modalSetType', params.type)
    context.commit('modalSetContent', params.content)
    context.commit('modalSetCallback', {
      commit: params.commit || '',
      dispatch: params.dispatch || '',
      params: params.params || undefined
    })

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
