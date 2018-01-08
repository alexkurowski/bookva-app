import Config from '@/config/config'

const state = {
  modalShown: false,
  modalType: '',

  modalContentKey: '',
  modalStoreCallback: '',
  modalStoreCallbackArgs: [],
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
    state.modalStoreCallback = params.callback
    state.modalStoreCallbackArgs = params.args
  },
}

const actions = {
  modalShow (context, params) {
    console.log('INFO modalShow', params)
    context.commit('modalSetType', params.type)
    context.commit('modalSetContent', params.content)
    context.commit('modalSetCallback', {
      callback: params.callback || '',
      args: params.callbackArgs || undefined
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
