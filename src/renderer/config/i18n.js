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
          themeSelector: 'Themes',
          share: 'Share'
        },

        new: {
          file: 'New file',
          folder: 'New folder'
        },
      },

      statusbar: {
        info: {
          words: 'words',
          total: 'total'
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
    }
  }
}
