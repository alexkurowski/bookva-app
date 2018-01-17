export default {
  en: {
    writer: {
      placeholder: {
        title: 'Title',
        content: 'Type here...'
      },

      default: {
        title: {
          file: 'Untitled',
          folder: 'Untitled'
        }
      },

      sidebar: {
        title: {
          projectMenu: 'Project',
          fileTree: 'Files',
          configurations: 'Configurations',
          share: 'Share',
          toggle: 'Toggle sidebar'
        },

        new: {
          file: 'New file',
          folder: 'New folder'
        },

        fileTree: {
          title: {
            add: 'Add files & folders'
          }
        },

        configurations: {
          info: 'Configurations',
          label: {
            scheme: 'Theme',
            fontFamily: 'Font',
            fontSize: 'Font size',
            statusbar: 'Status bar',
            width: 'Column width',
          }
        }
      },

      statusbar: {
        info: {
          words: 'words',
          total: 'total'
        },

        title: {
          fullscreen: 'Toggle fullscreen mode'
        }
      }
    },

    modal: {
      newProject: {
        header: 'Create a new project',
        body: 'Unsaved changes in current project will be lost!'
      },

      loadProject: {
        header: 'Load a project',
        body: 'Unsaved changes in current project will be lost!'
      },

      removeFile: {
        header: 'Remove a file',
        body: 'Are you sure you want to remove this file?'
      },

      removeFolderWithFiles: {
        header: 'Remove a folder',
        body: 'Are you sure you want to remove this folder? All files within this folder will be also removed.'
      },

      removeFolderKeepFiles: {
        header: 'Remove a folder',
        body: 'Are you sure you want to remove this folder? All files within this folder will be moved.'
      },

      confirm: {
        confirm: 'Confirm',
        cancel: 'Cancel'
      },

      badLoad: {
        header: 'Error',
        body: 'An error occured while loading a file. Make sure it\'s an actual WRTR file!'
      },

      alert: {
        ok: 'Ok'
      },

      exportManager: {
        confirm: 'Export',
        cancel: 'Cancel'
      },

      about: {
        header: 'WRTR',
        body: 'Placeholder "about" text',
        ok: 'Ok'
      }
    },

    export: {
      header: {
        big: 'Export manager',
        small: 'Choose below which files you wish to export them and in what order they shall appear in the exported file.'
      },

      body: {
        title: {
          label: 'Title',
          placeholder: 'Tilte of exported book'
        },

        author: {
          label: 'Author',
          placeholder: 'Your pen name'
        },

        chapters: {
          header: {
            title: 'Title',
            wordCount: 'Words',
            order: 'Chapters to export',
          }
        }
      }
    },

    contextMenu: {
      project: {
        new: 'New project',
        open: 'Open...',
        save: 'Save',
        saveAs: 'Save as...',
        import: 'Import...',
        export: 'Export...',
        about: 'About...',
        close: 'Quit',
      },

      file: {
        openFill: 'Open',
        openLeft: 'Open in left pane',
        openRight: 'Open in right pane',
        close: 'Close',
        swap: 'Swap panes',
        remove: 'Remove',
      },

      folder: {
        open: 'Expand',
        close: 'Collapse',
        addFile: 'Add file here',
        remove: 'Remove',
        removeWithFiles: 'Remove (with files)',
        removeKeepFiles: 'Remove (keep files)',
      },

      add: {
        file: 'New file',
        folder: 'New folder'
      },
    }
  }
}
