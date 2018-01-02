const state = {
  filesOpen: [],
  foldersOpen: [],

  maxFilesOpen: 3,
  editorSizeRatio: 50,

  scheme:     'smooth',
  fontFamily: 'merriweather',
  fontSize:   'normal',
}

const mutations = {
  writerSaveSettings (state) {
    localStorage.setItem('writer-settings-scheme',     state.scheme)
    localStorage.setItem('writer-settings-fontFamily', state.fontFamily)
    localStorage.setItem('writer-settings-fontSize',   state.fontSize)
  },

  writerLoadSettings (state) {
    state.scheme     = localStorage.getItem('writer-settings-scheme')     || state.scheme
    state.fontFamily = localStorage.getItem('writer-settings-fontFamily') || state.fontFamily
    state.fontSize   = localStorage.getItem('writer-settings-fontSize')   || state.fontSize
  },

  writerNewProject (state, files) {
    state.filesOpen = [ Object.keys(files)[0] ]
  },

  writerFileOpenFill (state, fileId) {
    state.filesOpen = [ fileId ]

    global.resetEditors()
  },

  writerFileOpenPane (state, params) {
    let filesOpen = [ ...state.filesOpen ]

    const fileId = params.id
    const pane   = params.pane

    if (filesOpen.length < state.maxFilesOpen) {
      filesOpen.splice(pane, 0, fileId)
    } else {
      filesOpen[pane] = fileId
    }

    state.filesOpen = filesOpen
    global.resetEditors()
  },

  writerFileClosePane (state, index) {
    let filesOpen = [ ...state.filesOpen ]
    filesOpen.splice(index, 1)
    state.filesOpen = filesOpen
    global.resetEditors()
  },

  writerToggleFolderOpen (state, folderId) {
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

  writerUpdateTheme (state, params) {
    state[params.type] = params.value
    mutations.writerSaveSettings(state)
  },
}

const actions = {
  writerLoadSettings (context) {
    context.commit('writerLoadSettings')
  },
}

export default {
  state,
  mutations,
  actions
}
