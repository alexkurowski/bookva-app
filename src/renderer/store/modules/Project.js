const state = {
  project: {},
  files: [],
}

const mutations = {
  newProject (state) {
    state.files = [{
      title: '1',
      content: ''
    },{
      title: '2',
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
