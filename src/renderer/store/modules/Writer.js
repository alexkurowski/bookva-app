const maxFilesOpen = 3

const stringsToSave = [
  'scheme',
  'fontFamily',
  'fontSize'
]

const state = {
  filesOpen: [],
  foldersOpen: [],

  paneFlex: Array(maxFilesOpen).fill(1),

  scheme:     'smooth',
  fontFamily: 'merriweather',
  fontSize:   'normal',
}

const mutations = {
  writerSaveSettings (state) {
    stringsToSave.forEach(setting => {
      localStorage.setItem(
        `writer-settings-${ setting }`,
        state[setting]
      )
    })

    localStorage.setItem(
      'writer-settings-paneFlex',
      JSON.stringify(state.paneFlex)
    )
  },

  writerLoadSettings (state) {
    stringsToSave.forEach(setting => {
      state[setting] =
        localStorage.getItem(`writer-settings-${ setting }`)
    })

    const paneFlex =
      JSON.parse(
        localStorage.getItem('writer-settings-paneFlex')
      )
    if (paneFlex)
      state.paneFlex = paneFlex
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

    if (filesOpen.length < maxFilesOpen) {
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

  writerSetPaneFlex (state, params) {
    const index = params.index
    const sum   = params.sum
    const value = params.value * sum

    const left  = value
    const right = sum - value

    let paneFlex = [ ...state.paneFlex ]
    paneFlex[index - 1] = left
    paneFlex[index]     = right
    state.paneFlex = paneFlex

    mutations.writerSaveSettings(state)
  }
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
