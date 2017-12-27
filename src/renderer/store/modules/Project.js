const state = {
  project: {},
  files: [],
}

const newFile = function (title, folder) {
  return {
    title: title || '',
    content: '',
    folder: folder || ''
  }
}

const mutations = {
  newProject (state) {
    state.files = [ newFile() ]
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
