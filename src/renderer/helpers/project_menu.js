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
      dispatch: 'projectLoadProject',
    })
  }

  items.push({
    text: 'hr'
  })

  items.push({
    icon: 'icon icon-download',
    text: t('contextMenu.project.save'),
    dispatch: 'projectSaveProject'
  })
  items.push({
    icon: 'icon icon-download',
    text: t('contextMenu.project.saveAs'),
    dispatch: 'projectSaveAsProject'
  })

  items.push({
    text: 'hr'
  })

  items.push({
    icon: 'icon icon-arrow-back',
    text: t('contextMenu.project.import'),
    dispatch: 'projectImportFiles'
  })
  items.push({
    icon: 'icon icon-arrow-forward',
    text: t('contextMenu.project.export'),
    fn: () => { document.getElementById('app').__vue__.$router.push('/export') }
  })

  items.push({
    text: 'hr'
  })

  items.push({
    icon: 'icon icon-times',
    text: t('contextMenu.project.close'),
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
