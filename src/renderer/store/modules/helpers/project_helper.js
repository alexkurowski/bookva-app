import { remote } from 'electron'
import fs from 'fs'
import path from 'path'

import { txt, pandoc } from './import_helper'

import Config from '@/config/config'

const userPath =
  process.env.NODE_ENV == 'testing'
    ? '/userData'
    : remote.app.getPath('userData')

export const syncFilepath =
  path.join(
    userPath,
    Config.projectSyncFilename
  )

export const fieldsToSave =
  [
    'projectFile',
    'files',
    'folders',
    'filesOpen',
    'foldersOpen',
    'lastUpdate',
    'lastSync',
    'lastSave',
  ]

export const projectSaveData = function (state, filepath, callback) {
  const data =
    JSON.stringify(
      fieldsToSave.reduce((result, field) => {
        result[field] = state[field]
        return result
      }, {})
    )

  fs.writeFile(
    filepath,
    data,
    err => {
      callback()

      if (err)
        throw err
    }
  )
}

export const projectLoadData = function (filepath) {
  const dataJSON = fs.readFileSync(filepath, 'utf8')
  const data = JSON.parse(dataJSON)

  const missingField =
    fieldsToSave.find( field => !data.hasOwnProperty(field) )

  if (missingField)
    console.log(
      `Sync file seems broken. Field '${ missingField }' is missing. Ignoring it.`
    )

  return {
    data,
    error: missingField
  }
}

export const projectExportData = function (state, filepath) {
}

export const projectImportData = async function (filepath) {
  const name = filepath.split('/').pop().split('.')[0]
  const ext  = filepath.split('.').pop()

  if (ext == 'txt') {
    const data = txt(
      fs.readFileSync(filepath, 'utf8')
    )
    return { name, data }
  }

  if ( ext == 'md' ||
       ext == 'markdown' ) {
    const { data, error } = await pandoc(filepath, 'markdown')
    return { name, data, error }
  }


  return {
    error: 'Error: unknown file format'
  }
}

const generateId = function () {
  return Math.random().toString(36).substr(2)
}

export const newFile = function (params) {
  params = params || {}
  return {
    id: generateId(),
    title: params.title || '',
    content: params.content || '',
    folder: params.folder || null,
    order: params.order || 0,
    wordCount: 0
  }
}

export const newFolder = function (params) {
  params = params || {}
  return {
    id: generateId(),
    title: params.title || '',
    order: params.order || 0,
    isFolder: true,
  }
}

export const getNextOrder = function (state) {
  const collection = [
    ...Object.values(state.files),
    ...Object.values(state.folders)
  ]

  if (Object.values(collection).length == 0) {
    return 0
  } else {
    return (
      Math.max(
        ...collection
          .map(entry => entry.order)
      ) + 1
    )
  }
}
