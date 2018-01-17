import { remote } from 'electron'
import fs from 'fs'

import Config from '@/config/config'

import {
  syncFilepath,
  fieldsToSave,
  projectSaveData,
  projectLoadData,
  projectExportData,
  projectImportData,
  newFile,
  newFolder,
  getNextOrder
} from './helpers/project_helper'

let ioBusy   = false
let syncBusy = false

const state = {
  projectFile: null,
  projectTitle: '',
  projectAuthor: '',

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
    state.projectFile   = null
    state.projectTitle  = ''
    state.projectAuthor = ''
    state.files         = {}
    state.folders       = {}
    state.filesOpen     = []
    state.foldersOpen   = []
    state.lastUpdate    = 0
    state.lastSync      = 0
    state.lastSave      = 0

    mutations.projectAddFolder(state, {
      title: 'Chapters'
    })

    mutations.projectAddFile(state, {
      title: 'Chapter 1',
      folder: Object.keys(state.folders)[0]
    })

    mutations.projectAddFolder(state, {
      title: 'Planning'
    })

    mutations.projectAddFile(state, {
      title: 'Notes',
      folder: Object.keys(state.folders)[1]
    })

    state.filesOpen = [ Object.keys(state.files)[0] ]

    state.lastUpdate = Date.now()

    global.resetEditors()

    if (process.env.NODE_ENV != 'testing') {
      setTimeout(() => {
        document.querySelector('.pane').__vue__.focusContent()
      }, 100)
    }
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
    state.lastUpdate = Date.now()

    mutations.projectSaveProject(state)
  },

  projectLoadProject (state, filepath) {
    if (!filepath) return

    fs.accessSync(filepath)

    const { data, error } =
      projectLoadData(filepath)

    if (!error) {
      mutations.projectRestoreProject(state, data)

      state.projectFile = filepath
      state.lastUpdate = Date.now()
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
        projectLoadData(syncFilepath)

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

  projectUpdateInfo (state, info) {
    if (info.hasOwnProperty('title'))
      state.projectTitle  = info.title

    if (info.hasOwnProperty('author'))
      state.projectAuthor = info.author
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

  projectAddFolder (state, params) {
    params = params || {}
    params.order = getNextOrder(state)

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

  projectUpdateFileContent (state, params) {
    const file = state.files[params.id]
    if (!file)
      throw "ERROR: trying to update a file that doesn't exist"

    const html = params.element.innerHTML
    const text =
      html
        .replace(/<(p|h1|h2)[^>]*>/g, ' ')
        .replace(/(<[^>]*>|&nbsp;)/g, '')
        .trim()
    const wordCount =
      /^\s*$/.test(text)
        ? 0
        : text.split(/\s+/).length

    state.files = {
      ...state.files,
      [params.id]: Object.assign(file, {
        [params.type]: html,
        wordCount: wordCount
      })
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

    state.lastUpdate = Date.now()
  },

  projectRemoveFolderWithFiles (state, folderId) {
    Object.values(state.files)
      .filter(file => file.folder == folderId)
      .forEach(file => mutations.projectRemoveFile(state, file.id))

    const folders = Object.assign({}, state.folders)
    delete folders[folderId]

    if (state.foldersOpen.includes(folderId)) {
      mutations.projectToggleFolderOpen(
        state,
        folderId
      )
    }

    state.folders = folders

    state.lastUpdate = Date.now()
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

    state.lastUpdate = Date.now()
  },

  projectFileOpenFill (state, fileId) {
    state.filesOpen = [ fileId ]

    global.resetEditors()

    state.lastUpdate = Date.now()
  },

  projectFileOpenPane (state, params) {
    const filesOpen = [ ...state.filesOpen ]

    const fileId  = params.id
    const pane    = params.pane
    const replace = params.replace

    if (replace) {
      filesOpen[pane] = fileId
    } else {
      if (filesOpen.length < Config.maxFilesOpen) {
        filesOpen.splice(pane, 0, fileId)
      } else {
        filesOpen[pane] = fileId
      }
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

  projectSwapOpenFiles (state) {
    const filesOpen = [ ...state.filesOpen ]
    filesOpen.reverse()
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
      title: 'Open',
      filters: [
        { name: 'Bookva (.bkv)', extensions: ['bkv'] }
      ],
      properties: ['openFile']
    }, loadFilepath => {
      if (loadFilepath && loadFilepath[0]) {
        try {
          context.commit('projectLoadProject', loadFilepath[0])
          context.commit('sidebarSetPage', 'FileTree')
        } catch (err) {
          context.dispatch('modalShow', {
            type: 'Alert',
            content: 'badLoad'
          })
        }
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
        return
      }
      context.commit('projectSaveProject')
      context.dispatch('applicationShowIOIndicator')
    } else {
      ioBusy = false
      context.dispatch('projectSaveAsProject')
    }
  },

  projectSaveAsProject (context) {
    if (ioBusy) return
    ioBusy = true

    remote.dialog.showSaveDialog({
      title: 'Save',
      filters: [
        { name: 'Bookva (.bkv)', extensions: ['bkv'] }
      ]
    }, saveFilepath => {
      if (saveFilepath) {
        context.commit('projectSaveAsProject', saveFilepath)
        context.dispatch('applicationShowIOIndicator')
      } else {
        ioBusy = false
      }
    })
  },

  projectImportFiles (context) {
    remote.dialog.showOpenDialog({
      title: 'Import',
      filters: [
        { name: 'All Supported Formats',    extensions: ['epub',
                                                         'docx',
                                                         'md', 'mkd', 'mkdn', 'mdown', 'markdown',
                                                         'odt',
                                                         'txt'] },
        { name: 'EPUB (.epub)',             extensions: ['epub'] },
        { name: 'MS Word (.docx)',          extensions: ['docx'] },
        { name: 'Markdown (.md)',           extensions: ['md', 'mkd', 'mkdn', 'mdown', 'markdown'] },
        { name: 'OpenDocument Text (.odt)', extensions: ['odt'] },
        { name: 'Text (.txt)',              extensions: ['txt'] },
      ],
      properties: [ 'openFile', 'multiSelections' ]
    }, importFilepaths => {
      if ( !importFilepaths ||
           importFilepaths.length == 0 ) return

      importFilepaths.forEach(async filepath => {
        const { name, data, error } =
          await projectImportData(filepath)

        if (!error) {
          context.commit('projectAddFile', {
            title: name,
            content: data
          })
        } else {
          throw error
        }
      })
      context.commit('projectImportFiles', importFilepaths)
    })
  },

  projectExportFiles (context, params) {
    if (ioBusy) return
    ioBusy = true

    context.dispatch('modalHide')

    remote.dialog.showSaveDialog({
      title: 'Export',
      filters: [
        { name: 'EPUB (.epub)',             extensions: ['epub'] },
        { name: 'MS Word (.docx)',          extensions: ['docx'] },
        { name: 'Markdown (.md)',           extensions: ['md', 'mkd', 'mkdn', 'mdown', 'markdown'] },
        { name: 'OpenDocument Text (.odt)', extensions: ['odt'] },
        { name: 'Text (.txt)',              extensions: ['txt'] },
      ],
    }, exportFilepath => {
      if (exportFilepath) {
        context.commit('projectUpdateInfo', {
          title:  params.title,
          author: params.author
        })
        projectExportData(
          context.state,
          params,
          exportFilepath,
          () => { ioBusy = false }
        )
        context.dispatch('applicationShowIOIndicator')
      } else {
        ioBusy = false
      }
    })
  },

  projectUpdateFileContent (context, params) {
    setTimeout(() => {
      context.commit('projectUpdateFileContent', params)
    }, 0)
  },

  projectSyncProject (context) {
    setTimeout(() => {
      context.commit('projectSyncProject')
    }, 0)
  },

  projectResyncProject (context) {
    const result = { resynced: false }
    context.commit('projectResyncProject', result)
    return result.resynced
  },
}

export default {
  state,
  mutations,
  actions
}
