import Config from '@/config/config'

import {
  stringsToSave,
  stringify
} from './helpers/writer_helper'

const state = {
  paneFlex: Array(Config.maxFilesOpen).fill(1),

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
      stringify(state.paneFlex)
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

const actions = {}

export default {
  state,
  mutations,
  actions
}
