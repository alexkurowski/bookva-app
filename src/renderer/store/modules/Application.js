import { remote } from 'electron'

const state = {
  ioIndicatorShown: false
}

const mutations = {
  applicationSetIOIndicator (state, value) {
    state.ioIndicatorShown = value
  }
}

const actions = {
  applicationShowIOIndicator (context) {
    context.commit('applicationSetIOIndicator', true)
    setTimeout(() => {
      context.commit('applicationSetIOIndicator', false)
    }, 1000)
  },

  applicationQuit (context) {
    context.commit('projectSyncProject')
    setTimeout(() => {
      remote.app.quit()
    }, 1000)
  }
}

export default {
  state,
  mutations,
  actions
}
