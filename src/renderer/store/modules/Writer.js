const state = {
  filesOpen: [],
  foldersOpen: [],

  editorSizeRatio: 50,

  scheme:     'dark', // 'smooth',
  fontFamily: 'merriweather',
  fontSize:   'normal',
}

const mutations = {
  newProject (state) {
    state.filesOpen = []
  },

  writerSetFileOpen (state, fileId) {
    state.filesOpen = [ fileId ]
  },

  writerPushFileOpen (state, fileId) {
    state.filesOpen = [
      ...state.filesOpen,
      fileId
    ]
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
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
