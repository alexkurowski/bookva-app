import { remote } from 'electron'
import fs from 'fs'
import path from 'path'

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

export const projectLoadData = function (state, filepath) {
  const dataJSON = fs.readFileSync(filepath, 'utf8')
  const data = JSON.parse(dataJSON)

  const missingField =
    fieldsToSave.find( field => !data.hasOwnProperty(field) )

  if (missingField)
    throw `Sync file seems broken. Field '${ missingField }' is missing.`

  return {
    data,
    error: missingField
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
    content: '',
    folder: params.folder || null,
    order: params.order || 0,
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
  let collection = [
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
