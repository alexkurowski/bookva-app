const Enum = (...args) => {
  return Object.freeze(args)
}

export default {
  showShareButton: false,
  dropOpenerThreshold: 0.38,
  maxFilesOpen: 2,
  projectSyncInterval: 2, // seconds
  projectSyncFilename: 'project.wrtr',
  appearanceKey: 'appearance-settings',
  sidebarPages: Enum(
    'FileTree',
    'ThemeSelector'
  ),
  modalTypes: Enum(
    'Confirm'
  ),
  mediumUpdateDelay: 2, // seconds
}
