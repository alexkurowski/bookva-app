import { remote } from 'electron'
import fs from 'fs'

import Config from '@/config/config'

import {
  syncFilepath,
  fieldsToSave,
  projectSaveData,
  projectLoadData,
  newFile,
  newFolder,
  getNextOrder
} from './helpers/project_helper'

let ioBusy   = false
let syncBusy = false

const state = {
  projectFile: null,

  files: {},
  folders: {},

  filesOpen: [],
  foldersOpen: [],

  lastUpdate: 0,
  lastSync: 0,
  lastSave: 0,
}

const mutations = {
  projectNewProject (state) {
    state.projectFile = null
    state.files       = {}
    state.folders     = {}
    state.filesOpen   = []
    state.foldersOpen = []
    state.lastUpdate  = 0
    state.lastSync    = 0
    state.lastSave    = 0

    mutations.projectAddFile(state)

    state.filesOpen = [ Object.keys(state.files)[0] ]

    state.lastUpdate = Date.now()

    global.resetEditors()
  },

  projectSaveProject (state) {
    if (!state.projectFile)
      throw "ERROR: trying to save project without a file"

    state.lastSave = state.lastUpdate

    projectSaveData(
      state,
      state.projectFile,
      () => { ioBusy = false }
    )
  },

  projectSaveAsProject (state, filepath) {
    if (!filepath) return

    state.projectFile = filepath
    mutations.projectSaveProject(state)
  },

  projectLoadProject (state, filepath) {
    if (!filepath) return

    fs.accessSync(filepath)

    const { data, error } =
      projectLoadData(state, filepath)

    if (!error) {
      mutations.projectRestoreProject(state, data)
      state.projectFile = filepath
    }

    ioBusy = false
  },

  projectSyncProject (state) {
    if ( syncBusy ) return
    if ( state.lastUpdate == state.lastSync ) return

    syncBusy = true

    state.lastSync = state.lastUpdate

    projectSaveData(
      state,
      syncFilepath,
      () => {
        syncBusy = false
      }
    )
  },

  projectResyncProject (state, result) {
    if ( fs.existsSync(syncFilepath) ) {
      const { data, error } =
        projectLoadData(state, syncFilepath)

      if (!error) {
        mutations.projectRestoreProject(state, data)

        result.resynced = true
      }
    }
  },

  projectRestoreProject (state, data) {
    fieldsToSave.forEach(field => {
      state[field] = data[field]
    })

    global.resetEditors()
  },

  projectAddFile (state, params) {
    params = params || {}
    params.order = getNextOrder(state)

    const file = newFile(params)
    state.files = {
      ...state.files,
      [file.id]: file
    }

    state.lastUpdate = Date.now()
  },

  projectAddFolder (state) {
    const params = { order: getNextOrder(state) }

    const folder = newFolder(params)
    state.folders = {
      ...state.folders,
      [folder.id]: folder
    }
    state.foldersOpen = [
      ...state.foldersOpen,
      folder.id
    ]

    state.lastUpdate = Date.now()
  },

  projectUpdateFile (state, params) {
    const file = state.files[params.id]
    if (!file)
      throw "ERROR: trying to update a file that doesn't exist"

    state.files = {
      ...state.files,
      [params.id]: Object.assign(file, params)
    }

    state.lastUpdate = Date.now()
  },

  projectUpdateFolder (state, params) {
    const folder = state.folders[params.id]
    if (!folder)
      throw "ERROR: trying to update a folder that doesn't exist"

    state.folders = {
      ...state.folders,
      [params.id]: Object.assign(folder, params)
    }

    state.lastUpdate = Date.now()
  },

  projectRemoveFile (state, fileId) {
    const files = Object.assign({}, state.files)
    delete files[fileId]

    if (state.filesOpen.includes(fileId)) {
      mutations.projectFileClosePane(
        state,
        state.filesOpen.indexOf(fileId)
      )
    }

    state.files = files
  },

  projectRemoveFolderWithFiles (state, folderId) {
    const files = Object.assign({}, state.files)
    Object.values(files)
      .filter(file => file.folder == folderId)
      .map(file => file.id)
      .forEach(fileId => delete files[fileId])

    const folders = Object.assign({}, state.folders)
    delete folders[folderId]

    if (state.foldersOpen.includes(folderId)) {
      mutations.projectToggleFolderOpen(
        state,
        folderId
      )
    }

    state.files = files
    state.folders = folders
  },

  projectRemoveFolderKeepFiles (state, folderId) {
    const files = Object.assign({}, state.files)
    Object.values(files)
      .filter(file => file.folder == folderId)
      .map(file => file.id)
      .forEach(fileId => files[fileId].folder = null)

    const folders = Object.assign({}, state.folders)
    delete folders[folderId]

    if (state.foldersOpen.includes(folderId)) {
      mutations.projectToggleFolderOpen(
        state,
        folderId
      )
    }

    state.files = files
    state.folders = folders
  },

  projectFileOpenFill (state, fileId) {
    state.filesOpen = [ fileId ]

    global.resetEditors()

    state.lastUpdate = Date.now()
  },

  projectFileOpenPane (state, params) {
    const filesOpen = [ ...state.filesOpen ]

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
    const filesOpen = [ ...state.filesOpen ]
    filesOpen.splice(index, 1)
    state.filesOpen = filesOpen
    global.resetEditors()

    state.lastUpdate = Date.now()
  },

  projectToggleFolderOpen (state, folderId) {
    if (state.foldersOpen.includes(folderId)) {
      const foldersOpen = [ ...state.foldersOpen ]
      foldersOpen.splice(
        foldersOpen.indexOf(folderId),
        1
      )

      state.foldersOpen = foldersOpen
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
  projectNewProject (context) {
    context.commit('projectNewProject')
    context.commit('sidebarSetPage', 'FileTree')
    context.commit('sidebarToggle', false)
  },

  projectLoadProject (context) {
    if (ioBusy) return
    ioBusy = true

    remote.dialog.showOpenDialog({
    }, loadFilepath => {
      if (loadFilepath && loadFilepath[0]) {
        context.commit('projectLoadProject', loadFilepath[0])
        context.commit('sidebarSetPage', 'FileTree')
      }
      ioBusy = false
    })
  },

  projectSaveProject (context) {
    if (ioBusy) return
    ioBusy = true

    if (context.state.projectFile) {
      try {
        fs.accessSync(state.projectFile)
      } catch (err) {
        ioBusy = false
        context.dispatch('projectSaveAsProject')
      }
      context.commit('projectSaveProject')
    } else {
      ioBusy = false
      context.dispatch('projectSaveAsProject')
    }
  },

  projectSaveAsProject (context) {
    if (ioBusy) return
    ioBusy = true

    remote.dialog.showSaveDialog({
    }, saveFilepath => {
      if (saveFilepath) {
        context.commit('projectSaveAsProject', saveFilepath)
      } else {
        ioBusy = false
      }
    })
  },

  projectResyncProject (context) {
    const result = { resynced: false }
    context.commit('projectResyncProject', result)
    return result.resynced
  },

  projectFileOpenFill (context, fileId) {
    context.commit('projectFileOpenFill', fileId)
  },

  projectFileOpenPane (context, params) {
    context.commit('projectFileOpenPane', params)
  },

  projectFileClosePane (context, index) {
    context.commit('projectFileClosePane', index)
  },

  projectRemoveFile (context, fileId) {
    context.commit('projectRemoveFile', fileId)
  },

  projectRemoveFolderWithFiles (context, folderId) {
    context.commit('projectRemoveFolderWithFiles', folderId)
  },

  projectRemoveFolderKeepFiles (context, folderId) {
    context.commit('projectRemoveFolderKeepFiles', folderId)
  },

  projectToggleFolderOpen (context, folderId) {
    context.commit('projectToggleFolderOpen', folderId)
  }
}

export default {
  state,
  mutations,
  actions
}
