import { remote } from 'electron'
import path from 'path'

import Config from '@/config/config'

export const userPath = remote.app.getPath('userData')

export const syncDirectory =
  path.join(
    userPath,
    Config.projectSyncDirectory
  )

export const syncFilepath =
  path.join(
    userPath,
    Config.projectSyncDirectory,
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

export const projectSaveData = function (state) {
  return JSON.stringify(
    fieldsToSave.reduce((result, field) => {
      result[field] = state[field]
      return result
    }, {})
  )
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
