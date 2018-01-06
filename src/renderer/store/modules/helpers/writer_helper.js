export const stringsToSave = [
  'scheme',
  'fontFamily',
  'fontSize'
]

export const stringify = function (value) {
  return JSON.stringify(value) || 'null'
}
