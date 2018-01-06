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
})
