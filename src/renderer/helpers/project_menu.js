import { Project } from './store_helper'

export function openProjectMenu (event, dispatch) {
  const items = []

  if (Project.lastSave != Project.lastUpdate) {
    items.push({
      icon: 'icon icon-book',
      text: 'New project',
      dispatch: 'modalShow',
      params: {
        type: 'Confirm',
        content: 'newProject',
        dispatch: 'projectNewProject'
      }
    })

    items.push({
      icon: 'icon icon-upload',
      text: 'Open...',
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
      text: 'New project',
      dispatch: 'projectNewProject',
    })

    items.push({
      icon: 'icon icon-upload',
      text: 'Open...',
      dispatch: 'projectLoadProject',
    })
  }

  items.push({
    text: 'hr'
  })

  items.push({
    icon: 'icon icon-download',
    text: 'Save',
    dispatch: 'projectSaveProject'
  })
  items.push({
    icon: 'icon icon-download',
    text: 'Save as...',
    dispatch: 'projectSaveAsProject'
  })

  items.push({
    text: 'hr'
  })

  items.push({
    icon: 'icon icon-arrow-back',
    text: 'Import...',
    dispatch: 'projectImportFiles'
  })
  items.push({
    icon: 'icon icon-arrow-forward',
    text: 'Export',
    fn: () => { document.getElementById('app').__vue__.$router.push('/export') }
  })

  items.push({
    text: 'hr'
  })

  items.push({
    icon: 'icon icon-times',
    text: 'Quit',
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
