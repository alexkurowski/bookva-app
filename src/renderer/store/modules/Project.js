const state = {
  project: {},
  files: [],
}

const newFile = function (title, folder, order) {
  return {
    title: title || '',
    content: '',
    folder: folder || '',
    order: order || 0
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
