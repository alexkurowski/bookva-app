import Vue from 'vue'

const state = {
  project: {},
  files: {},
  folders: {},
}

const generateId = function () {
  return Math.random().toString(36).substr(2)
}

const newFile = function (params) {
  params = params || {}
  return {
    id: generateId(),
    title: params.title || '',
    content: '',
    folder: params.folder || null,
    order: params.order || 0,
  }
}

const newFolder = function (params) {
  params = params || {}
  return {
    id: generateId(),
    title: params.title || '',
    order: params.order || 0,
    isFolder: true,
  }
}

const mutations = {
  newProject (state) {
    state.files = {}
    state.folders = {}

    mutations.addFile(state)
    mutations.addFolder(state) // TODO: remove this
  },

  addFile (state, params) {
    let file = newFile(params)
    state.files = {
      ...state.files,
      [file.id]: file
    }
  },

  addFolder (state, params) {
    let folder = newFolder(params)
    state.folders = {
      ...state.folders,
      [folder.id]: folder
    }
  },
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
