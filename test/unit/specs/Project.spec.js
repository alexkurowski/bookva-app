import Config from '@/config/config'
import {
  fieldsToSave
} from '@/store/modules/helpers/project_helper'

import fs from 'fs'
import mockFs from 'mock-fs'

import Vue from 'vue'
import Project from '@/store/modules/Project'

const {
  projectNewProject,
  projectSyncProject,
  projectResyncProject,
  projectFileOpenPane,
  projectFileClosePane,
  projectToggleFolderOpen,
} = Project.mutations

describe('Project.js', () => {
  before(() => {
    mockFs({
      '/userData': {
        [Config.projectSyncFilename]: ''
      },
    })
  })

  after(() => {
    mockFs.restore()
  })

  it('projectNewProject', () => {
    const state = Object.assign({}, Project.state)

    expect(
      Object.keys(state.files).length
    ).to.equal(0)

    projectNewProject(state)
    expect(
      Object.keys(state.files).length
    ).to.equal(1)
    expect(state.filesOpen[0]).to.equal(
      Object.keys(state.files)[0]
    )
  })

  it('projectSyncProject', (done) => {
    const state = Object.assign({}, Project.state)

    projectNewProject(state)
    expect(state.lastUpdate).to.not.equal(state.lastSync)

    projectSyncProject(state)

    setTimeout(() => {
      const json =
        fs.readFileSync(`/userData/${ Config.projectSyncFilename }`, 'utf8')
      expect(json).to.not.equal('')

      const data = JSON.parse(json)
      fieldsToSave.forEach(field => {
        expect(data[field]).to.deep.equal(state[field])
      })

      done()
    }, 100)
  })

  it('projectResyncProject', (done) => {
    const state = Object.assign({}, Project.state)

    projectNewProject(state)
    projectSyncProject(state)

    const filesPrev = Object.assign({}, state.files)
    const filesOpenPrev = [ ...state.filesOpen ]

    setTimeout(() => {
      projectNewProject(state)
      expect(state.files).to.not.deep.equal(filesPrev)
      expect(state.filesOpen).to.not.deep.equal(filesOpenPrev)

      projectResyncProject(state, {})

      expect(state.files).to.deep.equal(filesPrev)
      expect(state.filesOpen).to.deep.equal(filesOpenPrev)

      done()
    }, 100)
  })

  it('projectFileOpenPane', () => {
    const state = { filesOpen: ['a'] }

    projectFileOpenPane(state, {
      id: 'b',
      pane: 0
    })
    expect(state.filesOpen).to.deep.equal(['b', 'a'])

    projectFileOpenPane(state, {
      id: 'c',
      pane: 2
    })
    expect(state.filesOpen).to.deep.equal(['b', 'a', 'c'])

    projectFileOpenPane(state, {
      id: 'd',
      pane: 1
    })
    expect(state.filesOpen).to.deep.equal(['b', 'd', 'c'])
  })

  it('projectFileClosePane', () => {
    const state = { filesOpen: ['a', 'b'] }

    projectFileClosePane(state, 1)
    expect(state.filesOpen).to.deep.equal(['a'])

    projectFileClosePane(state, 0)
    expect(state.filesOpen).to.deep.equal(['a'])
  })

  it('projectToggleFolderOpen', () => {
    const state = { foldersOpen: ['a', 'b'] }

    projectToggleFolderOpen(state, 'c')
    expect(state.foldersOpen).to.include('c')

    projectToggleFolderOpen(state, 'b')
    expect(state.foldersOpen).to.not.include('b')

    projectToggleFolderOpen(state, 'a')
    expect(state.foldersOpen).to.deep.equal(['c'])

    projectToggleFolderOpen(state, 'c')
    expect(state.foldersOpen.length).to.equal(0)
  })
})
