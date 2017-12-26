const state = {
  filesOpen: [],
  sidebarOpen: false,

  editorSizeRatio: 50,

  scheme:     'default',
  fontFamily: 'default',
  fontSize:   'default',
}

const mutations = {
  newProject (state) {
    state.filesOpen = [0]
  },

  toggleSidebar (state, open) {
    if (typeof open == 'boolean')
      state.sidebarOpen = open
    else
      state.sidebarOpen = !state.sidebarOpen
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
