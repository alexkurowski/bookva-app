const state = {
  shown: false,
  position: {
    x: 0,
    y: 0
  },
  items: [],
  shownAt: 0,
}

const mutations = {
  contextMenuShow (state) {
    state.shown = true
    state.shownAt = Date.now()
  },

  contextMenuHide (state) {
    state.shown = false
  },

  contextMenuSetPosition (state, params) {
    state.position = {
      x: params.x,
      y: params.y
    }
  },

  contextMenuSetItems (state, items) {
    state.items = items
  }
}

const actions = {
  contextMenuShow (context, params) {
    context.commit('contextMenuSetPosition', params.position)
    context.commit('contextMenuSetItems', params.items)
    context.commit('contextMenuShow')
  }
}

export default {
  state,
  mutations,
  actions
}
