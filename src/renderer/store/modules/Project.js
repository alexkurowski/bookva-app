const state = {
  project: {},
  files: [],
  folders: [],
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
  },

  addFile (state, params) {
    state.files.push( newFile(params) )
  },

  addFolder (state, folderName) {
    if ( !state.folders.includes(folderName) )
      state.folders.push(folderName)
  },
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
