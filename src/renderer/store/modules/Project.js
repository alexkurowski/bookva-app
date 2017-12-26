const state = {
  project: {},
  files: [],
}

const mutations = {
  newProject (state) {
    state.files = [{
      title: '',
      content: ''
    }]
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
