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

const getNextOrder = function (state) {
  let collection = [
    ...Object.values(state.files),
    ...Object.values(state.folders)
  ]

  if (Object.values(collection).length == 0) {
    return 0
  } else {
    return (
      Math.max(
        ...collection
          .map(entry => entry.order)
      ) + 1
    )
  }
}

const mutations = {
  newProject (state) {
    state.files   = {}
    state.folders = {}

    mutations.addFile(state)
    // TODO: below lies only debug data
    mutations.addFolder(state)
    mutations.addFile(state, { title: Math.random().toString(36).substr(2,4), folder: Object.keys(state.folders)[0] })
    mutations.addFile(state, { title: Math.random().toString(36).substr(2,4), folder: Object.keys(state.folders)[0] })
    mutations.addFile(state, { title: Math.random().toString(36).substr(2,4), folder: Object.keys(state.folders)[0] })
    mutations.addFile(state, { title: Math.random().toString(36).substr(2,4), folder: Object.keys(state.folders)[0] })
    mutations.addFile(state, { title: Math.random().toString(36).substr(2,4) })
    mutations.addFile(state, { title: Math.random().toString(36).substr(2,4) })
  },

  addFile (state, params) {
    params = params || {}
    params.order = getNextOrder(state)

    let file = newFile(params)
    state.files = {
      ...state.files,
      [file.id]: file
    }
  },

  addFolder (state, params) {
    params = params || {}
    params.order = getNextOrder(state)

    let folder = newFolder(params)
    state.folders = {
      ...state.folders,
      [folder.id]: folder
    }
  },

  updateFile (state, params) {
    let file = state.files[params.id]
    if (!file)
      throw "ERROR: trying to update a file that's not exists"
    state.files = {
      ...state.files,
      [params.id]: Object.assign(file, params)
    }
  },

  updateFolder (state, params) {
    let folder = state.folders[params.id]
    if (!folder)
      throw "ERROR: trying to update a folder that's not exists"
    state.folders = {
      ...state.folders,
      [params.id]: Object.assign(folder, params)
    }
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
