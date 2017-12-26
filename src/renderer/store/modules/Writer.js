const state = {
  filesOpen: [],
  sidebarOpen: false,

  editorSizeRatio: 50,
}

const mutations = {
  newProject (state) {
    state.filesOpen = [0]
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
