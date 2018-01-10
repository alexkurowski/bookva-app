import { Project } from './store_helper'

export function openProjectMenu (event, dispatch) {
  const items = []

  if (Project.lastSave != Project.lastUpdate) {
    items.push({
      icon: 'icon icon-book',
      text: 'New project',
      callback: 'modalShow',
      callbackArgs: {
        type: 'Confirm',
        content: 'newProject',
        callback: 'projectNewProject'
      }
    })

    items.push({
      icon: 'icon icon-upload',
      text: 'Open...',
      callback: 'modalShow',
      callbackArgs: {
        type: 'Confirm',
        content: 'newProject',
        callback: 'projectLoadProject'
      }
    })
  } else {
    items.push({
      icon: 'icon icon-book',
      text: 'New project',
      callback: 'projectNewProject',
    })

    items.push({
      icon: 'icon icon-upload',
      text: 'Open...',
      callback: 'projectLoadProject',
    })
  }

  items.push({
    icon: 'icon icon-download',
    text: 'Save',
    callback: 'projectSaveProject'
  })
  items.push({
    icon: 'icon icon-download',
    text: 'Save as...',
    callback: 'projectSaveAsProject'
  })
  items.push({
    icon: 'icon icon-times',
    text: 'Quit',
    callback: 'applicationQuit'
  })

  dispatch('contextMenuShow', {
    position: {
      x: event.x,
      y: event.y
    },
    items: items
  })
}
