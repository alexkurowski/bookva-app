const state = {
  filesOpen: [],

  editorSizeRatio: 50,

  scheme:     'default',
  fontFamily: 'default',
  fontSize:   'default',
}

const mutations = {
  newProject (state) {
    state.filesOpen = []
  },

  openFile (state, fileId) {
    state.filesOpen = [ fileId ]
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
