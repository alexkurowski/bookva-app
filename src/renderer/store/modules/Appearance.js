import Config from '@/config/config'

const state = {
  paneFlex: Array(Config.maxFilesOpen).fill(1),

  scheme:     'smooth',
  fontFamily: 'merriweather',
  fontSize:   'normal',
}

const mutations = {
  appearanceSaveSettings (state) {
    const data = JSON.stringify(state)

    localStorage.setItem(
      Config.appearanceKey,
      data
    )
  },

  appearanceLoadSettings (state) {
    const data =
      JSON.parse(
        localStorage.getItem(Config.appearanceKey) || '{}'
      )

    const stateKeys = Object.keys(state)
    const missingField =
      stateKeys.find(field => {
        return !data.hasOwnProperty(field)
      })

    if (missingField)
      return console.log(`Appearance settings seems broken. Field ${ missingField } is missing.`)

    stateKeys.forEach(field => {
      state[field] = data[field]
    })
  },

  appearanceUpdateTheme (state, params) {
    state[params.type] = params.value
    mutations.appearanceSaveSettings(state)
  },

  appearanceSetPaneFlex (state, params) {
    const sum   = 2
    const index = params.index
    const value = params.value * sum

    const left  = value
    const right = sum - value

    const paneFlex = [ ...state.paneFlex ]
    paneFlex[index - 1] = left
    paneFlex[index]     = right
    state.paneFlex = paneFlex

    mutations.appearanceSaveSettings(state)
  }
}

const actions = {
  appearanceUpdateTheme (context, params) {
    context.commit('appearanceUpdateTheme', params)
  }
}

export default {
  state,
  mutations,
  actions
}
