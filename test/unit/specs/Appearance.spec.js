import Vue from 'vue'
import Appearance from '@/store/modules/Appearance'
import Config from '@/config/config'

const {
  appearanceLoadSettings,
  appearanceUpdateTheme,
  appearanceSetPaneFlex
} = Appearance.mutations

describe('Appearance.js', () => {
  it('appearanceUpdateTheme', () => {
    const state = { scheme: 'smooth' }

    appearanceUpdateTheme(state, {
      type: 'scheme',
      value: 'dark'
    })
    expect(state.scheme).to.equal('dark')

    expect(
      JSON.parse(
        localStorage.getItem(Config.appearanceKey)
      )
    ).to.deep.equal(state)
  })

  it('appearanceLoadSettings', () => {
    const state = { scheme: 'smooth' }

    appearanceUpdateTheme(state, {
      type: 'scheme',
      value: 'dark'
    })
    expect(state.scheme).to.equal('dark')

    state.scheme = 'smooth'

    appearanceLoadSettings(state)
    expect(state.scheme).to.equal('dark')
  })

  it('appearanceSetPaneFlex', () => {
    const state = { paneFlex: Appearance.state.paneFlex }

    appearanceSetPaneFlex(state, {
      index: 1,
      sum: 2,
      value: 0.75
    })
    expect(state.paneFlex).to.deep.equal([1.5, 0.5, 1])

    appearanceSetPaneFlex(state, {
      index: 1,
      sum: 2,
      value: 0.25
    })
    expect(state.paneFlex).to.deep.equal([0.5, 1.5, 1])

    appearanceSetPaneFlex(state, {
      index: 2,
      sum: 2.5,
      value: 0.2
    })
    expect(state.paneFlex).to.deep.equal([0.5, 0.5, 2])
  })
})
