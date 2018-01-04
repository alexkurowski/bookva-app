import Vue from 'vue'

import { Writer } from '@/helpers/store_helper'

import { remote } from 'electron'
import path from 'path'
import fs from 'fs'

let saving  = false
let syncing = false

const state = {
  files: {},
  folders: {},

  filesOpen: [],
  foldersOpen: [],

  lastUpdate: 0,
  lastSync: 0
}

const userPath =

const syncDirectory = function () {
}

const syncPath = function () {
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
  projectSaveProject (state) {
  },

  projectLoadProject (state, filePath) {
  },

  projectSyncProject (state) {
    if ( syncing ) return
    if ( state.lastUpdate == state.lastSync ) return

    syncing = true
    state.lastSync = state.lastUpdate

    const fileDir =
      path.join(
        remote.app.getPath('userData'),
        'wrtr'
      )

    const filePath =
      path.join(
        fileDir,
        'project.json'
      )

    try {
      fs.mkdirSync(fileDir)
    } catch (err) {
      if (err.code != 'EEXIST')
        throw err
    }

    const data = JSON.stringify({
      filesOpen:  state.filesOpen,
      folderOpen: state.folderOpen,
      files:      state.files,
      folders:    state.folders,
    })

    fs.writeFile(filePath, data, (err) => {
      syncing = false

      if (err)
        throw err
    })
  },

  projectResyncProject (state) {
    fs.existsSync()
  },

  projectNewProject (state) {
    state.files   = {}
    state.folders = {}

    mutations.projectAddFile(state)

    // TODO: below is debug data
    mutations.projectAddFolder(state)
    mutations.projectAddFile(state, { title: Math.random().toString(36).substr(2,4), folder: Object.keys(state.folders)[0] })
    mutations.projectAddFile(state, { title: Math.random().toString(36).substr(2,4), folder: Object.keys(state.folders)[0] })
    mutations.projectAddFile(state, { title: Math.random().toString(36).substr(2,4), folder: Object.keys(state.folders)[0] })
    mutations.projectAddFile(state, { title: Math.random().toString(36).substr(2,4), folder: Object.keys(state.folders)[0] })
    mutations.projectAddFile(state, { title: Math.random().toString(36).substr(2,4) })
    mutations.projectAddFile(state, { title: Math.random().toString(36).substr(2,4) })

    state.filesOpen = [ Object.keys(state.files)[0] ]
  },

  projectAddFile (state, params) {
    params = params || {}
    params.order = getNextOrder(state)

    let file = newFile(params)
    state.files = {
      ...state.files,
      [file.id]: file
    }

    state.lastUpdate = Date.now()
  },

  projectAddFolder (state, params) {
    params = params || {}
    params.order = getNextOrder(state)

    let folder = newFolder(params)
    state.folders = {
      ...state.folders,
      [folder.id]: folder
    }

    state.lastUpdate = Date.now()

    params.id = folder.id
  },

  projectUpdateFile (state, params) {
    let file = state.files[params.id]
    if (!file)
      throw "ERROR: trying to update a file that doesn't exist"
    state.files = {
      ...state.files,
      [params.id]: Object.assign(file, params)
    }

    state.lastUpdate = Date.now()
  },

  projectUpdateFolder (state, params) {
    let folder = state.folders[params.id]
    if (!folder)
      throw "ERROR: trying to update a folder that doesn't exist"
    state.folders = {
      ...state.folders,
      [params.id]: Object.assign(folder, params)
    }

    state.lastUpdate = Date.now()
  },

  projectFileOpenFill (state, fileId) {
    state.filesOpen = [ fileId ]

    global.resetEditors()
  },

  projectFileOpenPane (state, params) {
    let filesOpen = [ ...state.filesOpen ]

    const fileId = params.id
    const pane   = params.pane

    if (filesOpen.length < maxFilesOpen) {
      filesOpen.splice(pane, 0, fileId)
    } else {
      filesOpen[pane] = fileId
    }

    state.filesOpen = filesOpen
    global.resetEditors()
  },

  projectFileClosePane (state, index) {
    let filesOpen = [ ...state.filesOpen ]
    filesOpen.splice(index, 1)
    state.filesOpen = filesOpen
    global.resetEditors()
  },

  projectToggleFolderOpen (state, folderId) {
    if (state.foldersOpen.includes(folderId)) {
      let newFoldersOpen = [ ...state.foldersOpen ]
      newFoldersOpen
        .splice(
          newFoldersOpen
            .findIndex(folder => folder.id == folderId),
          1
        )

      state.foldersOpen = newFoldersOpen
    } else {
      state.foldersOpen = [
        ...state.foldersOpen,
        folderId
      ]
    }
  },
}

const actions = {}

export default {
  state,
  mutations,
  actions
}
