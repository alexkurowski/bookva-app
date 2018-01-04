import Vue from 'vue'

import { remote } from 'electron'
import path from 'path'
import fs from 'fs'

import { Writer } from '@/helpers/store_helper'
import Config from '@/config/config'

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

const userPath = remote.app.getPath('userData')

const syncDirectory =
  path.join(
    userPath,
    Config.projectSyncDirectory
  )

const syncFilepath =
  path.join(
    userPath,
    Config.projectSyncDirectory,
    Config.projectSyncFilename
  )

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

    try {
      fs.mkdirSync(syncDirectory)
    } catch (err) {
      if (err.code != 'EEXIST')
        throw err
    }

    const data = JSON.stringify({
      files:       state.files,
      folders:     state.folders,
      filesOpen:   state.filesOpen,
      foldersOpen: state.foldersOpen,
    })

    fs.writeFile(syncFilepath, data, (err) => {
      syncing = false

      if (err)
        throw err
    })
  },

  projectResyncProject (state, result) {
    if ( fs.existsSync(syncFilepath) ) {
      const dataJSON = fs.readFileSync(syncFilepath, 'utf8')
      const data = JSON.parse(dataJSON)

      if ( !data.files ||
           !data.folders ||
           !data.filesOpen ||
           !data.foldersOpen )
        throw "Sync file seems broken!"

      state.files       = data.files
      state.folders     = data.folders
      state.filesOpen   = data.filesOpen
      state.foldersOpen = data.foldersOpen

      global.resetEditors()

      result.resynced = true
    }
  },

  projectNewProject (state) {
    state.files   = {}
    state.folders = {}

    mutations.projectAddFile(state)

    state.filesOpen = [ Object.keys(state.files)[0] ]

    global.resetEditors()
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

  projectAddFolder (state, result) {
    let params = { order: getNextOrder(state) }

    let folder = newFolder(params)
    state.folders = {
      ...state.folders,
      [folder.id]: folder
    }

    state.lastUpdate = Date.now()

    result.folderId = folder.id
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

    if (filesOpen.length < Config.maxFilesOpen) {
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

const actions = {
  projectResyncProject (context) {
    let result = { resynced: false }
    context.commit('projectResyncProject', result)
    return result.resynced
  },

  projectAddFolder (context) {
    let result = { folderId: null }
    context.commit('projectAddFolder', result)
    return result.folderId
  }
}

export default {
  state,
  mutations,
  actions
}
