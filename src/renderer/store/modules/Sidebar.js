const state = {
  sidebarOpen: false,
  sidebarPage: 'FileTree',
  sidebarPages: [ 'FileTree', 'ProjectManager', 'ThemeSelector' ]
}

const mutations = {
  sidebarToggle (state, open) {
    if (typeof open == 'boolean')
      state.sidebarOpen = open
    else
      state.sidebarOpen = !state.sidebarOpen
  },

  sidebarSetPage (state, value) {
    if (state.sidebarPages.includes(value))
      state.sidebarPage = value
    else
      throw `Unknown sidebar page: ${ value }`
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
