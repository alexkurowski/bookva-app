const state = {
  searchBarOpen: false,
}

const mutations = {
  searchShowSearchBar (state) {
    state.searchBarOpen = true
    searchBarFocus()
  },

  searchHideSearchBar (state) {
    searchBarOnHide()
    removeSearch()
    state.searchBarOpen = false
  },
}

const actions = {}

export default {
  state,
  mutations,
  actions
}
