import Vue from 'vue'
import Writer from '@/store/modules/Writer'
import Config from '@/config/config'

const {
  writerLoadSettings,
  writerUpdateTheme,
  writerSetPaneFlex
} = Writer.mutations

describe('Writer.js', () => {
  it('writerUpdateTheme', () => {
    const state = { scheme: 'smooth' }

    writerUpdateTheme(state, {
      type: 'scheme',
      value: 'dark'
    })
    expect(state.scheme).to.equal('dark')

    expect(
      localStorage.getItem('writer-settings-scheme')
    ).to.equal('dark')
  })

  it('writerLoadSettings', () => {
    const state = { scheme: 'smooth' }

    writerUpdateTheme(state, {
      type: 'scheme',
      value: 'dark'
    })
    expect(state.scheme).to.equal('dark')

    state.scheme = 'smooth'

    writerLoadSettings(state)
    expect(state.scheme).to.equal('dark')
  })

  it('writerSetPaneFlex', () => {
    const state = { paneFlex: Writer.state.paneFlex }

    writerSetPaneFlex(state, {
      index: 1,
      sum: 2,
      value: 0.75
    })
    expect(state.paneFlex).to.deep.equal([1.5, 0.5, 1])

    writerSetPaneFlex(state, {
      index: 1,
      sum: 2,
      value: 0.25
    })
    expect(state.paneFlex).to.deep.equal([0.5, 1.5, 1])

    writerSetPaneFlex(state, {
      index: 2,
      sum: 2.5,
      value: 0.2
    })
    expect(state.paneFlex).to.deep.equal([0.5, 0.5, 2])
  })
})
