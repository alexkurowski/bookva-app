const state = {
  searchBarOpen: false,
  currentSelect: null
}

const mutations = {
  searchShowSearchBar (state) {
    state.searchBarOpen = true
    searchBarFocus()
  },

  searchHideSearchBar (state) {
    searchBarOnHide()
    removeAllSearch()
    state.searchBarOpen = false
  },

  searchSetCurrentSelect (state, value) {
    state.currentSelect = value
  },
}

const actions = {
  searchSelectPrev (context) {
    const node = selectPrevSearch(context.state.currentSelect)
    context.commit('searchSetCurrentSelect', node)
  },

  searchSelectNext (context) {
    const node = selectNextSearch(context.state.currentSelect)
    context.commit('searchSetCurrentSelect', node)
  },
}

export default {
  state,
  mutations,
  actions
}
