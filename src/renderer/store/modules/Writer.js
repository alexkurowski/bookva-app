const state = {
  filesOpen: [],
  foldersOpen: [],

  editorSizeRatio: 50,

  scheme:     'default',
  fontFamily: 'default',
  fontSize:   'default',
}

const mutations = {
  newProject (state) {
    state.filesOpen = []
  },

  openFile (state, fileId) {
    state.filesOpen = [ fileId ]
  },

  toggleFolder (state, folderId) {
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
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
