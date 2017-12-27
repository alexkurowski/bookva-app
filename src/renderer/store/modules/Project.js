const state = {
  project: {},
  files: [],
}

const newFile = function (params) {
  params = params || {}
  return {
    title: params.title || '',
    content: '',
    folder: params.folder || '',
    order: params.order || 0
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
