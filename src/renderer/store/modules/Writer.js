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
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
