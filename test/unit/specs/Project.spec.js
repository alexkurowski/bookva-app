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
  projectSaveProject,
  projectSaveAsProject,
  projectLoadProject,
  projectRemoveFile,
  projectRemoveFolderWithFiles,
  projectRemoveFolderKeepFiles
} = Project.mutations

describe('Project.js', () => {
  before(() => {
    mockFs({
      '/userData': {
        [Config.projectSyncFilename]: ''
      },
      'save_project.test': '',
      'save_as_project.test': '',
      'load_project.test': '',
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
    ).to.equal(2)
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
    expect(state.filesOpen).to.deep.equal([])
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

  it('projectSaveProject', (done) => {
    const state = { projectFile: null }

    expect(
      projectSaveProject.bind(projectSaveProject, state)
    ).to.throw('ERROR: trying to save project without a file')

    state.projectFile = ''
    expect(
      projectSaveProject.bind(projectSaveProject, state)
    ).to.throw('ERROR: trying to save project without a file')

    state.files = { 'test': { title: 'TEST TITLE', content: 'test content' } }
    state.filesOpen = ['test files open']
    state.foldersOpen = ['test folders open']

    state.projectFile = 'save_project.test'
    projectSaveProject(state)

    setTimeout(() => {
      const json =
        fs.readFileSync('save_project.test', 'utf8')
      expect(json).to.not.equal('')

      const data = JSON.parse(json)
      fieldsToSave.forEach(field => {
        expect(data[field]).to.deep.equal(state[field])
      })

      done()
    }, 100)
  })

  it('projectSaveAsProject', (done) => {
    const state = {
      projectFile: null,
      files: { 'test': { title: 'TEST TITLE', content: 'test content' } },
      folders: {},
      filesOpen: ['test files open'],
      foldersOpen: ['test folders open']
    }

    projectSaveAsProject(state, 'save_as_project.test')
    expect(state.projectFile).to.eq('save_as_project.test')

    setTimeout(() => {
      const json =
        fs.readFileSync('save_as_project.test', 'utf8')
      expect(json).to.not.equal('')

      const data = JSON.parse(json)
      fieldsToSave.forEach(field => {
        expect(data[field]).to.deep.equal(state[field])
      })

      done()
    }, 100)
  })

  it('projectLoadProject', (done) => {
    const saveState = {
      projectFile: 'load_project.test',
      files: { 'test': { title: 'TEST TITLE', content: 'test content' } },
      folders: {},
      filesOpen: ['test files open'],
      foldersOpen: ['test folders open'],
      lastUpdate: 0,
      lastSync: 0,
      lastSave: 0,
    }
    const loadState = {}

    projectSaveProject(saveState)

    projectLoadProject(loadState, '')
    expect(loadState).to.deep.equal({})

    expect(
      projectLoadProject.bind(projectLoadProject, loadState, '/path/to/invalid/file.wrtr')
    ).to.throw()
    expect(loadState).to.deep.equal({})

    setTimeout(() => {
      projectLoadProject(loadState, 'load_project.test')

      fieldsToSave.forEach(field => {
        if (field == 'lastUpdate')
          expect(loadState[field]).to.not.deep.equal(saveState[field])
        else
          expect(loadState[field]).to.deep.equal(saveState[field])
      })

      done()
    }, 100)
  })

  it('projectRemoveFile', () => {
    const state = {
      files: {
        'a': {},
        'b': {},
        'c': {}
      },
      filesOpen: ['a', 'b']
    }

    projectRemoveFile(state, 'a')
    expect(Object.keys(state.files)).to.deep.equal(['b', 'c'])
    expect(state.filesOpen).to.deep.equal(['b'])

    projectRemoveFile(state, 'a')
    expect(Object.keys(state.files)).to.deep.equal(['b', 'c'])
    expect(state.filesOpen).to.deep.equal(['b'])

    projectRemoveFile(state, 'c')
    expect(Object.keys(state.files)).to.deep.equal(['b'])
    expect(state.filesOpen).to.deep.equal(['b'])

    projectRemoveFile(state, 'b')
    expect(Object.keys(state.files)).to.deep.equal([])
    expect(state.filesOpen).to.deep.equal([])
  })

  it('projectRemoveFolderWithFiles', () => {
    const state = {
      files: {
        'a': { id: 'a', folder: 'fa' },
        'b': { id: 'b', folder: 'fa' },
        'c': { id: 'c', folder: 'fc' },
      },
      filesOpen: ['a', 'b'],
      folders: {
        'fa': {},
        'fb': {},
        'fc': {}
      },
      foldersOpen: ['fb', 'fc']
    }

    projectRemoveFolderWithFiles(state, 'fa')
    expect(Object.keys(state.files)).to.deep.equal(['c'])
    expect(Object.keys(state.folders)).to.deep.equal(['fb', 'fc'])
    expect(state.filesOpen).to.deep.equal([])
    expect(state.foldersOpen).to.deep.equal(['fb', 'fc'])

    projectRemoveFolderWithFiles(state, 'fb')
    expect(Object.keys(state.files)).to.deep.equal(['c'])
    expect(Object.keys(state.folders)).to.deep.equal(['fc'])
    expect(state.filesOpen).to.deep.equal([])
    expect(state.foldersOpen).to.deep.equal(['fc'])

    projectRemoveFolderWithFiles(state, 'fc')
    expect(Object.keys(state.files)).to.deep.equal([])
    expect(Object.keys(state.folders)).to.deep.equal([])
    expect(state.filesOpen).to.deep.equal([])
    expect(state.foldersOpen).to.deep.equal([])
  })

  it('projectRemoveFolderKeepFiles', () => {
    const state = {
      files: {
        'a': { id: 'a', folder: 'fa' },
        'b': { id: 'b', folder: 'fa' },
        'c': { id: 'c', folder: 'fc' },
      },
      filesOpen: ['a', 'b'],
      folders: {
        'fa': {},
        'fb': {},
        'fc': {}
      },
      foldersOpen: ['fb', 'fc']
    }

    projectRemoveFolderKeepFiles(state, 'fa')
    expect(Object.keys(state.files)).to.deep.equal(['a', 'b', 'c'])
    expect(Object.keys(state.folders)).to.deep.equal(['fb', 'fc'])
    expect(state.files.a.folder).to.equal(null)
    expect(state.files.b.folder).to.equal(null)
    expect(state.files.c.folder).to.equal('fc')
    expect(state.filesOpen).to.deep.equal(['a', 'b'])
    expect(state.foldersOpen).to.deep.equal(['fb', 'fc'])

    projectRemoveFolderKeepFiles(state, 'fb')
    expect(Object.keys(state.files)).to.deep.equal(['a', 'b', 'c'])
    expect(Object.keys(state.folders)).to.deep.equal(['fc'])
    expect(state.files.a.folder).to.equal(null)
    expect(state.files.b.folder).to.equal(null)
    expect(state.files.c.folder).to.equal('fc')
    expect(state.filesOpen).to.deep.equal(['a', 'b'])
    expect(state.foldersOpen).to.deep.equal(['fc'])

    projectRemoveFolderKeepFiles(state, 'fc')
    expect(Object.keys(state.files)).to.deep.equal(['a', 'b', 'c'])
    expect(Object.keys(state.folders)).to.deep.equal([])
    expect(state.files.a.folder).to.equal(null)
    expect(state.files.b.folder).to.equal(null)
    expect(state.files.c.folder).to.equal(null)
    expect(state.filesOpen).to.deep.equal(['a', 'b'])
    expect(state.foldersOpen).to.deep.equal([])
  })
})
