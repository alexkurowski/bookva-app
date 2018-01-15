import { remote } from 'electron'
import fs from 'fs'
import path from 'path'

import {
  txt,
  pandocLoad,
  pandocSave
} from './import_export_helper'

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
    'projectTitle',
    'projectAuthor',
    'files',
    'folders',
    'filesOpen',
    'foldersOpen',
    'lastUpdate',
    'lastSync',
    'lastSave',
  ]

const formats = {
  'markdown': [ 'md', 'mkd', 'mkdn', 'mdown', 'markdown' ],
  'docx':     [ 'docx' ],
  'odt':      [ 'odt' ],
  'epub':     [ 'epub' ],
}

const getFormat = function (ext) {
  for (let key in formats) {
    if (formats[key].includes(ext))
      return key
  }
  throw `Error: format for ${ ext } extension is not found`
  return ''
}

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

export const projectImportData = async function (filepath) {
  const name   = filepath.split('/').pop().split('.')[0]
  const ext    = filepath.split('.').pop().toLowerCase()
  const format = getFormat(ext)

  if (ext == 'txt') {
    const data = txt(
      fs.readFileSync(filepath, 'utf8')
    )
    return { name, data }
  }

  const { data, error } = await pandocLoad(filepath, format, 'html')
  return { name, data, error }
}

export const projectExportData = async function (state, params, filepath, callback) {
  const ext    = filepath.split('.').pop().toLowerCase()
  const format = getFormat(ext)

  let data =
    `<h1>${ params.title }</h1>
     <h2>By ${ params.author }</h2>`

  params
    .files
    .map(file => state.files[file])
    .forEach(file => {
      data += `<h1>${ file.title }</h1>`
      data += `${ file.content }`
    })

  if (format) {
    await pandocSave(filepath, data, 'html', format)
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
