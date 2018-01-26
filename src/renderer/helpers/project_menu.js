import commandExists from 'command-exists'

import { Project } from './store_helper'

export function openProjectMenu (event, dispatch, t) {
  const items = []

  if (Project.lastSave != Project.lastUpdate) {
    items.push({
      icon: 'icon icon-book',
      text: t('contextMenu.project.new'),
      dispatch: 'modalShow',
      params: {
        type: 'Confirm',
        content: 'newProject',
        dispatch: 'projectNewProject'
      }
    })

    items.push({
      icon: 'icon icon-upload',
      text: t('contextMenu.project.open'),
      title: '(Ctrl+O)',
      dispatch: 'modalShow',
      params: {
        type: 'Confirm',
        content: 'newProject',
        dispatch: 'projectLoadProject'
      }
    })
  } else {
    items.push({
      icon: 'icon icon-book',
      text: t('contextMenu.project.new'),
      dispatch: 'projectNewProject',
    })

    items.push({
      icon: 'icon icon-upload',
      text: t('contextMenu.project.open'),
      title: '(Ctrl+O)',
      dispatch: 'projectLoadProject',
    })
  }

  items.push({
    text: 'hr'
  })

  items.push({
    icon: 'icon icon-download',
    text: t('contextMenu.project.save'),
    title: '(Ctrl+S)',
    dispatch: 'projectSaveProject'
  })
  items.push({
    icon: 'icon icon-download',
    text: t('contextMenu.project.saveAs'),
    title: '(Ctrl+Shift+S)',
    dispatch: 'projectSaveAsProject'
  })

  items.push({
    text: 'hr'
  })

  if ( commandExists.sync('pandoc') ) {
    items.push({
      icon: 'icon icon-arrow-back',
      text: t('contextMenu.project.import'),
      dispatch: 'projectImportFiles'
    })
    items.push({
      icon: 'icon icon-arrow-forward',
      text: t('contextMenu.project.export'),
      dispatch: 'modalShow',
      params: {
        type: 'ExportManager'
      }
    })
  } else {
    items.push({
      icon: 'icon icon-arrow-back',
      text: t('contextMenu.project.import'),
      dispatch: 'modalShow',
      params: {
        type: 'Alert',
        content: 'noPandoc'
      }
    })
    items.push({
      icon: 'icon icon-arrow-forward',
      text: t('contextMenu.project.export'),
      dispatch: 'modalShow',
      params: {
        type: 'Alert',
        content: 'noPandoc'
      }
    })
  }

  items.push({
    text: 'hr'
  })

  items.push({
    icon: 'icon icon-info-large',
    text: t('contextMenu.project.about'),
    dispatch: 'modalShow',
    params: {
      type: 'About'
    }
  })

  items.push({
    text: 'hr'
  })

  items.push({
    icon: 'icon icon-times',
    text: t('contextMenu.project.close'),
    title: '(Alt+F4)',
    dispatch: 'applicationQuit'
  })

  dispatch('contextMenuShow', {
    position: {
      x: event.x,
      y: event.y
    },
    items: items
  })
}
