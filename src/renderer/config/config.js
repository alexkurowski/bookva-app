const Enum = (...args) => {
  return Object.freeze(args)
}

export default {
  appTitle: 'Bookva',
  appVersion: '0.5.0',
  showShareButton: false,
  dropOpenerThreshold: 0.38,
  maxFilesOpen: 2,
  projectSyncInterval: 2, // seconds
  projectSyncFilename: 'project.bkv',
  appearanceKey: 'appearance-settings',
  sidebarPages: Enum(
    'FileTree',
    'Configurations'
  ),
  modalTypes: Enum(
    'Confirm',
    'Alert',
    'ExportManager',
    'About'
  ),
  autohideInitialDelay: 5, // seconds
  autohideThreshold: 200, // pixels
}
