import Vue from 'vue'
import Sidebar from '@/store/modules/Sidebar'

const {
  sidebarToggle,
  sidebarSetPage
} = Sidebar.mutations

describe('Sidebar.js', () => {
  it('sidebarToggle', () => {
    const state = { sidebarOpen: false }

    sidebarToggle(state)
    expect(state.sidebarOpen).to.equal(true)

    sidebarToggle(state)
    expect(state.sidebarOpen).to.equal(false)

    sidebarToggle(state, true)
    expect(state.sidebarOpen).to.equal(true)

    sidebarToggle(state, true)
    expect(state.sidebarOpen).to.equal(true)

    sidebarToggle(state, false)
    expect(state.sidebarOpen).to.equal(false)
  })

  it('sidebarSetPage', () => {
    const pages = Sidebar.state.sidebarPages
    const state = {
      sidebarPage: 'FileTree',
      sidebarPages: pages
    }

    expect(
      sidebarSetPage.bind(sidebarSetPage, state)
    ).to.throw('Unknown sidebar page: undefined')
    expect(state.sidebarPage).to.equal('FileTree')

    expect(
      sidebarSetPage.bind(sidebarSetPage, state, 'invalid page')
    ).to.throw('Unknown sidebar page: invalid page')
    expect(state.sidebarPage).to.equal('FileTree')

    pages.forEach(page => {
      sidebarSetPage(state, page)
      expect(state.sidebarPage).to.equal(page)
    })
  })
})
