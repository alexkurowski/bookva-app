import sanitizeHtml from 'sanitize-html'
import nodePandoc from 'node-pandoc'

export const txt = function (text) {
  return sanitizeHtml(text, {
      allowedTags: [],
      allowedAttributes: []
    })
    .replace(/\r\n?/g, "\n")
    .split(/\n/)
    .map(paragraph => {
      if (/^\s*$/.test(paragraph))
        return '<p><br></p>'
      else
        return `<p>${ paragraph }</p>`
    })
    .join('')
}

export const pandocLoad = function (source, fromFormat, toFormat) {
  return new Promise(resolve => {
    const args = `-f ${ fromFormat } -t ${ toFormat }`

    nodePandoc(source, args, (error, result) => {
      resolve({ data: result, error })
    })
  })
}

export const pandocSave = function (filepath, source, fromFormat, toFormat) {
  return new Promise(resolve => {
    const args = `-f ${ fromFormat } -t ${ toFormat } -o ${ filepath }`

    nodePandoc(source, args, (error, result) => {
      resolve({ data: result, error })
    })
  })
}
