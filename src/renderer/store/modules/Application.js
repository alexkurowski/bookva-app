import { remote, shell } from 'electron'

const state = {
  ioIndicatorShown: false,
  paneCloseHoverIndex: -1,
  findBarShown: false,
}

const mutations = {
  applicationSetIOIndicator (state, value) {
    state.ioIndicatorShown = value
  },

  applicationSetPaneCloseHoverIndex (state, value) {
    state.paneCloseHoverIndex = value
  },

  applicationShowFindBar (state) {
    state.findBarShown = true
    findBarFocus()
  },

  applicationHideFindBar (state) {
    findBarOnHide()
    state.findBarShown = false
  },
}

const actions = {
  applicationShowIOIndicator (context) {
    context.commit('applicationSetIOIndicator', true)
    setTimeout(() => {
      context.commit('applicationSetIOIndicator', false)
    }, 1000)
  },

  applicationOpenLink (context, link) {
    shell.openExternal(link)
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
