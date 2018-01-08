import Config from '@/config/config'

const state = {
  sidebarOpen: false,
  sidebarPage: 'FileTree',

  draggedFileId: null
}

const mutations = {
  sidebarToggle (state, open) {
    if (typeof open == 'boolean')
      state.sidebarOpen = open
    else
      state.sidebarOpen = !state.sidebarOpen
  },

  sidebarSetPage (state, value) {
    if (Config.sidebarPages.includes(value))
      state.sidebarPage = value
    else
      throw `Unknown sidebar page: ${ value }`
  },

  sidebarSetDraggedFileId (state, fileId) {
    state.draggedFileId = fileId
  }
}

const actions = {}

export default {
  state,
  mutations,
  actions
}
