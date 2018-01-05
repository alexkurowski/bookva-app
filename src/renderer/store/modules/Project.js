import Vue from 'vue'

import { remote } from 'electron'
import fs from 'fs'

import { Writer } from '@/helpers/store_helper'
import Config from '@/config/config'

import {
  userPath,
  syncDirectory,
  syncFilepath,
  fieldsToSave,
  projectSaveData,
  newFile,
  newFolder,
  getNextOrder
} from './helpers/project_helper'

let saving  = false
let syncing = false

const state = {
  projectFile: null,

  files: {},
  folders: {},

  filesOpen: [],
  foldersOpen: [],

  lastUpdate: 0,
  lastSync: 0
}

const mutations = {
  projectNewProject (state) {
    state.files   = {}
    state.folders = {}

    mutations.projectAddFile(state)

    state.filesOpen = [ Object.keys(state.files)[0] ]

    state.lastUpdate = Date.now()

    global.resetEditors()
  },

  projectSaveProject (state) {
    if ( saving ) return

    saving = true

    remote.dialog.showSaveDialog({
    }, saveFilepath => {
      fs.writeFile(saveFilepath, projectSaveData(state), (err) => {
        saving = false

        if (err)
          throw err
      })
    })
  },

  projectSaveAsProject (state) {
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

    fs.writeFile(syncFilepath, projectSaveData(state), (err) => {
      syncing = false

      if (err)
        throw err
    })
  },

  projectResyncProject (state, result) {
    if ( fs.existsSync(syncFilepath) ) {
      const dataJSON = fs.readFileSync(syncFilepath, 'utf8')
      const data = JSON.parse(dataJSON)

      const missingField =
        fieldsToSave.find( field => !data.hasOwnProperty(field) )

      if (missingField)
        throw `Sync file seems broken. Field '${ missingField }' is missing.`

      fieldsToSave.forEach(field => {
        state[field] = data[field]
      })

      global.resetEditors()

      result.resynced = true
    }
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
    result.folderId = folder.id

    state.lastUpdate = Date.now()
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

    state.lastUpdate = Date.now()
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

    state.lastUpdate = Date.now()
  },

  projectFileClosePane (state, index) {
    let filesOpen = [ ...state.filesOpen ]
    filesOpen.splice(index, 1)
    state.filesOpen = filesOpen
    global.resetEditors()

    state.lastUpdate = Date.now()
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

    state.lastUpdate = Date.now()
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
