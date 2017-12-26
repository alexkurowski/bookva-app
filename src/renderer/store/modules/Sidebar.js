const state = {
  sidebarOpen: false,
  sidebarPage: 'FileTree',
  sidebarPages: [ 'FileTree', 'ThemeSelector' ]
}

const mutations = {
  toggleSidebar (state, open) {
    if (typeof open == 'boolean')
      state.sidebarOpen = open
    else
      state.sidebarOpen = !state.sidebarOpen
  },

  setSidebarPage (state, value) {
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
