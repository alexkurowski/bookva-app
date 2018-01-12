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

export const pandoc = function (filepath, format) {
  const args = `-f ${ format } -t html`

  nodePandoc(filepath, args, (error, result) => {
    if (error)
      return throw error

    // TODO (Alex): figure out how to return result to outer function
    console.log(result)
  })
}
